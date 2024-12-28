import type { ITypeBuilder } from '../typeBuilder';
import { Flattable } from './Flattable';

export type Result<T, E> = Result.Success<T> | Result.Failure<E>;

// istanbul ignore next
export namespace Result {

    export type Value<R extends Result<any, any>> = R extends Result<infer T, unknown> ? T : never;

    export type Error<R extends Result<any, any>> = R extends Result<unknown, infer E> ? E : never;

    export class Success<T> implements Flattable<Success.Flatten<T>> {

        public constructor(
            public readonly value: T
        ) {}

        public readonly error = null;

        public get valueOrError(): T {
            return this.value;
        }

        public get(): T {
            return this.value;
        }

        public map<T2>(mapper: (value: T) => T2): Result<T2, never> {
            return new Result.Success<T2>(mapper(this.value));
        }

        public mapError(): Result<T, never> {
            return this;
        }

        public get flatten(): Success.Flatten<T> {
            return {
                state: 'success',
                value: Flattable.flatten(this.value)
            };
        }
    }

    // istanbul ignore next
    export namespace Success {

        export type Flatten<T> = {
            state: 'success';
            value: Flattable.Flatten<T>;
        };

        export class TypeBuilder<T> implements ITypeBuilder<Flatten<T>, Success<T>> {

            public constructor(
                private readonly builder: ITypeBuilder<Flattable.Flatten<T>, T>
            ) {}

            public build(value: Flatten<T>): Success<T> {
                return new Success(this.builder.build(value.value));
            }
        }

        export function builder<T>(builder: ITypeBuilder<Flattable.Flatten<T>, T>): TypeBuilder<T> {
            return new TypeBuilder(builder);
        }
    }

    export class Failure<E> implements Flattable<Failure.Flatten<E>> {

        public constructor(
            public readonly error: E
        ) {}

        public readonly value = null;

        public get valueOrError(): E {
            return this.error;
        }

        public get(): never {
            // eslint-disable-next-line @typescript-eslint/only-throw-error
            throw this.error;
        }

        public map(): Result<never, E> {
            return this;
        }

        public mapError<E2>(mapper: (value: E) => E2): Result<never, E2> {
            return new Result.Failure<E2>(mapper(this.error));
        }

        public get flatten(): Failure.Flatten<E> {
            return {
                state: 'failure',
                error: Flattable.flatten(this.error)
            };
        }
    }

    // istanbul ignore next
    export namespace Failure {

        export type Flatten<E> = {
            state: 'failure';
            error: Flattable.Flatten<E>;
        };

        export class TypeBuilder<T> implements ITypeBuilder<Flatten<T>, Failure<T>> {

            public constructor(
                private readonly builder: ITypeBuilder<Flattable.Flatten<T>, T>
            ) {}

            public build(value: Flatten<T>): Failure<T> {
                return new Failure(this.builder.build(value.error));
            }
        }

        export function builder<T>(builder: ITypeBuilder<Flattable.Flatten<T>, T>): TypeBuilder<T> {
            return new TypeBuilder(builder);
        }
    }

    export type Flatten<T, E> = Success.Flatten<T> | Failure.Flatten<E>;

    export class TypeBuilder<T, E> implements ITypeBuilder<Flatten<T, E>, Result<T, E>> {

        public constructor(
            private readonly successBuilder: ITypeBuilder<Success.Flatten<T>, Success<T>>,
            private readonly failureBuilder: ITypeBuilder<Failure.Flatten<E>, Failure<E>>
        ) {}

        public build(value: Flatten<T, E>): Result<T, E> {
            if (value.state === 'success')
                return this.successBuilder.build(value);
            return this.failureBuilder.build(value);
        }
    }

    export function builder<T, E>(
        successBuilder: ITypeBuilder<Flattable.Flatten<T>, T>,
        failureBuilder: ITypeBuilder<Flattable.Flatten<E>, E>
    ): TypeBuilder<T, E> {
        return new TypeBuilder(Success.builder(successBuilder), Failure.builder(failureBuilder));
    }

    export function success<T>(value: T): Result<T, never>;
    export function success(): Result<void, never>;
    export function success<T>(value?: T): Result<T | void, never> {
        return new Result.Success<T | void>(value);
    }

    export function failure<E>(error: E): Result<never, E> {
        return new Result.Failure<E>(error);
    }

    export function isSuccess<T, E>(result: Result<T, E>): result is Result.Success<T> {
        return result instanceof Result.Success;
    }

    export function isFailure<T, E>(result: Result<T, E>): result is Result.Failure<E> {
        return result instanceof Result.Failure;
    }
}
