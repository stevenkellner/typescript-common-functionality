export interface IEncryptionModeOfOperation {

    start(): Uint8Array;

    combine(block: Uint8Array, encrypt: (block: Uint8Array) => Uint8Array): Uint8Array;

    finish(): Uint8Array;
}

export interface IDecryptionModeOfOperation {

    start(): Uint8Array;

    combine(block: Uint8Array, decrypt: (block: Uint8Array) => Uint8Array): Uint8Array;

    finish(): Uint8Array;
}

export interface IModeOfOperation {

    encryption: IEncryptionModeOfOperation;

    decryption: IDecryptionModeOfOperation;
}
