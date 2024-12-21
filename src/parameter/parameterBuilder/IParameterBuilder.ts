import type { ValidParameterTypeName, RawParameterType } from '../ValidParameterTypeName';

export interface IParameterBuilder<TypeName extends ValidParameterTypeName, T> {

    readonly expectedTypes: Set<TypeName>;

    build(value: RawParameterType<TypeName>): T;
}
