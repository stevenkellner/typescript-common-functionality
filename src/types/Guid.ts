import { v4 as generateUUID } from 'uuid';
import type { Flattable } from './Flattable';
import type { ITypeBuilder } from '../typeBuilder';

export class Guid implements Flattable<Guid.Flatten> {

    public constructor(
        public readonly guidString: string
    ) {}

    public static from(value: string): Guid {
        const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/u;
        if (!regex.test(value))
            throw new Error('Could not parse Guid, guid string is invalid.');
        return new Guid(value.toLowerCase());
    }

    public static generate(): Guid {
        return new Guid(generateUUID());
    }

    public get flatten(): Guid.Flatten {
        return this.guidString;
    }
}

// istanbul ignore next
export namespace Guid {

    export type Flatten = string;

    export class TypeBuilder implements ITypeBuilder<Flatten, Guid> {

        public build(value: Flatten): Guid {
            return Guid.from(value);
        }
    }

    export const builder = new TypeBuilder();
}
