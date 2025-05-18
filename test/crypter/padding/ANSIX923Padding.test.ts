import { expect } from '@assertive-ts/core';
import { ASNIX923Padding } from '../../../src/crypter/padding/ANSIX923Padding';
import randomBytes from 'randombytes';

describe('ASNIX923Padding', () => {
    let padding: ASNIX923Padding;

    beforeEach(() => {
        padding = new ASNIX923Padding();
    });

    it('should add padding correctly', () => {
        const data = new Uint8Array([1, 2, 3, 4]);
        const blockSize = 8;
        const paddedData = padding.addTo(data, blockSize);
        expect(paddedData).toBeEqual(new Uint8Array([1, 2, 3, 4, 0, 0, 0, 4]));
    });

    it('should remove padding correctly', () => {
        const paddedData = new Uint8Array([1, 2, 3, 4, 0, 0, 0, 4]);
        const data = padding.removeFrom(paddedData);
        expect(data).toBeEqual(new Uint8Array([1, 2, 3, 4]));
    });

    it('should handle data that is already a multiple of block size', () => {
        const data = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
        const blockSize = 8;
        const paddedData = padding.addTo(data, blockSize);
        expect(paddedData).toBeEqual(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 0, 0, 0, 0, 0, 0, 0, 8]));
    });

    it('should handle empty data', () => {
        const data = new Uint8Array([]);
        const blockSize = 8;
        const paddedData = padding.addTo(data, blockSize);
        expect(paddedData).toBeEqual(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 8]));
    });

    it('should remove padding from data that is already a multiple of block size', () => {
        const paddedData = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 0, 0, 0, 0, 0, 0, 0, 8]);
        const data = padding.removeFrom(paddedData);
        expect(data).toBeEqual(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]));
    });

    it('should add padding to random data', () => {
        const dataLength15 = randomBytes(15);
        const dataLength16 = randomBytes(16);
        const dataLength20 = randomBytes(20);
        expect(padding.addTo(dataLength15, 16)).toBeEqual(new Uint8Array([...dataLength15, 1]));
        expect(padding.addTo(dataLength16, 16)).toBeEqual(new Uint8Array([...dataLength16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]));
        expect(padding.addTo(dataLength20, 16)).toBeEqual(new Uint8Array([...dataLength20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12]));
    });

    it('should remove padding from random data', () => {
        const dataLength15 = randomBytes(15);
        const dataLength16 = randomBytes(16);
        const dataLength20 = randomBytes(20);
        expect(padding.removeFrom(new Uint8Array([...dataLength15, 1])).buffer).toBeEqual(dataLength15.buffer);
        expect(padding.removeFrom(new Uint8Array([...dataLength16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16])).buffer).toBeEqual(dataLength16.buffer);
        expect(padding.removeFrom(new Uint8Array([...dataLength20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12])).buffer).toBeEqual(dataLength20.buffer);
    });

    it('should add and remove padding of data with different size', () => {
        for (let i = 1; i < 16; i++) {
            for (let j = 0; j <= i; j++) {
                const data = randomBytes(j);
                const paddedData = padding.addTo(data, i);
                expect(paddedData.length % i).toBeEqual(0);
                const unpaddedData = padding.removeFrom(paddedData);
                expect(unpaddedData.buffer).toBeEqual(data.buffer);
            }
        }
    });
});
