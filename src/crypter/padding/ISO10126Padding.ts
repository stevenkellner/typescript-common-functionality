import { randomBytes } from '../../utils';
import type { IPadding } from './IPadding';

export class ISO10126Padding implements IPadding {

    public addTo(data: Uint8Array, blockSize: number): Uint8Array {
        const paddingLength = blockSize - data.length % blockSize;
        return new Uint8Array([...data, ...randomBytes(paddingLength - 1), paddingLength]);
    }

    public removeFrom(data: Uint8Array): Uint8Array {
        const paddingLength = data[data.length - 1];
        return data.slice(0, data.length - paddingLength);
    }
}
