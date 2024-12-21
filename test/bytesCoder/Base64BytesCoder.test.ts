import { expect } from '@assertive-ts/core';
import { Base64BytesCoder } from '../../src/bytesCoder/Base64BytesCoder';

describe('Base64BytesCoder', () => {
    const coder = new Base64BytesCoder();

    it('should encode a string to base64', () => {
        const data = 'Hello, World!';
        const encoded = coder.encode(data);
        expect(encoded).toBeEqual(Buffer.from(data, 'base64'));
    });

    it('should decode a base64 string to original string', () => {
        const data = 'SGVsbG8sIFdvcmxkIQ==';
        const decoded = coder.decode(Buffer.from(data, 'base64'));
        expect(decoded).toBeEqual(data);
    });

    it('should encode and decode an empty string', () => {
        const data = '';
        const encoded = coder.encode(data);
        const decoded = coder.decode(encoded);
        expect(decoded).toBeEqual(data);
    });

    it('should encode and decode a string', () => {
        const data = Buffer.from('SGVsbG8sIFdvcmxkIQ==', 'base64');
        const decoded = coder.decode(data);
        const encoded = coder.encode(decoded);
        expect(encoded).toBeEqual(data);
    });
});
