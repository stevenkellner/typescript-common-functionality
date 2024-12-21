import { expect } from '@assertive-ts/core';
import { OFBMode } from '../../../src/crypter/modeOfOperation/OFBMode';
import { AES } from '../../../src/crypter/AES';
import { PKCS7Padding } from '../../../src';
import { randomBytes } from 'crypto';
import { xor } from '../../../src/utils/xor';
import { Block } from 'aes-ts';

describe('OFBMode', () => {
    const key = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    const padding = new PKCS7Padding();

    it('should encrypt and decrypt data correctly with OFB mode', () => {
        const modeOfOperation = new OFBMode();
        const crypter = new AES(key, modeOfOperation, padding);
        const data = new Uint8Array([1, 2, 3, 4, 5]);
        const encryptedData = crypter.encrypt(data);
        const decryptedData = crypter.decrypt(encryptedData);
        expect(decryptedData).toBeEqual(data);
    });

    it('should throw error if OFB encryption mode not started', () => {
        const modeOfOperation = new OFBMode();
        const encryptionMode = modeOfOperation.encryption;
        const data = new Uint8Array([1, 2, 3, 4, 5]);
        expect(() => encryptionMode.combine(data, block => block))
            .toThrowError(Error)
            .toHaveMessage('OFB encryption mode not started.');
    });

    it('should reset initialization vector after finish in encryption mode', () => {
        const modeOfOperation = new OFBMode();
        const encryptionMode = modeOfOperation.encryption;
        encryptionMode.start();
        encryptionMode.finish();
        expect(() => encryptionMode.combine(new Uint8Array([1, 2, 3, 4, 5]), block => block))
            .toThrowError(Error)
            .toHaveMessage('OFB encryption mode not started.');
    });

    it('should reset initialization vector after finish in decryption mode', () => {
        const modeOfOperation = new OFBMode();
        const decryptionMode = modeOfOperation.decryption;
        decryptionMode.start();
        decryptionMode.finish();
        const data = new Uint8Array([1, 2, 3, 4, 5]);
        expect(decryptionMode.combine(data, block => block)).toBeEqual(new Uint8Array());
    });

    it('encrypt', () => {
        const modeOfOperation = new OFBMode().encryption;
        const iv = modeOfOperation.start();
        const block1 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        const block2 = randomBytes(16);
        const block3 = randomBytes(16);
        const encrypted1 = modeOfOperation.combine(block1, block => block);
        const encrypted2 = modeOfOperation.combine(block2, block => block);
        const encrypted3 = modeOfOperation.combine(block3, block => block);
        expect(encrypted1).toBeEqual(iv);
        expect(encrypted2).toBeEqual(xor(block2, encrypted1));
        expect(encrypted3).toBeEqual(xor(block3, encrypted2));
        expect(modeOfOperation.finish()).toBeEqual(new Uint8Array());
    });

    it('decrypt', () => {
        const modeOfOperation = new OFBMode().decryption;
        expect(modeOfOperation.start()).toBeEqual(new Uint8Array());
        const block1 = randomBytes(16);
        const block2 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        const block3 = randomBytes(16);
        const decrypted1 = modeOfOperation.combine(block1, block => block);
        const decrypted2 = modeOfOperation.combine(block2, block => block);
        const decrypted3 = modeOfOperation.combine(block3, block => block);
        expect(decrypted1).toBeEqual(new Uint8Array());
        expect(decrypted2).toBeEqual(block1);
        expect(decrypted3.buffer).toBeEqual(xor(block3, block2).buffer);
        expect(modeOfOperation.finish()).toBeEqual(new Uint8Array());
    });

    it('encrypt and decrypt trivial', () => {
        const modeOfOperation = new OFBMode();
        const iv = modeOfOperation.encryption.start();
        const block1 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        const block2 = randomBytes(16);
        const block3 = randomBytes(16);
        const encrypted1 = modeOfOperation.encryption.combine(block1, block => block);
        const encrypted2 = modeOfOperation.encryption.combine(block2, block => block);
        const encrypted3 = modeOfOperation.encryption.combine(block3, block => block);
        modeOfOperation.encryption.finish();
        modeOfOperation.decryption.start();
        modeOfOperation.decryption.combine(iv, block => block);
        const decrypted1 = modeOfOperation.decryption.combine(encrypted1, block => block);
        const decrypted2 = modeOfOperation.decryption.combine(encrypted2, block => block);
        const decrypted3 = modeOfOperation.decryption.combine(encrypted3, block => block);
        modeOfOperation.decryption.finish();
        expect(decrypted1.buffer).toBeEqual(block1.buffer);
        expect(decrypted2.buffer).toBeEqual(block2.buffer);
        expect(decrypted3.buffer).toBeEqual(block3.buffer);
    });

    it('encrypt and decrypt aes', () => {
        const blockCrypter = new Block(randomBytes(16));
        const modeOfOperation = new OFBMode();
        const iv = modeOfOperation.encryption.start();
        const block1 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        const block2 = randomBytes(16);
        const block3 = randomBytes(16);
        const encrypted1 = modeOfOperation.encryption.combine(block1, block => blockCrypter.encrypt(block));
        const encrypted2 = modeOfOperation.encryption.combine(block2, block => blockCrypter.encrypt(block));
        const encrypted3 = modeOfOperation.encryption.combine(block3, block => blockCrypter.encrypt(block));
        modeOfOperation.encryption.finish();
        modeOfOperation.decryption.start();
        modeOfOperation.decryption.combine(iv, block => blockCrypter.decrypt(block));
        const decrypted1 = modeOfOperation.decryption.combine(encrypted1, block => blockCrypter.decrypt(block));
        const decrypted2 = modeOfOperation.decryption.combine(encrypted2, block => blockCrypter.decrypt(block));
        const decrypted3 = modeOfOperation.decryption.combine(encrypted3, block => blockCrypter.decrypt(block));
        modeOfOperation.decryption.finish();
        expect(decrypted1.buffer).toBeEqual(block1.buffer);
        expect(decrypted2.buffer).toBeEqual(block2.buffer);
        expect(decrypted3.buffer).toBeEqual(block3.buffer);
    });
});
