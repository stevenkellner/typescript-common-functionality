import { expect } from '@assertive-ts/core';
import { PKCS7Padding } from '../../../src/crypter/padding/PKCS7Padding';
import randomBytes from 'randombytes';

describe('PKCS7Padding', () => {
    let padding: PKCS7Padding;

    beforeEach(() => {
        padding = new PKCS7Padding();
    });

    it('should add padding correctly', () => {
        const data = new Uint8Array([1, 2, 3, 4]);
        const blockSize = 8;
        const paddedData = padding.addTo(data, blockSize);
        expect(paddedData).toBeEqual(new Uint8Array([1, 2, 3, 4, 4, 4, 4, 4]));
    });

    it('should remove padding correctly', () => {
        const paddedData = new Uint8Array([1, 2, 3, 4, 4, 4, 4, 4]);
        const data = padding.removeFrom(paddedData);
        expect(data).toBeEqual(new Uint8Array([1, 2, 3, 4]));
    });

    it('should handle data that is already a multiple of block size', () => {
        const data = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
        const blockSize = 8;
        const paddedData = padding.addTo(data, blockSize);
        expect(paddedData).toBeEqual(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8]));
    });

    it('should handle empty data', () => {
        const data = new Uint8Array([]);
        const blockSize = 8;
        const paddedData = padding.addTo(data, blockSize);
        expect(paddedData).toBeEqual(new Uint8Array([8, 8, 8, 8, 8, 8, 8, 8]));
    });

    it('should add padding to random data', () => {
        const dataLength15 = randomBytes(15);
        const dataLength16 = randomBytes(16);
        const dataLength20 = randomBytes(20);
        expect(padding.addTo(dataLength15, 16)).toBeEqual(new Uint8Array([...dataLength15, 1]));
        expect(padding.addTo(dataLength16, 16)).toBeEqual(new Uint8Array([...dataLength16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16]));
        expect(padding.addTo(dataLength20, 16)).toBeEqual(new Uint8Array([...dataLength20, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12]));
    });

    it('should remove padding from random data', () => {
        const dataLength15 = randomBytes(15);
        const dataLength16 = randomBytes(16);
        const dataLength20 = randomBytes(20);
        expect(padding.removeFrom(new Uint8Array([...dataLength15, 1])).buffer).toBeEqual(dataLength15.buffer);
        expect(padding.removeFrom(new Uint8Array([...dataLength16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16])).buffer).toBeEqual(dataLength16.buffer);
        expect(padding.removeFrom(new Uint8Array([...dataLength20, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12])).buffer).toBeEqual(dataLength20.buffer);
    });

    it('should add and remove padding of data with different sizes', () => {
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
