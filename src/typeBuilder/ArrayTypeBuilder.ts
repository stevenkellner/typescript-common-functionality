import type { ITypeBuilder } from './ITypeBuilder';

export class ArrayTypeBuilder<Raw, T, Context = never> implements ITypeBuilder<Raw[], T[], Context> {

    public constructor(
        private readonly builder: ITypeBuilder<Raw, T, Context>
    ) {}

    public build(value: Raw[], context?: Context): T[] {
        return value.map(element => this.builder.build(element, context));
    }
}
