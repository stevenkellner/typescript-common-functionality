import type { IDecryptionModeOfOperation, IEncryptionModeOfOperation, IModeOfOperation } from './IModeOfOperation';

export class ECBMode implements IModeOfOperation {

    public readonly encryption = new ECBMode.ECBEncryptionMode();

    public readonly decryption = new ECBMode.ECBDecryptionMode();
}

// istanbul ignore next
export namespace ECBMode {

    export class ECBEncryptionMode implements IEncryptionModeOfOperation {

        public start(): Uint8Array {
            return new Uint8Array();
        }

        public combine(block: Uint8Array, encrypt: (block: Uint8Array) => Uint8Array): Uint8Array {
            return encrypt(block);
        }

        public finish(): Uint8Array {
            return new Uint8Array();
        }
    }

    export class ECBDecryptionMode implements IDecryptionModeOfOperation {

        public start(): Uint8Array {
            return new Uint8Array();
        }

        public combine(block: Uint8Array, decrypt: (block: Uint8Array) => Uint8Array): Uint8Array {
            return decrypt(block);
        }

        public finish(): Uint8Array {
            return new Uint8Array();
        }
    }
}
