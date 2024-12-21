import { expect } from '@assertive-ts/core';
import { xor } from '../../src/utils/xor';

describe('xor', () => {
    it('should return the correct XOR result for two equal length Uint8Arrays', () => {
        const lhs = new Uint8Array([1, 2, 3]);
        const rhs = new Uint8Array([4, 5, 6]);
        const result = xor(lhs, rhs);
        expect(result).toBeEqual(new Uint8Array([5, 7, 5]));
    });

    it('should throw an error if the input arrays are of different lengths', () => {
        const lhs = new Uint8Array([1, 2, 3]);
        const rhs = new Uint8Array([4, 5]);
        expect(() => xor(lhs, rhs))
            .toThrowError(Error)
            .toHaveMessage('Xor operands must be the same length.');
    });

    it('should return an empty Uint8Array if both inputs are empty', () => {
        const lhs = new Uint8Array([]);
        const rhs = new Uint8Array([]);
        const result = xor(lhs, rhs);
        expect(result).toBeEqual(new Uint8Array([]));
    });

    it('should handle arrays with zeroes correctly', () => {
        const lhs = new Uint8Array([0, 0, 0]);
        const rhs = new Uint8Array([0, 0, 0]);
        const result = xor(lhs, rhs);
        expect(result).toBeEqual(new Uint8Array([0, 0, 0]));
    });

    it('should handle arrays with maximum byte values correctly', () => {
        const lhs = new Uint8Array([255, 255, 255]);
        const rhs = new Uint8Array([255, 255, 255]);
        const result = xor(lhs, rhs);
        expect(result).toBeEqual(new Uint8Array([0, 0, 0]));
    });
});
