import type { ITypeBuilder } from './ITypeBuilder';

export class IntersectionTypeBuilder<Raw1, Raw2, T1 extends Record<PropertyKey, unknown>, T2 extends Record<PropertyKey, unknown>> implements ITypeBuilder<Raw1 & Raw2, T1 & T2> {

    public constructor(
        private readonly builder1: ITypeBuilder<Raw1, T1>,
        private readonly builder2: ITypeBuilder<Raw2, T2>

    ) {}

    public build(value: Raw1 & Raw2): T1 & T2 {
        return {
            ...this.builder1.build(value),
            ...this.builder2.build(value)
        };
    }
}
