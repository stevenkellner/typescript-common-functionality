import { randomBytes } from 'crypto';
import type { IDecryptionModeOfOperation, IEncryptionModeOfOperation, IModeOfOperation } from './IModeOfOperation';
import { xor } from '../../utils/xor';

export class CBCMode implements IModeOfOperation {

    public readonly encryption = new CBCMode.CBCEncryptionMode();

    public readonly decryption = new CBCMode.CBCDecryptionMode();
}

// istanbul ignore next
export namespace CBCMode {

    export class CBCEncryptionMode implements IEncryptionModeOfOperation {

        private initializationVector: Uint8Array | null = null;

        public start(): Uint8Array {
            this.initializationVector = randomBytes(16);
            return this.initializationVector;
        }

        public combine(block: Uint8Array, encrypt: (block: Uint8Array) => Uint8Array): Uint8Array {
            if (this.initializationVector === null)
                throw new Error('CBC encryption mode not started.');
            const encrypted = encrypt(xor(this.initializationVector, block));
            this.initializationVector = encrypted;
            return encrypted;
        }

        public finish(): Uint8Array {
            this.initializationVector = null;
            return new Uint8Array();
        }
    }

    export class CBCDecryptionMode implements IDecryptionModeOfOperation {

        private initializationVector: Uint8Array | null = null;

        public start(): Uint8Array {
            this.initializationVector = null;
            return new Uint8Array();
        }

        public combine(block: Uint8Array, decrypt: (block: Uint8Array) => Uint8Array): Uint8Array {
            if (this.initializationVector === null) {
                this.initializationVector = block;
                return new Uint8Array();
            }
            const decrypted = xor(this.initializationVector, decrypt(block));
            this.initializationVector = block;
            return decrypted;
        }

        public finish(): Uint8Array {
            this.initializationVector = null;
            return new Uint8Array();
        }
    }
}
