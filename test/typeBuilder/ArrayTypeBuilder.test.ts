import { expect } from '@assertive-ts/core';
import { type ITypeBuilder, ArrayTypeBuilder } from '../../src';
import { anything, instance, mock, resetCalls, verify, when } from 'ts-mockito';

describe('ArrayTypeBuilder', () => {

    let mockedElementBuilder: ITypeBuilder<number | string, number | string>;
    let builder: ArrayTypeBuilder<number | string, number | string>;

    before(() => {
        mockedElementBuilder = mock<ITypeBuilder<number | string, number | string>>();
        when(mockedElementBuilder.build(anything()))
            .thenCall((value: number | string) => value);
        const elementBuilder = instance(mockedElementBuilder);
        builder = new ArrayTypeBuilder(elementBuilder);
    });

    afterEach(() => {
        resetCalls(mockedElementBuilder);
    });

    it('build empty array', () => {
        expect(builder.build([])).toBeEqual([]);

        verify(mockedElementBuilder.build(anything())).never();
    });

    it('build array with one element', () => {
        expect(builder.build([1])).toBeEqual([1]);

        verify(mockedElementBuilder.build(1)).once();
        verify(mockedElementBuilder.build(anything())).once();
    });

    it('build array with multiple elements', () => {
        expect(builder.build([1, 2, 3])).toBeEqual([1, 2, 3]);

        verify(mockedElementBuilder.build(1)).once();
        verify(mockedElementBuilder.build(2)).once();
        verify(mockedElementBuilder.build(2)).calledAfter(mockedElementBuilder.build(1));
        verify(mockedElementBuilder.build(3)).once();
        verify(mockedElementBuilder.build(3)).calledAfter(mockedElementBuilder.build(2));
        verify(mockedElementBuilder.build(anything())).times(3);
    });

    it('build array with elements of different types', () => {
        expect(builder.build([1, '2'])).toBeEqual([1, '2']);

        verify(mockedElementBuilder.build(1)).once();
        verify(mockedElementBuilder.build('2')).once();
        verify(mockedElementBuilder.build('2')).calledAfter(mockedElementBuilder.build(1));
        verify(mockedElementBuilder.build(anything())).times(2);
    });
});
