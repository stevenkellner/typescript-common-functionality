import { expect } from '@assertive-ts/core';
import { AES } from '../../src/crypter/AES';
import { PKCS7Padding } from '../../src/crypter/padding/PKCS7Padding';
import { CBCMode } from '../../src/crypter/modeOfOperation/CBCMode';
import { CTRMode } from '../../src/crypter/modeOfOperation/CTRMode';
import { OFBMode } from '../../src/crypter/modeOfOperation/OFBMode';
import { ECBMode } from '../../src/crypter/modeOfOperation/ECBMode';
import { xor } from '../../src/utils/xor';

type TestableAES = AES & {
    encryptBlocks(blocks: Uint8Array[]): Uint8Array;
    decryptBlocks(blocks: Uint8Array[]): Uint8Array;
};

describe('AES', () => {
    const key = new Uint8Array(16).fill(1);
    const padding = new PKCS7Padding();

    it('should encrypt and decrypt data correctly with CBC mode', () => {
        const modeOfOperation = new CBCMode();
        const crypter = new AES(key, modeOfOperation, padding);
        const data = new Uint8Array([1, 2, 3, 4, 5]);
        const encryptedData = crypter.encrypt(data);
        const decryptedData = crypter.decrypt(encryptedData);
        expect(decryptedData).toBeEqual(data);
    });

    it('should decrypt data correctly with CBC mode', () => {
        const aes = new AES(new Uint8Array([119, 54, 103, 107, 122, 110, 105, 85, 112, 120, 119, 76, 65, 75, 114, 88]), new CBCMode()) as unknown as TestableAES;
        const data = [
            new Uint8Array([112, 195, 54, 14, 139, 94, 137, 201, 14, 200, 185, 8, 63, 95, 55, 131]),
            new Uint8Array([131, 161, 40, 61, 8, 83, 98, 163, 255, 58, 115, 155, 41, 62, 23, 130]),
            new Uint8Array([116, 39, 82, 144, 240, 59, 55, 69, 86, 146, 253, 64, 229, 9, 120, 150]),
            new Uint8Array([103, 159, 210, 94, 127, 70, 116, 38, 223, 90, 123, 144, 32, 230, 152, 125])
        ];
        expect(aes.decryptBlocks(data))
            .toBeEqual(new Uint8Array([115, 113, 110, 114, 69, 71, 72, 80, 105, 110, 57, 120, 117, 115, 80, 56, 70, 77, 67, 102, 57, 54, 81, 52, 52, 73, 113, 114, 69, 12, 234, 98, 84, 86, 109, 113, 85, 118, 86, 114, 101, 113, 100, 88, 86, 72, 56, 99]));
    });

    it('should encrypt and decrypt data correctly with CTR mode', () => {
        const modeOfOperation = new CTRMode();
        const crypter = new AES(key, modeOfOperation, padding);
        const data = new Uint8Array([1, 2, 3, 4, 5]);
        const encryptedData = crypter.encrypt(data);
        const decryptedData = crypter.decrypt(encryptedData);
        expect(decryptedData).toBeEqual(data);
    });

    it('should encrypt data correctly with OFB mode', () => {
        const aes = new AES(new Uint8Array([119, 54, 103, 107, 122, 110, 105, 85, 112, 120, 119, 76, 65, 75, 114, 88]), new OFBMode()) as unknown as TestableAES;
        const data = [
            new Uint8Array([115, 113, 110, 114, 69, 71, 72, 80, 105, 110, 57, 120, 117, 115, 80, 56]),
            new Uint8Array([70, 77, 67, 102, 57, 54, 81, 52, 52, 73, 113, 114, 69, 12, 234, 98]),
            new Uint8Array([84, 86, 109, 113, 85, 118, 86, 114, 101, 113, 100, 88, 86, 72, 56, 99])
        ];
        const encrypted = aes.encryptBlocks(data);
        const iv = encrypted.slice(0, 16);
        const expected1 = xor(new Uint8Array([204, 61, 183, 229, 50, 56, 27, 100, 216, 225, 56, 2, 111, 250, 250, 229]), iv);
        const expected2 = xor(new Uint8Array([117, 32, 70, 64, 225, 108, 1, 140, 200, 180, 183, 232, 7, 211, 231, 190]), expected1);
        const expected3 = xor(new Uint8Array([136, 10, 156, 131, 75, 26, 27, 62, 167, 170, 48, 213, 153, 123, 102, 174]), expected2);
        expect(encrypted).toBeEqual(new Uint8Array([...iv, ...expected1, ...expected2, ...expected3]));
    });

    it('should encrypt and decrypt data correctly with OFB mode', () => {
        const modeOfOperation = new OFBMode();
        const crypter = new AES(key, modeOfOperation, padding);
        const data = new Uint8Array([1, 2, 3, 4, 5]);
        const encryptedData = crypter.encrypt(data);
        const decryptedData = crypter.decrypt(encryptedData);
        expect(decryptedData).toBeEqual(data);
    });

    it('should encrypt data correctly with ECB mode', () => {
        const aes = new AES(new Uint8Array([119, 54, 103, 107, 122, 110, 105, 85, 112, 120, 119, 76, 65, 75, 114, 88]), new ECBMode()) as unknown as TestableAES;
        const data = [
            new Uint8Array([115, 113, 110, 114, 69, 71, 72, 80, 105, 110, 57, 120, 117, 115, 80, 56]),
            new Uint8Array([70, 77, 67, 102, 57, 54, 81, 52, 52, 73, 113, 114, 69, 12, 234, 98]),
            new Uint8Array([84, 86, 109, 113, 85, 118, 86, 114, 101, 113, 100, 88, 86, 72, 56, 99])
        ];
        expect(aes.encryptBlocks(data))
            .toBeEqual(new Uint8Array([204, 61, 183, 229, 50, 56, 27, 100, 216, 225, 56, 2, 111, 250, 250, 229, 117, 32, 70, 64, 225, 108, 1, 140, 200, 180, 183, 232, 7, 211, 231, 190, 136, 10, 156, 131, 75, 26, 27, 62, 167, 170, 48, 213, 153, 123, 102, 174]));
    });

    it('should decrypt data correctly with ECB mode', () => {
        const aes = new AES(new Uint8Array([119, 54, 103, 107, 122, 110, 105, 85, 112, 120, 119, 76, 65, 75, 114, 88]), new ECBMode()) as unknown as TestableAES;
        const data = [
            new Uint8Array([204, 61, 183, 229, 50, 56, 27, 100, 216, 225, 56, 2, 111, 250, 250, 229]),
            new Uint8Array([117, 32, 70, 64, 225, 108, 1, 140, 200, 180, 183, 232, 7, 211, 231, 190]),
            new Uint8Array([136, 10, 156, 131, 75, 26, 27, 62, 167, 170, 48, 213, 153, 123, 102, 174])
        ];
        expect(aes.decryptBlocks(data))
            .toBeEqual(new Uint8Array([115, 113, 110, 114, 69, 71, 72, 80, 105, 110, 57, 120, 117, 115, 80, 56, 70, 77, 67, 102, 57, 54, 81, 52, 52, 73, 113, 114, 69, 12, 234, 98, 84, 86, 109, 113, 85, 118, 86, 114, 101, 113, 100, 88, 86, 72, 56, 99]));
    });

    it('should encrypt and decrypt data correctly with ECB mode', () => {
        const modeOfOperation = new ECBMode();
        const crypter = new AES(key, modeOfOperation, padding);
        const data = new Uint8Array([1, 2, 3, 4, 5]);
        const encryptedData = crypter.encrypt(data);
        const decryptedData = crypter.decrypt(encryptedData);
        expect(decryptedData).toBeEqual(data);
    });

    it('should handle empty data correctly', () => {
        const crypter = new AES(key);
        const data = new Uint8Array();
        const encryptedData = crypter.encrypt(data);
        const decryptedData = crypter.decrypt(encryptedData);
        expect(decryptedData).toBeEqual(data);
    });

    it('should handle undefined value correctly', () => {
        const crypter = new AES(key);
        const encryptedData = crypter.encodeAndEncrypt(undefined);
        const decryptedValue = crypter.decryptAndDecode(encryptedData);
        expect(decryptedValue).toBeUndefined();
    });

    it('should throw an error if key length is invalid', () => {
        expect(() => new AES(new Uint8Array(10)))
            .toThrowError(Error)
            .toHaveMessage('AES key must be 16, 24 or 32 bytes long.');
    });

    it('should encode and encrypt data correctly', () => {
        const crypter = new AES(key);
        const value = { test: 'value' };
        const encryptedData = crypter.encodeAndEncrypt(value);
        const decryptedValue = crypter.decryptAndDecode(encryptedData);
        expect(decryptedValue).toBeEqual(value);
    });
});
