import type { IBytesCoder } from './IBytesCoder';

export class HexBytesCoder implements IBytesCoder<string> {

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public encode(data: string): Uint8Array {
        return Buffer.from(data, 'hex');
    }

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public decode(data: Uint8Array): string {
        return Buffer.from(data).toString('hex');
    }
}
