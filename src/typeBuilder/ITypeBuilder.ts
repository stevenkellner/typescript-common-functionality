export interface ITypeBuilder<Raw, T, Context = never> {

    build(value: Raw, context?: Context): T;
}
