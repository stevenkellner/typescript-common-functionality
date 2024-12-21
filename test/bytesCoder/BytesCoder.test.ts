import { expect } from '@assertive-ts/core';
import { BytesCoder } from '../../src/bytesCoder/BytesCoder';

describe('BytesCoder', () => {

    describe('Base64 encoding/decoding', () => {
        it('should encode a string to base64', () => {
            const data = 'Hello, World!';
            const encoded = BytesCoder.fromBase64(data);
            expect(encoded).toBeEqual(Buffer.from(data, 'base64'));
        });

        it('should decode a base64 string to original string', () => {
            const data = 'SGVsbG8sIFdvcmxkIQ==';
            const decoded = BytesCoder.toBase64(Buffer.from(data, 'base64'));
            expect(decoded).toBeEqual(data);
        });

        it('should encode and decode an empty string', () => {
            const data = '';
            const encoded = BytesCoder.fromBase64(data);
            const decoded = BytesCoder.toBase64(encoded);
            expect(decoded).toBeEqual(data);
        });
    });

    describe('Hex encoding/decoding', () => {
        it('should encode a string to hex', () => {
            const data = '48656c6c6f2c20576f726c6421';
            const encoded = BytesCoder.fromHex(data);
            expect(encoded).toBeEqual(Buffer.from(data, 'hex'));
        });

        it('should decode a hex string to original string', () => {
            const data = '48656c6c6f2c20576f726c6421';
            const decoded = BytesCoder.toHex(Buffer.from(data, 'hex'));
            expect(decoded).toBeEqual(data);
        });

        it('should encode and decode an empty string', () => {
            const data = '';
            const encoded = BytesCoder.fromHex(data);
            const decoded = BytesCoder.toHex(encoded);
            expect(decoded).toBeEqual(data);
        });
    });

    describe('Utf8 encoding/decoding', () => {
        it('should encode a string to utf8', () => {
            const data = 'Hello, World!';
            const encoded = BytesCoder.fromUtf8(data);
            expect(encoded).toBeEqual(Buffer.from(data, 'utf8'));
        });

        it('should decode a utf8 string to original string', () => {
            const data = 'Hello, World!';
            const encoded = Buffer.from(data, 'utf8');
            const decoded = BytesCoder.toUtf8(encoded);
            expect(decoded).toBeEqual(data);
        });

        it('should encode and decode an empty string', () => {
            const data = '';
            const encoded = BytesCoder.fromUtf8(data);
            const decoded = BytesCoder.toUtf8(encoded);
            expect(decoded).toBeEqual(data);
        });

        it('should encode and decode a string with special characters', () => {
            const data = 'こんにちは、世界！';
            const encoded = BytesCoder.fromUtf8(data);
            const decoded = BytesCoder.toUtf8(encoded);
            expect(decoded).toBeEqual(data);
        });

        it('should encode and decode a string with emojis', () => {
            const data = 'Hello, World! 🌍🚀';
            const encoded = BytesCoder.fromUtf8(data);
            const decoded = BytesCoder.toUtf8(encoded);
            expect(decoded).toBeEqual(data);
        });

        it('should encode and decode a string with mixed characters', () => {
            const data = 'Hello, こんにちは, 🌍🚀!';
            const encoded = BytesCoder.fromUtf8(data);
            const decoded = BytesCoder.toUtf8(encoded);
            expect(decoded).toBeEqual(data);
        });
    });
});
