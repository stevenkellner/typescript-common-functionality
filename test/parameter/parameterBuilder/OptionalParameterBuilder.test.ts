import { expect } from '@assertive-ts/core';
import { mock, instance, when, verify, resetCalls, anything } from 'ts-mockito';
import { OptionalParameterBuilder } from '../../../src/parameter/parameterBuilder/OptionalParameterBuilder';
import type { IParameterBuilder } from '../../../src/parameter/parameterBuilder/IParameterBuilder';

describe('OptionalParameterBuilder', () => {
    let mockedBuilder: IParameterBuilder<'number', number>;
    let builder: OptionalParameterBuilder<'number', number>;

    before(() => {
        mockedBuilder = mock<IParameterBuilder<'number', number>>();
        when(mockedBuilder.build(anything())).thenCall((value: number) => value);
        when(mockedBuilder.expectedTypes).thenReturn(new Set(['number']));
        const elementBuilder = instance(mockedBuilder);
        builder = new OptionalParameterBuilder(elementBuilder);
    });

    afterEach(() => {
        resetCalls(mockedBuilder);
    });

    it('build with null value', () => {
        expect(builder.build(null)).toBeNull();

        verify(mockedBuilder.build(anything())).never();
    });

    it('build with valid number', () => {
        expect(builder.build(1)).toBeEqual(1);

        verify(mockedBuilder.build(1)).once();
    });

    it('build with unexpected object', () => {
        expect(() => builder.build({} as any))
            .toThrowError(Error)
            .toHaveMessage('Value is unexpected an object.');
    });

    it('expectedTypes includes object and undefined', () => {
        const { expectedTypes } = builder;
        expect(expectedTypes.has('number')).toBeTrue();
        expect(expectedTypes.has('object')).toBeTrue();
        expect(expectedTypes.has('undefined')).toBeTrue();
    });
});
