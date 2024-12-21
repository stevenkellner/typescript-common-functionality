import type { IPadding } from './IPadding';

export class ASNIX923Padding implements IPadding {

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public addTo(data: Uint8Array, blockSize: number): Uint8Array {
        const paddingLength = blockSize - data.length % blockSize;
        return new Uint8Array([...data, ...new Array<number>(paddingLength - 1).fill(0), paddingLength]);
    }

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public removeFrom(data: Uint8Array): Uint8Array {
        const paddingLength = data[data.length - 1];
        return data.slice(0, data.length - paddingLength);
    }
}
