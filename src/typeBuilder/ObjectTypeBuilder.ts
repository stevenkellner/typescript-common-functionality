import { mapRecord } from '../utils';
import type { ITypeBuilder } from './ITypeBuilder';

type ObjectType = {
    [key: string]: unknown;
};

type RawObjectType<T extends ObjectType> = {
    [K in keyof T]: unknown
};

type BuildersType<T extends ObjectType, Raw extends RawObjectType<T>, Context> = {
    [K in keyof T]: ITypeBuilder<Raw[K], T[K], Context>
};

export class ObjectTypeBuilder<Raw extends RawObjectType<T>, T extends ObjectType, Context = never> implements ITypeBuilder<Raw, T, Context> {

    public constructor(
        private readonly builders: BuildersType<T, Raw, Context>
    ) {}

    public build(value: Raw, context?: Context): T {
        return mapRecord(this.builders, (builder, key) => builder.build(value[key], context)) as T;
    }
}
