import { expect } from '@assertive-ts/core';
import { GuardParameterBuilder } from '../../../src/parameter/parameterBuilder/GuardParameterBuilder';
import type { RawParameterType } from '../../../src/parameter/ValidParameterTypeName';

describe('GuardParameterBuilder', () => {
    let builder: GuardParameterBuilder<'number', number>;

    before(() => {
        const typeGuard = (value: RawParameterType<'number'>): value is number => typeof value === 'number';
        builder = new GuardParameterBuilder<'number', number>('number', typeGuard);
    });

    it('build with valid number', () => {
        expect(builder.build(123)).toBeEqual(123);
    });

    it('build with invalid number', () => {
        expect(() => builder.build('123' as any))
            .toThrowError(Error)
            .toHaveMessage('Invalid parameter, type guard failed.');
    });

    it('build with null value', () => {
        expect(() => builder.build(null as any))
            .toThrowError(Error)
            .toHaveMessage('Invalid parameter, type guard failed.');
    });

    it('build with undefined value', () => {
        expect(() => builder.build(undefined as any))
            .toThrowError(Error)
            .toHaveMessage('Invalid parameter, type guard failed.');
    });

    it('expectedTypes should return correct type', () => {
        expect(builder.expectedTypes).toBeEqual(new Set(['number']));
    });
});
