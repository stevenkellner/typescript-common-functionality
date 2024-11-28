import type { ITypeBuilder } from './ITypeBuilder';

export class IntersectionTypeBuilder<Raw1, Raw2, T1 extends Record<PropertyKey, unknown>, T2 extends Record<PropertyKey, unknown>, Context = never> implements ITypeBuilder<Raw1 & Raw2, T1 & T2, Context> {

    public constructor(
        private readonly builder1: ITypeBuilder<Raw1, T1, Context>,
        private readonly builder2: ITypeBuilder<Raw2, T2, Context>

    ) {}

    public build(value: Raw1 & Raw2, context?: Context): T1 & T2 {
        return {
            ...this.builder1.build(value, context),
            ...this.builder2.build(value, context)
        };
    }
}
