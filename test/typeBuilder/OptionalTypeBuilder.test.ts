import { expect } from '@assertive-ts/core';
import { type ITypeBuilder, OptionalTypeBuilder } from '../../src';
import { anything, instance, mock, resetCalls, verify, when } from 'ts-mockito';

describe('OptionalTypeBuilder', () => {

    let mockedElementBuilder: ITypeBuilder<number, number>;
    let builder: OptionalTypeBuilder<number, number>;

    before(() => {
        mockedElementBuilder = mock<ITypeBuilder<number, number>>();
        when(mockedElementBuilder.build(anything(), undefined))
            .thenCall((value: number) => value + 1);
        const elementBuilder = instance(mockedElementBuilder);
        builder = new OptionalTypeBuilder(elementBuilder);
    });

    afterEach(() => {
        resetCalls(mockedElementBuilder);
    });

    it('build with null value', () => {
        expect(builder.build(null)).toBeNull();

        verify(mockedElementBuilder.build(anything(), undefined)).never();
    });

    it('build with non-null value', () => {
        expect(builder.build(1)).toBeEqual(2);

        verify(mockedElementBuilder.build(1, undefined)).once();
        verify(mockedElementBuilder.build(anything(), undefined)).once();
    });
});
