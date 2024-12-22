import { mapRecord } from '../utils';

export interface Flattable<Flatten> {

    flatten: Flatten;
}

export type Flatten<T> =
    T extends Flattable<infer U> ? Flatten<U> :
        T extends undefined | null | boolean | number | bigint | string | Uint8Array ? T :
            T extends [infer U, ...(infer V)] ? [Flatten<U>, ...Flatten<V>] :
                T extends (infer U)[] ? Flatten<U>[] :
                    T extends Record<string, unknown> ? { [K in keyof T]: Flatten<T[K]> } :
                        never;

export namespace Flattable {

    export function flatten<T>(value: T): Flatten<T> {
        if (typeof value === 'object' && value !== null && 'flatten' in value)
            return flatten(value.flatten) as Flatten<T>;
        if (typeof value === 'undefined' || value === null || typeof value === 'boolean' || typeof value === 'number' || typeof value === 'bigint' || typeof value === 'string' || value instanceof Uint8Array)
            return value as Flatten<T>;
        if (Array.isArray(value))
            return value.map(element => flatten(element)) as Flatten<T>;
        if (typeof value === 'object')
            return mapRecord(value as Record<PropertyKey, unknown>, value => flatten(value)) as Flatten<T>;
        throw new Error('Unexpected value');
    }
}
