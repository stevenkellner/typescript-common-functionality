import type { ITypeBuilder } from './ITypeBuilder';

export class ValueTypeBuilder<T, Context = never> implements ITypeBuilder<T, T, Context> {

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public build(value: T): T {
        return value;
    }
}
