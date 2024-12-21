import type { ValidParameterTypeName, RawParameterType } from '../ValidParameterTypeName';
import type { IParameterBuilder } from './IParameterBuilder';

export class ParameterBuilder<TypeName extends ValidParameterTypeName, T> implements IParameterBuilder<TypeName, T> {

    public constructor(
        private readonly typeName: TypeName,
        private readonly buildParameter: (value: RawParameterType<TypeName>) => T
    ) {}

    public get expectedTypes(): Set<TypeName> {
        return new Set([this.typeName]);
    }

    public build(value: RawParameterType<TypeName>): T {
        return this.buildParameter(value);
    }
}
