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
            expect(Flattable.flatten(undefined)).toBeEqual(undefined);
            expect(Flattable.flatten(null)).toBeEqual(null);
            expect(Flattable.flatten(true)).toBeEqual(true);
            expect(Flattable.flatten(1)).toBeEqual(1);
            expect(Flattable.flatten(BigInt(1))).toBeEqual(BigInt(1));
            expect(Flattable.flatten('string')).toBeEqual('string');
            expect(Flattable.flatten(new Uint8Array([1, 2, 3]))).toBeEqual(new Uint8Array([1, 2, 3]));
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

        it('should return same object if not flattable', () => {
            const value = Symbol('symbol');
            expect(Flattable.flatten(value)).toBeEqual(value);
        });
    });
});
