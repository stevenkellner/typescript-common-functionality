import { expect } from '@assertive-ts/core';
import { Flattable } from '../../src';

describe('Flattable', () => {
    describe('flatten', () => {
        it('should flatten nested Flattable objects', () => {
            const nestedFlattable = {
                flatten: {
                    flatten: {
                        flatten: 1
                    }
                }
            };
            expect(Flattable.flatten(nestedFlattable)).toBeEqual(1);
        });

        it('should return primitive values as is', () => {
            expect(Flattable.flatten(1)).toBeEqual(1);
            expect(Flattable.flatten('string')).toBeEqual('string');
            expect(Flattable.flatten(true)).toBeEqual(true);
            expect(Flattable.flatten(null)).toBeEqual(null);
            expect(Flattable.flatten(undefined)).toBeEqual(undefined);
        });

        it('should flatten arrays of Flattable objects', () => {
            const arrayFlattable = [
                { flatten: 1 },
                { flatten: 2 },
                { flatten: 3 }
            ];
            expect(Flattable.flatten(arrayFlattable)).toBeEqual([1, 2, 3]);
        });

        it('should flatten nested arrays of Flattable objects', () => {
            const nestedArrayFlattable = [
                [{ flatten: 1 }],
                [{ flatten: 2 }],
                [{ flatten: 3 }]
            ];
            expect(Flattable.flatten(nestedArrayFlattable)).toBeEqual([[1], [2], [3]]);
        });

        it('should flatten objects with Flattable properties', () => {
            const objectFlattable = {
                a: { flatten: 1 },
                b: { flatten: 2 },
                c: { flatten: 3 }
            };
            expect(Flattable.flatten(objectFlattable)).toBeEqual({
                a: 1,
                b: 2,
                c: 3
            });
        });

        it('should throw an error for unexpected values', () => {
            expect(() => Flattable.flatten(Symbol('symbol')))
                .toThrowError(Error)
                .toHaveMessage('Unexpected value');
        });
    });
});
