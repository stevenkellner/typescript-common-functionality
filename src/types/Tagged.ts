import type { ITypeBuilder } from '../typeBuilder';
import { Flattable } from './Flattable';
import { Guid } from './Guid';

export class Tagged<T, Tag> implements Flattable<Tagged.Flatten<T>> {

    public constructor(
        public readonly value: T,
        public readonly tag: Tag
    ) {}

    public static generate<Tag>(tag: Tag): Tagged<Guid, Tag> {
        return new Tagged(Guid.generate(), tag);
    }

    public get guidString(): T extends Guid ? string : never {
        return (this.value as Guid).guidString as T extends Guid ? string : never;
    }

    public get flatten(): Tagged.Flatten<T> {
        return Flattable.flatten(this.value);
    }
}

// istanbul ignore next
export namespace Tagged {

    export type TypeOf<T extends Tagged<any, any>> = T extends Tagged<infer V, any> ? V : never;

    export type TagOf<T extends Tagged<any, any>> = T extends Tagged<any, infer Tag> ? Tag : never;

    export type Flatten<T> = Flattable.Flatten<T>;

    export class TypeBuilder<T, Tag> implements ITypeBuilder<Flatten<T>, Tagged<T, Tag>> {

        public constructor(
            private readonly tag: Tag,
            private readonly builder: ITypeBuilder<Flattable.Flatten<T>, T>
        ) {}

        public build(value: Flatten<T>): Tagged<T, Tag> {
            return new Tagged(this.builder.build(value), this.tag);
        }
    }

    export function builder<T, Tag>(tag: Tag, builder: ITypeBuilder<Flattable.Flatten<T>, T>): TypeBuilder<T, Tag> {
        return new TypeBuilder(tag, builder);
    }
}
