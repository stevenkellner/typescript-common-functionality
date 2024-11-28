import { expect } from '@assertive-ts/core';
import { ValueTypeBuilder } from '../../src';

describe('ValueTypeBuilder', () => {

    it('build with a number value', () => {
        const numberBuilder = new ValueTypeBuilder<number>();
        const value = 42;
        expect(numberBuilder.build(value)).toBeEqual(value);
    });

    it('build with a string value', () => {
        const stringBuilder = new ValueTypeBuilder<string>();
        const value = 'test';
        expect(stringBuilder.build(value)).toBeEqual(value);
    });

    it('build with an object value', () => {
        const objectBuilder = new ValueTypeBuilder<{ key: string }>();
        const value = { key: 'value' };
        expect(objectBuilder.build(value)).toBeEqual(value);
    });

    it('build with an array value', () => {
        const arrayBuilder = new ValueTypeBuilder<number[]>();
        const value = [1, 2, 3];
        expect(arrayBuilder.build(value)).toBeEqual(value);
    });

    it('build with a null value', () => {
        const nullBuilder = new ValueTypeBuilder<null>();
        const value = null;
        expect(nullBuilder.build(value)).toBeNull();
    });

    it('build with an undefined value', () => {
        const undefinedBuilder = new ValueTypeBuilder<undefined>();
        const value = undefined;
        expect(undefinedBuilder.build(value)).toBeUndefined();
    });
});
