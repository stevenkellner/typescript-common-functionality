export interface ITypeBuilder<Raw, T> {

    build(value: Raw): T;
}
