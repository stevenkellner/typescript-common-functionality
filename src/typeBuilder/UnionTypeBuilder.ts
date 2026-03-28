import type { ITypeBuilder } from './ITypeBuilder';

export class UnionTypeBuilder<Raw1, Raw2, T1, T2> implements ITypeBuilder<Raw1 | Raw2, T1 | T2> {

    public constructor(
        private readonly identify: (value: Raw1 | Raw2) => 'T1' | 'T2',
        private readonly builder1: ITypeBuilder<Raw1, T1>,
        private readonly builder2: ITypeBuilder<Raw2, T2>

    ) {}

    public build(value: Raw1 | Raw2): T1 | T2 {
        const builderType = this.identify(value);
        if (builderType === 'T1')
            return this.builder1.build(value as Raw1);
        return this.builder2.build(value as Raw2);
    }
}
