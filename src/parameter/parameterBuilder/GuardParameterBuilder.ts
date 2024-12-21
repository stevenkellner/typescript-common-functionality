import type { ValidParameterTypeName, RawParameterType } from '../ValidParameterTypeName';
import type { IParameterBuilder } from './IParameterBuilder';

export class GuardParameterBuilder<TypeName extends ValidParameterTypeName, T extends RawParameterType<TypeName>> implements IParameterBuilder<TypeName, T> {
    public constructor(
        private readonly typeName: TypeName,
        private readonly typeGuard: (value: RawParameterType<TypeName>) => value is T
    ) {}

    public get expectedTypes(): Set<TypeName> {
        return new Set([this.typeName]);
    }

    public build(value: RawParameterType<TypeName>): T {
        if (!this.typeGuard(value))
            throw new Error('Invalid parameter, type guard failed.');
        return value;
    }
}
