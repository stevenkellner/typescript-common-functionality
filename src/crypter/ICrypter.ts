import { BytesCoder } from '../bytesCoder';
import type { IPadding } from './padding';

export abstract class ICrypter {

    protected readonly abstract blockSize: number;

    public constructor(
        private readonly padding: IPadding
    ) {}

    protected abstract encryptBlocks(blocks: Uint8Array[]): Uint8Array;

    protected abstract decryptBlocks(blocks: Uint8Array[]): Uint8Array;

    public encrypt(data: Uint8Array): Uint8Array {
        const paddedData = this.padding.addTo(data, this.blockSize);
        const blocks = [];
        for (let i = 0; i < paddedData.length; i += this.blockSize)
            blocks.push(paddedData.slice(i, i + this.blockSize));
        return this.encryptBlocks(blocks);
    }

    public decrypt(data: Uint8Array): Uint8Array {
        const blocks = [];
        for (let i = 0; i < data.length; i += this.blockSize)
            blocks.push(data.slice(i, i + this.blockSize));
        const decryptedData = this.decryptBlocks(blocks);
        return this.padding.removeFrom(decryptedData);
    }

    public encodeAndEncrypt(value: unknown): Uint8Array {
        const jsonString = value === undefined ? '' : JSON.stringify(value);
        const data = BytesCoder.fromUtf8(jsonString);
        return this.encrypt(data);
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
    public decryptAndDecode<T = unknown>(data: Uint8Array): T {
        const decryptedData = this.decrypt(data);
        const value = BytesCoder.toUtf8(decryptedData);
        return (value === '' ? undefined : JSON.parse(value)) as T;
    }
}
