import type { ITypeBuilder } from './ITypeBuilder';

export class TypeBuilder<Raw, T, Context = never> implements ITypeBuilder<Raw, T, Context> {

    public constructor(
        public readonly _build: (value: Raw, context?: Context) => T
    ) {}

    public build(value: Raw, context?: Context): T {
        return this._build(value, context);
    }
}
