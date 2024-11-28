import { expect } from '@assertive-ts/core';
import { TypeBuilder } from '../../src';

describe('TypeBuilder', () => {

    let builder: TypeBuilder<number, number>;

    before(() => {
        builder = new TypeBuilder((value: number) => value + 1);
    });

    it('build with a positive number', () => {
        expect(builder.build(1)).toBeEqual(2);
    });

    it('build with zero', () => {
        expect(builder.build(0)).toBeEqual(1);
    });

    it('build with a negative number', () => {
        expect(builder.build(-1)).toBeEqual(0);
    });

    it('build with a large number', () => {
        expect(builder.build(1000)).toBeEqual(1001);
    });
});
