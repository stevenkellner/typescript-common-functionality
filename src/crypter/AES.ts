import { Block } from 'aes-ts';
import { ICrypter } from './ICrypter';
import { CBCMode, type IModeOfOperation } from './modeOfOperation';
import { PKCS7Padding, type IPadding } from './padding';

export class AES extends ICrypter {

    private readonly blockCrypter: Block;

    protected readonly blockSize = 16;

    public constructor(
        key: Uint8Array,
        private readonly modeOfOperation: IModeOfOperation = new CBCMode(),
        padding: IPadding = new PKCS7Padding()
    ) {
        super(padding);
        if (key.length !== 16 && key.length !== 24 && key.length !== 32)
            throw new Error('AES key must be 16, 24 or 32 bytes long.');
        this.blockCrypter = new Block(key);
    }

    protected encryptBlocks(blocks: Uint8Array[]): Uint8Array {
        const modeOfOperation = this.modeOfOperation.encryption;
        let encrypted = modeOfOperation.start();
        for (const block of blocks)
            encrypted = new Uint8Array([...encrypted, ...modeOfOperation.combine(block, block => this.blockCrypter.encrypt(block))]);
        return new Uint8Array([...encrypted, ...modeOfOperation.finish()]);
    }

    protected decryptBlocks(blocks: Uint8Array[]): Uint8Array {
        const modeOfOperation = this.modeOfOperation.decryption;
        let decrypted = modeOfOperation.start();
        for (const block of blocks)
            decrypted = new Uint8Array([...decrypted, ...modeOfOperation.combine(block, block => this.blockCrypter.decrypt(block))]);
        return new Uint8Array([...decrypted, ...modeOfOperation.finish()]);
    }
}
