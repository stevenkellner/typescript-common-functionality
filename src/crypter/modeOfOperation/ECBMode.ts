import type { IDecryptionModeOfOperation, IEncryptionModeOfOperation, IModeOfOperation } from './IModeOfOperation';

export class ECBMode implements IModeOfOperation {

    public readonly encryption = new ECBMode.ECBEncryptionMode();

    public readonly decryption = new ECBMode.ECBDecryptionMode();
}

export namespace ECBMode {

    export class ECBEncryptionMode implements IEncryptionModeOfOperation {

        // eslint-disable-next-line @typescript-eslint/class-methods-use-this
        public start(): Uint8Array {
            return new Uint8Array();
        }

        // eslint-disable-next-line @typescript-eslint/class-methods-use-this
        public combine(block: Uint8Array, encrypt: (block: Uint8Array) => Uint8Array): Uint8Array {
            return encrypt(block);
        }

        // eslint-disable-next-line @typescript-eslint/class-methods-use-this
        public finish(): Uint8Array {
            return new Uint8Array();
        }
    }

    export class ECBDecryptionMode implements IDecryptionModeOfOperation {

        // eslint-disable-next-line @typescript-eslint/class-methods-use-this
        public start(): Uint8Array {
            return new Uint8Array();
        }

        // eslint-disable-next-line @typescript-eslint/class-methods-use-this
        public combine(block: Uint8Array, decrypt: (block: Uint8Array) => Uint8Array): Uint8Array {
            return decrypt(block);
        }

        // eslint-disable-next-line @typescript-eslint/class-methods-use-this
        public finish(): Uint8Array {
            return new Uint8Array();
        }
    }
}
