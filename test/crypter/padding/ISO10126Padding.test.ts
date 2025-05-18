import { expect } from '@assertive-ts/core';
import { ISO10126Padding } from '../../../src/crypter/padding/ISO10126Padding';
import randomBytes from 'randombytes';

describe('ISO10126Padding', () => {
    let padding: ISO10126Padding;

    beforeEach(() => {
        padding = new ISO10126Padding();
    });

    it('should add padding correctly', () => {
        const data = new Uint8Array([1, 2, 3, 4]);
        const blockSize = 8;
        const paddedData = padding.addTo(data, blockSize);
        expect(paddedData.length).toBe(8);
        expect(paddedData.slice(0, 4)).toBeEqual(data);
        expect(paddedData[7]).toBe(4);
    });

    it('should remove padding correctly', () => {
        const paddedData = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 4]);
        const data = padding.removeFrom(paddedData);
        expect(data).toBeEqual(new Uint8Array([1, 2, 3, 4]));
    });

    it('should handle data that is already a multiple of block size', () => {
        const data = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
        const blockSize = 8;
        const paddedData = padding.addTo(data, blockSize);
        expect(paddedData.length).toBe(16);
        expect(paddedData.slice(0, 8)).toBeEqual(data);
        expect(paddedData[15]).toBe(8);
    });

    it('should handle empty data', () => {
        const data = new Uint8Array([]);
        const blockSize = 8;
        const paddedData = padding.addTo(data, blockSize);
        expect(paddedData.length).toBe(8);
        expect(paddedData[7]).toBe(8);
    });

    it('should add padding to random data', () => {
        const dataLength15 = randomBytes(15);
        const dataLength16 = randomBytes(16);
        const dataLength20 = randomBytes(20);
        expect(padding.addTo(dataLength15, 16).length).toBeEqual(16);
        expect(padding.addTo(dataLength15, 16).slice(0, 15)).toBeEqual(new Uint8Array([...dataLength15]));
        expect(padding.addTo(dataLength15, 16)[15]).toBeEqual(1);
        expect(padding.addTo(dataLength16, 16).length).toBeEqual(32);
        expect(padding.addTo(dataLength16, 16).slice(0, 16)).toBeEqual(new Uint8Array([...dataLength16]));
        expect(padding.addTo(dataLength16, 16)[31]).toBeEqual(16);
        expect(padding.addTo(dataLength20, 16).length).toBeEqual(32);
        expect(padding.addTo(dataLength20, 16).slice(0, 20)).toBeEqual(new Uint8Array([...dataLength20]));
        expect(padding.addTo(dataLength20, 16)[31]).toBeEqual(12);
    });

    it('should remove padding from random data', () => {
        const dataLength15 = randomBytes(15);
        const dataLength16 = randomBytes(16);
        const dataLength20 = randomBytes(20);
        expect(padding.removeFrom(new Uint8Array([...dataLength15, 1])).buffer).toBeEqual(dataLength15.buffer);
        expect(padding.removeFrom(new Uint8Array([...dataLength16, ...randomBytes(15), 16])).buffer).toBeEqual(dataLength16.buffer);
        expect(padding.removeFrom(new Uint8Array([...dataLength20, ...randomBytes(11), 12])).buffer).toBeEqual(dataLength20.buffer);
    });

    it('should add and remove padding of data with different sizes', () => {
        for (let i = 1; i < 16; i++) {
            for (let j = 0; j <= i; j++) {
                const data = randomBytes(j);
                const paddedData = padding.addTo(data, i);
                expect(paddedData.length % i).toBe(0);
                const unpaddedData = padding.removeFrom(paddedData);
                expect(unpaddedData.buffer).toBeEqual(data.buffer);
            }
        }
    });
});
