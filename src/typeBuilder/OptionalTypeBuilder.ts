import type { ITypeBuilder } from './ITypeBuilder';

export class OptionalTypeBuilder<Raw, T> implements ITypeBuilder<Raw | null, T | null> {

    public constructor(
        private readonly builder: ITypeBuilder<Raw, T>
    ) {}

    public build(value: Raw | null): T | null {
        if (value === null)
            return null;
        return this.builder.build(value);
    }
}
