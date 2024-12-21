import { Utf8BytesCoder } from './Utf8BytesCoder';
import { HexBytesCoder } from './HexBytesCoder';
import { Base64BytesCoder } from './Base64BytesCoder';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class BytesCoder {

    private static readonly base64BytesCoder = new Base64BytesCoder();

    private static readonly hexBytesCoder = new HexBytesCoder();

    private static readonly utf8BytesCoder = new Utf8BytesCoder();

    public static fromBase64(text: string): Uint8Array {
        return this.base64BytesCoder.encode(text);
    }

    public static toBase64(bytes: Uint8Array): string {
        return this.base64BytesCoder.decode(bytes);
    }

    public static fromHex(text: string): Uint8Array {
        return this.hexBytesCoder.encode(text);
    }

    public static toHex(bytes: Uint8Array): string {
        return this.hexBytesCoder.decode(bytes);
    }

    public static fromUtf8(text: string): Uint8Array {
        return this.utf8BytesCoder.encode(text);
    }

    public static toUtf8(bytes: Uint8Array): string {
        return this.utf8BytesCoder.decode(bytes);
    }
}
