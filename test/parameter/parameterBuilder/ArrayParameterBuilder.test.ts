import { expect } from '@assertive-ts/core';
import { mock, instance, when, verify, resetCalls, anything } from 'ts-mockito';
import { ArrayParameterBuilder } from '../../../src/parameter/parameterBuilder/ArrayParameterBuilder';
import type { IParameterBuilder } from '../../../src/parameter/parameterBuilder/IParameterBuilder';

describe('ArrayParameterBuilder', () => {
    let mockedElementBuilder: IParameterBuilder<'number', number>;
    let builder: ArrayParameterBuilder<'number', number>;

    before(() => {
        mockedElementBuilder = mock<IParameterBuilder<'number', number>>();
        when(mockedElementBuilder.build(anything())).thenCall((value: number) => value);
        when(mockedElementBuilder.expectedTypes).thenReturn(new Set(['number']));
        const elementBuilder = instance(mockedElementBuilder);
        builder = new ArrayParameterBuilder(elementBuilder);
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

    it('build array with incorrect length', () => {
        builder = new ArrayParameterBuilder(instance(mockedElementBuilder), 2);
        expect(() => builder.build([1]))
            .toThrowError(Error)
            .toHaveMessage('Array does not have the expected length 2.');
    });

    it('build array with correct length', () => {
        builder = new ArrayParameterBuilder(instance(mockedElementBuilder), 2);
        expect(builder.build([1, 2])).toBeEqual([1, 2]);

        verify(mockedElementBuilder.build(1)).once();
        verify(mockedElementBuilder.build(2)).once();
        verify(mockedElementBuilder.build(anything())).times(2);
    });

    it('build with null value', () => {
        expect(() => builder.build(null))
            .toThrowError(Error)
            .toHaveMessage('Value is not an array.');
    });

    it('build with non-array value', () => {
        expect(() => builder.build(123 as any))
            .toThrowError(Error)
            .toHaveMessage('Value is not an array.');
    });

    it('build array with incorrect element type', () => {
        builder = new ArrayParameterBuilder(instance(mockedElementBuilder), 1);
        expect(() => builder.build([true]))
            .toThrowError(Error)
            .toHaveMessage('Array element 0 has an invalid type: boolean.');
    });
});
