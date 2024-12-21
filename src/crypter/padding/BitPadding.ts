import type { IPadding } from './IPadding';

export class BitPadding implements IPadding {

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public addTo(data: Uint8Array, blockSize: number): Uint8Array {
        const paddingLength = blockSize - data.length % blockSize;
        return new Uint8Array([...data, 1, ...new Array<number>(paddingLength - 1).fill(0)]);
    }

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public removeFrom(data: Uint8Array): Uint8Array {
        let index = data.length - 1;
        while (data[index] !== 1)
            index -= 1;
        return data.slice(0, index);
    }
}
