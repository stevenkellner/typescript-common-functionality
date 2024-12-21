import { expect } from '@assertive-ts/core';
import { AES } from '../../src/crypter/AES';
import { PKCS7Padding } from '../../src/crypter/padding/PKCS7Padding';
import { CBCMode } from '../../src/crypter/modeOfOperation/CBCMode';

describe('ICrypter', () => {
    const key = new Uint8Array(16).fill(1);
    const padding = new PKCS7Padding();
    const modeOfOperation = new CBCMode();
    const crypter = new AES(key, modeOfOperation, padding);

    it('should encrypt and decrypt data correctly', () => {
        const data = new Uint8Array([1, 2, 3, 4, 5]);
        const encryptedData = crypter.encrypt(data);
        const decryptedData = crypter.decrypt(encryptedData);
        expect(decryptedData).toBeEqual(data);
    });

    it('should encode and encrypt data correctly', () => {
        const value = { test: 'value' };
        const encryptedData = crypter.encodeAndEncrypt(value);
        const decryptedValue = crypter.decryptAndDecode(encryptedData);
        expect(decryptedValue).toBeEqual(value);
    });

    it('should handle empty data correctly', () => {
        const data = new Uint8Array();
        const encryptedData = crypter.encrypt(data);
        const decryptedData = crypter.decrypt(encryptedData);
        expect(decryptedData).toBeEqual(data);
    });

    it('should handle undefined value correctly', () => {
        const encryptedData = crypter.encodeAndEncrypt(undefined);
        const decryptedValue = crypter.decryptAndDecode(encryptedData);
        expect(decryptedValue).toBeUndefined();
    });

    it('should throw an error if key length is invalid', () => {
        expect(() => new AES(new Uint8Array(10), modeOfOperation, padding))
            .toThrowError(Error)
            .toHaveMessage('AES key must be 16, 24 or 32 bytes long.');
    });
});
