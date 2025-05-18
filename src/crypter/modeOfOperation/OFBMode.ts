import type { IModeOfOperation, IDecryptionModeOfOperation, IEncryptionModeOfOperation } from './IModeOfOperation';
import { xor } from '../../utils/xor';
import { randomBytes } from '../../utils';

export class OFBMode implements IModeOfOperation {

    public readonly encryption = new OFBMode.OFBEncryptionMode();

    public readonly decryption = new OFBMode.ECBDecryptionMode();
}

// istanbul ignore next
export namespace OFBMode {

    export class OFBEncryptionMode implements IEncryptionModeOfOperation {

        private initializationVector: Uint8Array | null = null;

        public start(): Uint8Array {
            this.initializationVector = randomBytes(16);
            return this.initializationVector;
        }

        public combine(block: Uint8Array, encrypt: (block: Uint8Array) => Uint8Array): Uint8Array {
            if (this.initializationVector === null)
                throw new Error('OFB encryption mode not started.');
            const encrypted = xor(this.initializationVector, encrypt(block));
            this.initializationVector = encrypted;
            return encrypted;
        }

        public finish(): Uint8Array {
            this.initializationVector = null;
            return new Uint8Array();
        }
    }

    export class ECBDecryptionMode implements IDecryptionModeOfOperation {

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
            const decrypted = decrypt(xor(this.initializationVector, block));
            this.initializationVector = block;
            return decrypted;
        }

        public finish(): Uint8Array {
            this.initializationVector = null;
            return new Uint8Array();
        }
    }
}
