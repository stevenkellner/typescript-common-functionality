import type { ITypeBuilder } from './ITypeBuilder';

export class TypeBuilder<Raw, T> implements ITypeBuilder<Raw, T> {

    public constructor(
        public readonly _build: (value: Raw) => T
    ) {}

    public build(value: Raw): T {
        return this._build(value);
    }
}
