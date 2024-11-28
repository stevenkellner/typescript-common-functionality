import type { ITypeBuilder } from './ITypeBuilder';

export class OptionalTypeBuilder<Raw, T, Context = never> implements ITypeBuilder<Raw | null, T | null, Context> {

    public constructor(
        private readonly builder: ITypeBuilder<Raw, T, Context>
    ) {}

    public build(value: Raw | null, context?: Context): T | null {
        if (value === null)
            return null;
        return this.builder.build(value, context);
    }
}
