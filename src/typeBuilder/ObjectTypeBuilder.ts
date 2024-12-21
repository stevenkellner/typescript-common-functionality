import { mapRecord } from '../utils';
import type { ITypeBuilder } from './ITypeBuilder';

type ObjectType = {
    [key: string]: unknown;
};

type RawObjectType<T extends ObjectType> = {
    [K in keyof T]: unknown
};

type BuildersType<T extends ObjectType, Raw extends RawObjectType<T>> = {
    [K in keyof T]: ITypeBuilder<Raw[K], T[K]>
};

export class ObjectTypeBuilder<Raw extends RawObjectType<T>, T extends ObjectType = never> implements ITypeBuilder<Raw, T> {

    public constructor(
        private readonly builders: BuildersType<T, Raw>
    ) {}

    public build(value: Raw): T {
        return mapRecord(this.builders, (builder, key) => builder.build(value[key])) as T;
    }
}
