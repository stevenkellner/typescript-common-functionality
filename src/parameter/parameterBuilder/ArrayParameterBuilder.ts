import type { ValidParameterTypeName, RawParameterType } from '../ValidParameterTypeName';
import type { IParameterBuilder } from './IParameterBuilder';

export class ArrayParameterBuilder<TypeName extends ValidParameterTypeName, T> implements IParameterBuilder<'object', T[]> {

    public constructor(
        private readonly builder: IParameterBuilder<TypeName, T>,
        private readonly length: number | null = null
    ) {}

    public expectedTypes = new Set<'object'>(['object']);

    public build(value: RawParameterType<'object'>): T[] {
        if (value === null || !Array.isArray(value))
            throw new Error('Value is not an array.');
        if (this.length !== null && value.length !== this.length)
            throw new Error(`Array does not have the expected length ${this.length}.`);
        return value.map((element: unknown, index) => {
            if (!(this.builder.expectedTypes as Set<string>).has(typeof element))
                throw new Error(`Array element ${index} has an invalid type: ${typeof element}.`);
            return this.builder.build(element as RawParameterType<TypeName>);
        });
    }
}
