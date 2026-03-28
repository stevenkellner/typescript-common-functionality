import { expect } from '@assertive-ts/core';
import { UnionTypeBuilder } from '../../src/typeBuilder/UnionTypeBuilder';
import type { ITypeBuilder } from '../../src/typeBuilder/ITypeBuilder';

describe('UnionTypeBuilder', () => {
    it('should build value using first builder when Raw1 type is provided', () => {
        const builder1: ITypeBuilder<number, string> = {
            build: (value: number) => value.toString()
        };
        const builder2: ITypeBuilder<boolean, number> = {
            build: (value: boolean) => (value ? 1 : 0)
        };

        const unionBuilder = new UnionTypeBuilder(
            (value: number | boolean) => (typeof value === 'number' ? 'T1' : 'T2'),
            builder1,
            builder2
        );
        const result = unionBuilder.build(42);
        expect(result).toBeEqual('42');
    });

    it('should build value using second builder when Raw2 type is provided', () => {
        const builder1: ITypeBuilder<number, string> = {
            build: (value: number) => value.toString()
        };
        const builder2: ITypeBuilder<boolean, number> = {
            build: (value: boolean) => (value ? 1 : 0)
        };

        const unionBuilder = new UnionTypeBuilder(
            (value: number | boolean) => (typeof value === 'number' ? 'T1' : 'T2'),
            builder1,
            builder2
        );
        const result = unionBuilder.build(true);
        expect(result).toBeEqual(1);
    });

    it('should handle complex type transformations with first builder', () => {
        const builder1: ITypeBuilder<string, { length: number }> = {
            build: (value: string) => ({ length: value.length })
        };
        const builder2: ITypeBuilder<number, { value: number }> = {
            build: (value: number) => ({ value: value })
        };

        const unionBuilder = new UnionTypeBuilder(
            (value: string | number) => (typeof value === 'string' ? 'T1' : 'T2'),
            builder1,
            builder2
        );
        const result = unionBuilder.build('hello');
        expect(result).toBeEqual({ length: 5 });
    });

    it('should handle complex type transformations with second builder', () => {
        const builder1: ITypeBuilder<string, { length: number }> = {
            build: (value: string) => ({ length: value.length })
        };
        const builder2: ITypeBuilder<number, { value: number }> = {
            build: (value: number) => ({ value: value })
        };

        const unionBuilder = new UnionTypeBuilder(
            (value: string | number) => (typeof value === 'string' ? 'T1' : 'T2'),
            builder1,
            builder2
        );
        const result = unionBuilder.build(123);
        expect(result).toBeEqual({ value: 123 });
    });

    it('should handle the case when both builders can accept the same raw type', () => {
        const builder1: ITypeBuilder<'A' | 'B', string> = {
            build: (value: 'A' | 'B') => `Builder1: ${value}`
        };
        const builder2: ITypeBuilder<'C' | 'D', string> = {
            build: (value: 'C' | 'D') => `Builder2: ${value}`
        };

        const unionBuilder = new UnionTypeBuilder(
            (value: 'A' | 'B' | 'C' | 'D') => (value === 'A' || value === 'B' ? 'T1' : 'T2'),
            builder1,
            builder2
        );
        const result = unionBuilder.build('A');
        expect(result).toBeEqual('Builder1: A');
    });
});
