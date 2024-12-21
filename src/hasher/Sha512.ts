import { createHash } from 'crypto';
import type { IHasher } from './IHasher';

export class Sha512 implements IHasher {

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public hash(data: Uint8Array): Uint8Array {
        const hash = createHash('sha512');
        return hash.update(data).digest();
    }
}
