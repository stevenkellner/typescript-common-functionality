import type { ITypeBuilder } from '../typeBuilder';
import { entries, keys, mapRecord, values } from '../utils';
import { Flattable } from './Flattable';

type Entry<Key extends string | Flattable<string>, T> = {
    key: Key;
    value: T;
};

export class Dictionary<Key extends string | Flattable<string>, T> implements Flattable<Dictionary.Flatten<T>> {

    public constructor(
        private readonly keyBuilder: ITypeBuilder<string, Key>,
        private readonly dictionary: Record<string, T> = {}
    ) {}

    public get(key: Key): T {
        return this.dictionary[Flattable.flatten(key)];
    }

    public getOptional(key: Key): T | null {
        if (!this.has(key))
            return null;
        return this.get(key);
    }

    public set(key: Key, value: T): void {
        this.dictionary[Flattable.flatten(key)] = value;
    }

    public has(key: Key): boolean {
        return Flattable.flatten(key) in this.dictionary;
    }

    public get keys(): Key[] {
        return keys(this.dictionary).map(key => this.keyBuilder.build(key));
    }

    public get values(): T[] {
        return values(this.dictionary);
    }

    public get entries(): Entry<Key, T>[] {
        return entries(this.dictionary).map(({ key, value }) => ({
            key: this.keyBuilder.build(key),
            value: value
        }));
    }

    public map<U>(callbackFn: (value: T, key: Key) => U): Dictionary<Key, U> {
        return new Dictionary(this.keyBuilder, mapRecord(this.dictionary, (value, key) => callbackFn(value, this.keyBuilder.build(key))));
    }

    public get flatten(): Dictionary.Flatten<T> {
        return mapRecord(this.dictionary, value => Flattable.flatten(value));
    }
}

// istanbul ignore next
export namespace Dictionary {

    export type Flatten<T> = Record<string, Flattable.Flatten<T>>;

    export class TypeBuilder<Key extends string | Flattable<string>, T> implements ITypeBuilder<Dictionary.Flatten<T>, Dictionary<Key, T>> {

        public constructor(
            private readonly keyBuilder: ITypeBuilder<string, Key>,
            private readonly builder: ITypeBuilder<Flattable.Flatten<T>, T>
        ) {}

        public build(value: Dictionary.Flatten<T>): Dictionary<Key, T> {
            return new Dictionary(this.keyBuilder, mapRecord(value, value => this.builder.build(value)));
        }
    }

    export function builder<Key extends string | Flattable<string>, T>(keyBuilder: ITypeBuilder<string, Key>, builder: ITypeBuilder<Flattable.Flatten<T>, T>): TypeBuilder<Key, T> {
        return new TypeBuilder(keyBuilder, builder);
    }
}
