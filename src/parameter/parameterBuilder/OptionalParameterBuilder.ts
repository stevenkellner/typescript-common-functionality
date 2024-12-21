import type { ValidParameterTypeName, RawParameterType } from '../ValidParameterTypeName';
import type { IParameterBuilder } from './IParameterBuilder';

export class OptionalParameterBuilder<TypeName extends ValidParameterTypeName, T> implements IParameterBuilder<TypeName | 'object' | 'undefined', T | null> {

    public constructor(
        private readonly builder: IParameterBuilder<TypeName, T>
    ) {}

    public get expectedTypes(): Set<TypeName | 'object' | 'undefined'> {
        return new Set<TypeName | 'object' | 'undefined'>(this.builder.expectedTypes)
            .add('object')
            .add('undefined');
    }

    public build(value: RawParameterType<TypeName | 'object' | 'undefined'>): T | null {
        if (value === null)
            return null;
        if (typeof value === 'object' && !(this.builder.expectedTypes as Set<string>).has('object'))
            throw new Error('Value is unexpected an object.');
        return this.builder.build(value as RawParameterType<TypeName>);
    }
}
