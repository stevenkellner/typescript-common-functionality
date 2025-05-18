import { expect } from '@assertive-ts/core';
import { CTRMode } from '../../../src/crypter/modeOfOperation/CTRMode';
import { AES } from '../../../src/crypter/AES';
import { PKCS7Padding } from '../../../src';
import randomBytes from 'randombytes';
import { xor } from '../../../src/utils/xor';
import { Block } from 'aes-ts';

describe('CTRMode', () => {
    const key = new Uint8Array([119, 54, 103, 107, 122, 110, 105, 85, 112, 120, 119, 76, 65, 75, 114, 88]);
    const padding = new PKCS7Padding();

    it('should encrypt and decrypt data correctly', () => {
        const modeOfOperation = new CTRMode();
        const crypter = new AES(key, modeOfOperation, padding);
        const data = new Uint8Array([1, 2, 3, 4, 5]);
        const encryptedData = crypter.encrypt(data);
        const decryptedData = crypter.decrypt(encryptedData);
        expect(decryptedData).toBeEqual(data);
    });

    it('should handle empty data correctly', () => {
        const modeOfOperation = new CTRMode();
        const crypter = new AES(key, modeOfOperation, padding);
        const data = new Uint8Array();
        const encryptedData = crypter.encrypt(data);
        const decryptedData = crypter.decrypt(encryptedData);
        expect(decryptedData).toBeEqual(data);
    });

    it('should handle undefined value correctly', () => {
        const modeOfOperation = new CTRMode();
        const crypter = new AES(key, modeOfOperation, padding);
        const encryptedData = crypter.encodeAndEncrypt(undefined);
        const decryptedData = crypter.decryptAndDecode(encryptedData);
        expect(decryptedData).toBeUndefined();
    });

    it('should throw error if encryption mode not started', () => {
        const modeOfOperation = new CTRMode.CTREncryptionMode();
        const data = new Uint8Array([1, 2, 3, 4, 5]);
        expect(() => modeOfOperation.combine(data, block => block))
            .toThrowError(Error)
            .toHaveMessage('CTR encryption mode not started.');
    });

    it('should encrypt', () => {
        const modeOfOperation = new CTRMode().encryption;
        const iv = modeOfOperation.start();
        const block1 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        const encrypted1 = modeOfOperation.combine(block1, block => block);
        expect(encrypted1.buffer).toBeEqual(iv.buffer);
        modeOfOperation.finish();
    });

    it('should decrypt', () => {
        const modeOfOperation = new CTRMode().decryption;
        expect(modeOfOperation.start()).toBeEqual(new Uint8Array());
        const block1 = randomBytes(16);
        const decrypted1 = modeOfOperation.combine(block1, block => block);
        expect(decrypted1).toBeEqual(new Uint8Array());
        modeOfOperation.finish();
    });

    it('should encrypt and decrypt trivial', () => {
        const encryptionModeOfOperation = new CTRMode().encryption;
        const iv = encryptionModeOfOperation.start();
        const block1 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        const block2 = randomBytes(16);
        const block3 = randomBytes(16);
        const encrypted1 = encryptionModeOfOperation.combine(block1, block => block);
        const encrypted2 = encryptionModeOfOperation.combine(block2, block => block);
        const encrypted3 = encryptionModeOfOperation.combine(block3, block => block);
        encryptionModeOfOperation.finish();
        const decryptionModeOfOperation = new CTRMode().decryption;
        decryptionModeOfOperation.start();
        decryptionModeOfOperation.combine(iv, block => block);
        const decrypted1 = decryptionModeOfOperation.combine(encrypted1, block => block);
        const decrypted2 = decryptionModeOfOperation.combine(encrypted2, block => block);
        const decrypted3 = decryptionModeOfOperation.combine(encrypted3, block => block);
        decryptionModeOfOperation.finish();
        expect(decrypted1.buffer).toBeEqual(block1.buffer);
        expect(decrypted2.buffer).toBeEqual(block2.buffer);
        expect(decrypted3.buffer).toBeEqual(block3.buffer);
    });

    it('increment counter', () => {
        let counter = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        CTRMode.incrementCounter(counter);
        expect(counter).toBeEqual(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]));

        counter = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255]);
        CTRMode.incrementCounter(counter);
        expect(counter).toBeEqual(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]));

        counter = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]);
        CTRMode.incrementCounter(counter);
        expect(counter).toBeEqual(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]));

        counter = new Uint8Array([255, 255, 45, 87, 221, 198, 7, 255, 34, 252, 255, 146, 0, 65, 255, 56]);
        CTRMode.incrementCounter(counter);
        expect(counter).toBeEqual(new Uint8Array([255, 255, 45, 87, 221, 198, 7, 255, 34, 252, 255, 146, 0, 65, 255, 57]));

        counter = new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]);
        CTRMode.incrementCounter(counter);
        expect(counter).toBeEqual(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));

        counter = new Uint8Array([255, 255, 45, 87, 221, 198, 7, 255, 34, 252, 255, 146, 0, 65, 255, 56]);
        for (let i = 0; i < 1030; i++)
            CTRMode.incrementCounter(counter);
        expect(counter).toBeEqual(new Uint8Array([255, 255, 45, 87, 221, 198, 7, 255, 34, 252, 255, 146, 0, 66, 3, 62]));
    });

    function incremented(counter: Uint8Array, times: number = 1): Uint8Array {
        const _counter = new Uint8Array(counter);
        for (let i = 0; i < times; i++)
            CTRMode.incrementCounter(_counter);
        return _counter;
    }

    it('encrypt', () => {
        const modeOfOperation = new CTRMode().encryption;
        const counter = new Uint8Array(modeOfOperation.start());
        const block1 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        const block2 = randomBytes(16);
        const block3 = randomBytes(16);
        const encrypted1 = modeOfOperation.combine(block1, block => block);
        const encrypted2 = modeOfOperation.combine(block2, block => block);
        const encrypted3 = modeOfOperation.combine(block3, block => block);
        expect(encrypted1.buffer).toBeEqual(incremented(counter, 1).buffer);
        expect(encrypted2.buffer).toBeEqual(xor(block2, incremented(counter, 2)).buffer);
        expect(encrypted3.buffer).toBeEqual(xor(block3, incremented(counter, 3)).buffer);
        expect(modeOfOperation.finish()).toBeEqual(new Uint8Array());
    });

    it('decrypt', () => {
        const modeOfOperation = new CTRMode().decryption;
        expect(modeOfOperation.start()).toBeEqual(new Uint8Array());
        const counter = randomBytes(16);
        const block1 = new Uint8Array(counter);
        const block2 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        const block3 = randomBytes(16);
        const decrypted1 = modeOfOperation.combine(block1, block => block);
        const decrypted2 = modeOfOperation.combine(block2, block => block);
        const decrypted3 = modeOfOperation.combine(block3, block => block);
        expect(decrypted1).toBeEqual(new Uint8Array());
        expect(decrypted2).toBeEqual(incremented(counter, 1));
        expect(decrypted3.buffer).toBeEqual(xor(block3, incremented(counter, 2)).buffer);
        expect(modeOfOperation.finish()).toBeEqual(new Uint8Array());
    });

    it('encrypt and decrypt trivial', () => {
        const modeOfOperation = new CTRMode();
        const counter = new Uint8Array(modeOfOperation.encryption.start());
        const block1 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        const block2 = randomBytes(16);
        const block3 = randomBytes(16);
        const encrypted1 = modeOfOperation.encryption.combine(block1, block => block);
        const encrypted2 = modeOfOperation.encryption.combine(block2, block => block);
        const encrypted3 = modeOfOperation.encryption.combine(block3, block => block);
        modeOfOperation.encryption.finish();
        modeOfOperation.decryption.start();
        modeOfOperation.decryption.combine(counter, block => block);
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
        const modeOfOperation = new CTRMode();
        const counter = new Uint8Array(modeOfOperation.encryption.start());
        const block1 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        const block2 = randomBytes(16);
        const block3 = randomBytes(16);
        const encrypted1 = modeOfOperation.encryption.combine(block1, block => blockCrypter.encrypt(block));
        const encrypted2 = modeOfOperation.encryption.combine(block2, block => blockCrypter.encrypt(block));
        const encrypted3 = modeOfOperation.encryption.combine(block3, block => blockCrypter.encrypt(block));
        modeOfOperation.encryption.finish();
        modeOfOperation.decryption.start();
        modeOfOperation.decryption.combine(counter, block => blockCrypter.decrypt(block));
        const decrypted1 = modeOfOperation.decryption.combine(encrypted1, block => blockCrypter.decrypt(block));
        const decrypted2 = modeOfOperation.decryption.combine(encrypted2, block => blockCrypter.decrypt(block));
        const decrypted3 = modeOfOperation.decryption.combine(encrypted3, block => blockCrypter.decrypt(block));
        modeOfOperation.decryption.finish();
        expect(decrypted1.buffer).toBeEqual(block1.buffer);
        expect(decrypted2.buffer).toBeEqual(block2.buffer);
        expect(decrypted3.buffer).toBeEqual(block3.buffer);
    });
});
