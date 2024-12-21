import { expect } from '@assertive-ts/core';
import { ValueParameterBuilder } from '../../../src/parameter/parameterBuilder/ValueParameterBuilder';
import type { RawParameterType } from '../../../src/parameter/ValidParameterTypeName';

describe('ValueParameterBuilder', () => {
    let builder: ValueParameterBuilder<'string'>;

    before(() => {
        builder = new ValueParameterBuilder<'string'>('string');
    });

    it('should return expected types', () => {
        expect(builder.expectedTypes).toBeEqual(new Set(['string']));
    });

    it('should build value correctly', () => {
        const value: RawParameterType<'string'> = 'test';
        expect(builder.build(value)).toBeEqual(value);
    });

    it('should build with number type', () => {
        const numberBuilder = new ValueParameterBuilder<'number'>('number');
        const value: RawParameterType<'number'> = 123;
        expect(numberBuilder.build(value)).toBeEqual(value);
    });

    it('should build with boolean type', () => {
        const booleanBuilder = new ValueParameterBuilder<'boolean'>('boolean');
        const value: RawParameterType<'boolean'> = true;
        expect(booleanBuilder.build(value)).toBeEqual(value);
    });

    it('should build with object type', () => {
        const objectBuilder = new ValueParameterBuilder<'object'>('object');
        const value: RawParameterType<'object'> = { key: 'value' };
        expect(objectBuilder.build(value)).toBeEqual(value);
    });
});
