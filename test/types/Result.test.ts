import { expect } from '@assertive-ts/core';
import { Result } from '../../src/types/Result';
import { Guid, TypeBuilder } from '../../src';

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

        it('should get value or error', () => {
            const result = Result.success(42);
            expect(result.valueOrError).toBeEqual(42);
        });

        it('should get flatten value', () => {
            const guid = Guid.generate();
            const result = Result.success(guid);
            expect(result.flatten).toBeEqual({
                state: 'success',
                value: guid.guidString
            });
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

        it('should get value or error', () => {
            const error = new Error('error');
            const result = Result.failure(error);
            expect(result.valueOrError).toBeEqual(error);
        });

        it('should get flatten error', () => {
            const guid = Guid.generate();
            const result = Result.failure(guid);
            expect(result.flatten).toBeEqual({
                state: 'failure',
                error: guid.guidString
            });
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
            expect(() => Result.from(undefined))
                .toThrowError(Error)
                .toHaveMessage('Expected an object');
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

    describe('TypeBuilder', () => {
        it('should build a success result', () => {
            const typeBuilder = new Result.TypeBuilder(new TypeBuilder((value: number) => value + 1), new TypeBuilder((error: string) => error.toUpperCase()));
            const result = typeBuilder.build(Result.success(41));
            expect(result).toBeEqual(Result.success(42));
        });

        it('should build a failure result', () => {
            const typeBuilder = new Result.TypeBuilder(new TypeBuilder((value: number) => value + 1), new TypeBuilder((error: string) => error.toUpperCase()));
            const result = typeBuilder.build(Result.failure('error'));
            expect(result).toBeEqual(Result.failure('ERROR'));
        });
    });
});
