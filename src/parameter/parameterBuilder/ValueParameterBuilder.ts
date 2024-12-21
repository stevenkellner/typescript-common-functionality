import type { ValidParameterTypeName, RawParameterType } from '../ValidParameterTypeName';
import type { IParameterBuilder } from './IParameterBuilder';

export class ValueParameterBuilder<TypeName extends ValidParameterTypeName> implements IParameterBuilder<TypeName, RawParameterType<TypeName>> {

    public constructor(
        private readonly typeName: TypeName
    ) {}

    public get expectedTypes(): Set<TypeName> {
        return new Set([this.typeName]);
    }

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public build(value: RawParameterType<TypeName>): RawParameterType<TypeName> {
        return value;
    }
}
