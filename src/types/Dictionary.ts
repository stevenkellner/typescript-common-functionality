import type { ITypeBuilder } from '../typeBuilder';
import { entries, keys, mapRecord, values } from '../utils';
import { Flattable, type Flatten } from './Flattable';

type Entry<T> = {
    key: string;
    value: T;
};

export class Dictionary<Key, T> implements Flattable<Record<string, T>> {

    public constructor(
        private readonly dictionary: Record<string, T> = {}
    ) {}

    public get(key: Flatten<Key> extends string ? Key : never): T {
        return this.dictionary[Flattable.flatten(key) as string];
    }

    public set(key: Flatten<Key> extends string ? Key : never, value: T): void {
        this.dictionary[Flattable.flatten(key) as string] = value;
    }

    public has(key: Flatten<Key> extends string ? Key : never): boolean {
        return Flattable.flatten(key) as string in this.dictionary;
    }

    public get keys(): string[] {
        return keys(this.dictionary);
    }

    public get values(): T[] {
        return values(this.dictionary);
    }

    public get entries(): Entry<T>[] {
        return entries(this.dictionary);
    }

    public map<U>(callbackFn: (value: T, key: string) => U): Dictionary<Key, U> {
        return new Dictionary(mapRecord(this.dictionary, callbackFn));
    }

    public get flatten(): Record<string, T> {
        return this.dictionary;
    }
}

export class DictionaryTypeBuilder<Raw, Key, T> implements ITypeBuilder<Record<string, Raw>, Dictionary<Key, T>> {

    public constructor(
        private readonly builder: ITypeBuilder<Raw, T>
    ) {}

    public build(value: Record<string, Raw>): Dictionary<Key, T> {
        return new Dictionary(mapRecord(value, value => this.builder.build(value)));
    }
}
