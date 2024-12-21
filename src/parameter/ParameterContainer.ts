import type { ValidParameterTypeName, RawParameterType } from './ValidParameterTypeName';

export class ParameterContainer {

    public constructor(
        private readonly data: Record<string, unknown>
    ) {}

    public parameter<TypeName extends ValidParameterTypeName>(key: PropertyKey, expectedTypes: Set<TypeName>): RawParameterType<TypeName> {

        if (!(key in this.data)) {
            if ((expectedTypes as Set<string>).has('undefined'))
                return null as RawParameterType<TypeName>;
            throw new Error(`No ${String(key)} in parameters.`);
        }

        const parameter = (this.data as Record<PropertyKey, unknown>)[key];

        if (!(expectedTypes as Set<string>).has(typeof parameter))
            throw new Error(`Parameter ${String(key)} has an invalid type: ${typeof parameter}`);

        if (parameter === undefined)
            return null as RawParameterType<TypeName>;

        return parameter as RawParameterType<TypeName>;
    }
}
