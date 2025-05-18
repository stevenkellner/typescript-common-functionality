import { expect } from '@assertive-ts/core';
import { ECBMode } from '../../../src/crypter/modeOfOperation/ECBMode';
import { AES } from '../../../src/crypter/AES';
import { PKCS7Padding } from '../../../src';
import { randomBytes } from '../../../src/utils';
import { Block } from 'aes-ts';

describe('ECBMode', () => {
    const key = new Uint8Array([119, 54, 103, 107, 122, 110, 105, 85, 112, 120, 119, 76, 65, 75, 114, 88]);
    const padding = new PKCS7Padding();

    it('should encrypt and decrypt data correctly', () => {
        const modeOfOperation = new ECBMode();
        const crypter = new AES(key, modeOfOperation, padding);
        const data = new Uint8Array([1, 2, 3, 4, 5]);
        const encryptedData = crypter.encrypt(data);
        const decryptedData = crypter.decrypt(encryptedData);
        expect(decryptedData).toBeEqual(data);
    });

    it('should handle empty data correctly', () => {
        const modeOfOperation = new ECBMode();
        const crypter = new AES(key, modeOfOperation, padding);
        const data = new Uint8Array();
        const encryptedData = crypter.encrypt(data);
        const decryptedData = crypter.decrypt(encryptedData);
        expect(decryptedData).toBeEqual(data);
    });

    it('should handle undefined value correctly', () => {
        const modeOfOperation = new ECBMode();
        const crypter = new AES(key, modeOfOperation, padding);
        const encryptedData = crypter.encodeAndEncrypt(undefined);
        const decryptedData = crypter.decryptAndDecode(encryptedData);
        expect(decryptedData).toBeUndefined();
    });

    it('should handle random data correctly', () => {
        const modeOfOperation = new ECBMode();
        const crypter = new AES(key, modeOfOperation, padding);
        const data = randomBytes(16);
        const encryptedData = crypter.encrypt(data);
        const decryptedData = crypter.decrypt(encryptedData);
        expect(decryptedData.buffer).toBeEqual(data.buffer);
    });

    it('should handle large data correctly', () => {
        const modeOfOperation = new ECBMode();
        const crypter = new AES(key, modeOfOperation, padding);
        const data = randomBytes(1024);
        const encryptedData = crypter.encrypt(data);
        const decryptedData = crypter.decrypt(encryptedData);
        expect(decryptedData.buffer).toBeEqual(data.buffer);
    });

    it('should encrypt', () => {
        const modeOfOperation = new ECBMode().encryption;
        expect(modeOfOperation.start()).toBeEqual(new Uint8Array());
        const block1 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        const block2 = randomBytes(16);
        const block3 = randomBytes(16);
        const encrypted1 = modeOfOperation.combine(block1, block => block);
        const encrypted2 = modeOfOperation.combine(block2, block => block);
        const encrypted3 = modeOfOperation.combine(block3, block => block);
        expect(encrypted1).toBeEqual(block1);
        expect(encrypted2).toBeEqual(block2);
        expect(encrypted3).toBeEqual(block3);
        expect(modeOfOperation.finish()).toBeEqual(new Uint8Array());
    });

    it('should decrypt', () => {
        const modeOfOperation = new ECBMode().decryption;
        expect(modeOfOperation.start()).toBeEqual(new Uint8Array());
        const block1 = randomBytes(16);
        const block2 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        const block3 = randomBytes(16);
        const decrypted1 = modeOfOperation.combine(block1, block => block);
        const decrypted2 = modeOfOperation.combine(block2, block => block);
        const decrypted3 = modeOfOperation.combine(block3, block => block);
        expect(decrypted1).toBeEqual(block1);
        expect(decrypted2).toBeEqual(block2);
        expect(decrypted3).toBeEqual(block3);
        expect(modeOfOperation.finish()).toBeEqual(new Uint8Array());
    });

    it('should encrypt and decrypt trivial', () => {
        const modeOfOperation = new ECBMode();
        modeOfOperation.encryption.start();
        const block1 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        const block2 = randomBytes(16);
        const block3 = randomBytes(16);
        const encrypted1 = modeOfOperation.encryption.combine(block1, block => block);
        const encrypted2 = modeOfOperation.encryption.combine(block2, block => block);
        const encrypted3 = modeOfOperation.encryption.combine(block3, block => block);
        modeOfOperation.encryption.finish();
        modeOfOperation.decryption.start();
        const decrypted1 = modeOfOperation.decryption.combine(encrypted1, block => block);
        const decrypted2 = modeOfOperation.decryption.combine(encrypted2, block => block);
        const decrypted3 = modeOfOperation.decryption.combine(encrypted3, block => block);
        modeOfOperation.decryption.finish();
        expect(decrypted1).toBeEqual(block1);
        expect(decrypted2).toBeEqual(block2);
        expect(decrypted3).toBeEqual(block3);
    });

    it('should encrypt and decrypt aes', () => {
        const blockCrypter = new Block(randomBytes(16));
        const modeOfOperation = new ECBMode();
        modeOfOperation.encryption.start();
        const block1 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        const block2 = randomBytes(16);
        const block3 = randomBytes(16);
        const encrypted1 = modeOfOperation.encryption.combine(block1, block => blockCrypter.encrypt(block));
        const encrypted2 = modeOfOperation.encryption.combine(block2, block => blockCrypter.encrypt(block));
        const encrypted3 = modeOfOperation.encryption.combine(block3, block => blockCrypter.encrypt(block));
        modeOfOperation.encryption.finish();
        modeOfOperation.decryption.start();
        const decrypted1 = modeOfOperation.decryption.combine(encrypted1, block => blockCrypter.decrypt(block));
        const decrypted2 = modeOfOperation.decryption.combine(encrypted2, block => blockCrypter.decrypt(block));
        const decrypted3 = modeOfOperation.decryption.combine(encrypted3, block => blockCrypter.decrypt(block));
        modeOfOperation.decryption.finish();
        expect(decrypted1.buffer).toBeEqual(block1.buffer);
        expect(decrypted2.buffer).toBeEqual(block2.buffer);
        expect(decrypted3.buffer).toBeEqual(block3.buffer);
    });
});
