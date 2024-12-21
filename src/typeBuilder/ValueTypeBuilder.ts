import type { ITypeBuilder } from './ITypeBuilder';

export class ValueTypeBuilder<T> implements ITypeBuilder<T, T> {

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public build(value: T): T {
        return value;
    }
}
