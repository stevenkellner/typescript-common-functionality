import { expect } from '@assertive-ts/core';
import { type ITypeBuilder, ObjectTypeBuilder } from '../../src';
import { anything, instance, mock, resetCalls, verify, when } from 'ts-mockito';

type TestObject = {
    a: number;
    b: string;
    c: boolean;
};

describe('ObjectTypeBuilder', () => {

    let mockedTypeBuilder1: ITypeBuilder<number, number>;
    let mockedTypeBuilder2: ITypeBuilder<string, string>;
    let mockedTypeBuilder3: ITypeBuilder<boolean, boolean>;
    let builder: ObjectTypeBuilder<TestObject, TestObject>;

    before(() => {
        mockedTypeBuilder1 = mock<ITypeBuilder<number, number>>();
        mockedTypeBuilder2 = mock<ITypeBuilder<string, string>>();
        mockedTypeBuilder3 = mock<ITypeBuilder<boolean, boolean>>();
        when(mockedTypeBuilder1.build(anything(), undefined))
            .thenCall((value: number) => value + 1);
        when(mockedTypeBuilder2.build(anything(), undefined))
            .thenCall((value: string) => `${value}test`);
        when(mockedTypeBuilder3.build(anything(), undefined))
            .thenCall((value: boolean) => !value);
        const typeBuilder1 = instance(mockedTypeBuilder1);
        const typeBuilder2 = instance(mockedTypeBuilder2);
        const typeBuilder3 = instance(mockedTypeBuilder3);
        builder = new ObjectTypeBuilder({
            a: typeBuilder1,
            b: typeBuilder2,
            c: typeBuilder3
        });
    });

    afterEach(() => {
        resetCalls(mockedTypeBuilder1);
        resetCalls(mockedTypeBuilder2);
    });

    it('should build an object', () => {
        expect(builder.build({
            a: 0,
            b: '',
            c: false
        })).toBeEqual({
            a: 1,
            b: 'test',
            c: true
        });

        verify(mockedTypeBuilder1.build(0, undefined)).once();
        verify(mockedTypeBuilder2.build('', undefined)).once();
        verify(mockedTypeBuilder3.build(false, undefined)).once();
        verify(mockedTypeBuilder1.build(anything(), undefined)).once();
        verify(mockedTypeBuilder2.build(anything(), undefined)).once();
        verify(mockedTypeBuilder3.build(anything(), undefined)).once();
    });
});
