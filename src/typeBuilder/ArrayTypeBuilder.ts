import type { ITypeBuilder } from './ITypeBuilder';

export class ArrayTypeBuilder<Raw, T> implements ITypeBuilder<Raw[], T[]> {

    public constructor(
        private readonly builder: ITypeBuilder<Raw, T>
    ) {}

    public build(value: Raw[]): T[] {
        return value.map(element => this.builder.build(element));
    }
}
