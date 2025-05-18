import type { IDecryptionModeOfOperation, IEncryptionModeOfOperation, IModeOfOperation } from './IModeOfOperation';
import { xor } from '../../utils/xor';
import { randomBytes } from '../../utils';

export class CTRMode implements IModeOfOperation {

    public readonly encryption = new CTRMode.CTREncryptionMode();

    public readonly decryption = new CTRMode.CTRDecryptionMode();
}

// istanbul ignore next
export namespace CTRMode {

    export function incrementCounter(counter: Uint8Array): void {
        for (let i = 15; i >= 0; i--) {
            if (counter[i] !== 255) {
                counter[i] += 1;
                break;
            } else {
                counter[i] = 0;
                if (i === 0)
                    counter[15] = 0;
            }
        }
    }

    export class CTREncryptionMode implements IEncryptionModeOfOperation {

        private counter: Uint8Array | null = null;

        public start(): Uint8Array {
            this.counter = randomBytes(16);
            return new Uint8Array(this.counter);
        }

        public combine(block: Uint8Array, encrypt: (block: Uint8Array) => Uint8Array): Uint8Array {
            if (this.counter === null)
                throw new Error('CTR encryption mode not started.');
            incrementCounter(this.counter);
            return xor(this.counter, encrypt(block));
        }

        public finish(): Uint8Array {
            this.counter = null;
            return new Uint8Array();
        }
    }

    export class CTRDecryptionMode implements IDecryptionModeOfOperation {

        private counter: Uint8Array | null = null;

        public start(): Uint8Array {
            this.counter = null;
            return new Uint8Array();
        }

        public combine(block: Uint8Array, decrypt: (block: Uint8Array) => Uint8Array): Uint8Array {
            if (this.counter === null) {
                this.counter = new Uint8Array(block);
                return new Uint8Array();
            }
            incrementCounter(this.counter);
            const decrypted = decrypt(xor(this.counter, block));
            return decrypted;
        }

        public finish(): Uint8Array {
            this.counter = null;
            return new Uint8Array();
        }
    }

}
