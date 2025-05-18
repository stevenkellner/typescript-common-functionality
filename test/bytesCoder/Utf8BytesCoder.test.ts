import { expect } from '@assertive-ts/core';
import { Buffer } from 'buffer';
import { Utf8BytesCoder } from '../../src/bytesCoder/Utf8BytesCoder';

describe('Utf8BytesCoder', () => {
    const coder = new Utf8BytesCoder();

    it('should encode a string to utf8', () => {
        const data = 'Hello, World!';
        const encoded = coder.encode(data);
        expect(encoded).toBeEqual(Buffer.from(data, 'utf8'));
    });

    it('should decode a utf8 string to original string', () => {
        const data = 'Hello, World!';
        const encoded = Buffer.from(data, 'utf8');
        const decoded = coder.decode(encoded);
        expect(decoded).toBeEqual(data);
    });

    it('should encode and decode an empty string', () => {
        const data = '';
        const encoded = coder.encode(data);
        const decoded = coder.decode(encoded);
        expect(decoded).toBeEqual(data);
    });

    it('should encode and decode a string with special characters', () => {
        const data = 'こんにちは、世界！';
        const encoded = coder.encode(data);
        const decoded = coder.decode(encoded);
        expect(decoded).toBeEqual(data);
    });

    it('should encode and decode a string with emojis', () => {
        const data = 'Hello, World! 🌍🚀';
        const encoded = coder.encode(data);
        const decoded = coder.decode(encoded);
        expect(decoded).toBeEqual(data);
    });

    it('should encode and decode a string with mixed characters', () => {
        const data = 'Hello, こんにちは, 🌍🚀!';
        const encoded = coder.encode(data);
        const decoded = coder.decode(encoded);
        expect(decoded).toBeEqual(data);
    });
});
