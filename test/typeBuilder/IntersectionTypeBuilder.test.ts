import { expect } from '@assertive-ts/core';
import { type ITypeBuilder, IntersectionTypeBuilder } from '../../src';
import { anything, instance, mock, resetCalls, verify, when } from 'ts-mockito';

type T1 = {
    v1: number;
    v2: string;
};

type T2 = {
    v1: number;
    v3: boolean | null;
};

describe('IntersectionTypeBuilder', () => {

    let mockedType1Builder: ITypeBuilder<T1, T1>;
    let mockedType2Builder: ITypeBuilder<T2, T2>;
    let builder: IntersectionTypeBuilder<T1, T2, T1, T2>;

    before(() => {
        mockedType1Builder = mock<ITypeBuilder<T1, T1>>();
        mockedType2Builder = mock<ITypeBuilder<T2, T2>>();
        when(mockedType1Builder.build(anything(), undefined))
            .thenCall((value: T1) => ({
                v1: value.v1,
                v2: value.v2
            }));
        when(mockedType2Builder.build(anything(), undefined))
            .thenCall((value: T2) => ({
                v1: value.v1 + 1,
                v3: value.v3
            }));
        const type1Builder = instance(mockedType1Builder);
        const type2Builder = instance(mockedType2Builder);
        builder = new IntersectionTypeBuilder(type1Builder, type2Builder);
    });

    afterEach(() => {
        resetCalls(mockedType1Builder);
        resetCalls(mockedType2Builder);
    });

    it('build intersection of two types', () => {
        expect(builder.build({
            v1: 1,
            v2: '2',
            v3: null
        })).toBeEqual({
            v1: 2,
            v2: '2',
            v3: null
        });

        verify(mockedType1Builder.build(anything(), undefined)).once();
        verify(mockedType2Builder.build(anything(), undefined)).once();
        verify(mockedType2Builder.build(anything(), undefined)).calledAfter(mockedType1Builder.build(anything(), undefined));
    });
});
