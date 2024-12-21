import type { IBytesCoder } from './IBytesCoder';

export class Base64BytesCoder implements IBytesCoder<string> {

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public encode(data: string): Uint8Array {
        return Buffer.from(data, 'base64');
    }

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public decode(data: Uint8Array): string {
        return Buffer.from(data).toString('base64');
    }
}
