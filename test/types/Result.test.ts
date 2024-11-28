import { expect } from '@assertive-ts/core';
import { Result } from '../../src/types/Result';

describe('Result', () => {
    describe('Success', () => {
        it('should create a success result', () => {
            const result = Result.success(42);
            expect(Result.isSuccess(result)).toBeTrue();
            expect(result.get()).toBeEqual(42);
        });

        it('should map the success value', () => {
            const result = Result.success(42).map(value => value + 1);
            expect(result.get()).toBeEqual(43);
        });

        it('should not map the error in success', () => {
            const result = Result.success(42).mapError(() => 'error');
            expect(result.get()).toBeEqual(42);
        });
    });

    describe('Failure', () => {
        it('should create a failure result', () => {
            const result = Result.failure(new Error('error'));
            expect(Result.isFailure(result)).toBeTrue();
            expect(() => result.get())
                .toThrowError(Error)
                .toHaveMessage('error');
        });

        it('should map the failure error', () => {
            const result = Result.failure(new Error('error')).mapError(error => new Error(`${error.message} mapped`));
            expect(() => result.get())
                .toThrowError(Error)
                .toHaveMessage('error mapped');
        });

        it('should not map the value in failure', () => {
            const result = Result.failure(new Error('error')).map(() => 42);
            expect(() => result.get())
                .toThrowError(Error)
                .toHaveMessage('error');
        });
    });

    describe('from', () => {
        it('should create a success result from a valid object', () => {
            const result = Result.from({
                state: 'success',
                value: 42
            });
            expect(Result.isSuccess(result)).toBeTrue();
            expect(result.get()).toBeEqual(42);
        });

        it('should create a failure result from a valid object', () => {
            const result = Result.from({
                state: 'failure',
                error: new Error('error')
            });
            expect(Result.isFailure(result)).toBeTrue();
            expect(() => result.get())
                .toThrowError(Error)
                .toHaveMessage('error');
        });

        it('should throw an error for an invalid object', () => {
            expect(() => Result.from({}))
                .toThrowError(Error)
                .toHaveMessage('Expected a state property');
            expect(() => Result.from({ state: 'unknown' }))
                .toThrowError(Error)
                .toHaveMessage('Expected a state property with value success or failure');
            expect(() => Result.from({ state: 'success' }))
                .toThrowError(Error)
                .toHaveMessage('Expected a value property');
            expect(() => Result.from({ state: 'failure' }))
                .toThrowError(Error)
                .toHaveMessage('Expected an error property');
        });
    });
});
