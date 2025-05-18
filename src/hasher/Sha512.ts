import { sha512 } from 'js-sha512';
import type { IHasher } from './IHasher';

export class Sha512 implements IHasher {

    public hash(data: Uint8Array): Uint8Array {
        const hash = sha512.create();
        return new Uint8Array(hash.update(data).arrayBuffer());
    }
}
