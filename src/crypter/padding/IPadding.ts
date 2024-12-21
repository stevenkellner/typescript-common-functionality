export interface IPadding {

    addTo(data: Uint8Array, blockSize: number): Uint8Array;

    removeFrom(data: Uint8Array): Uint8Array;
}
