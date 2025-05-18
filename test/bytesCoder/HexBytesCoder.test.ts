import { expect } from '@assertive-ts/core';
import { Buffer } from 'buffer';
import { HexBytesCoder } from '../../src/bytesCoder/HexBytesCoder';

describe('HexBytesCoder', () => {
    const coder = new HexBytesCoder();

    it('should encode a string to hex', () => {
        const data = '48656c6c6f2c20576f726c6421';
        const encoded = coder.encode(data);
        expect(encoded).toBeEqual(Buffer.from(data, 'hex'));
    });

    it('should decode a hex string to original string', () => {
        const data = '48656c6c6f2c20576f726c6421';
        const decoded = coder.decode(Buffer.from(data, 'hex'));
        expect(decoded).toBeEqual(data);
    });

    it('should encode and decode an empty string', () => {
        const data = '';
        const encoded = coder.encode(data);
        const decoded = coder.decode(encoded);
        expect(decoded).toBeEqual(data);
    });

    it('should encode and decode a string', () => {
        const data = Buffer.from('48656c6c6f2c20576f726c6421', 'hex');
        const decoded = coder.decode(data);
        const encoded = coder.encode(decoded);
        expect(encoded).toBeEqual(data);
    });
});
