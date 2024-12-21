import { expect } from '@assertive-ts/core';
import { ParameterParser } from '../../src/parameter/ParameterParser';
import { ParameterContainer } from '../../src/parameter/ParameterContainer';
import { mock, instance, when, anything, verify } from 'ts-mockito';
import type { IParameterBuilder } from '../../src/parameter/parameterBuilder/IParameterBuilder';

describe('ParameterParser', () => {
    let mockedBuilder1: IParameterBuilder<'number', number>;
    let mockedBuilder2: IParameterBuilder<'string', string>;
    let parameterParser: ParameterParser<{
        param1: number;
        param2: string;
    }>;

    before(() => {
        mockedBuilder1 = mock<IParameterBuilder<'number', number>>();
        mockedBuilder2 = mock<IParameterBuilder<'string', string>>();
        when(mockedBuilder1.expectedTypes).thenReturn(new Set(['number']));
        when(mockedBuilder2.expectedTypes).thenReturn(new Set(['string']));
        when(mockedBuilder1.build(anything())).thenCall((value: number) => value + 1);
        when(mockedBuilder2.build(anything())).thenCall((value: string) => `${value}test`);
        const builder1 = instance(mockedBuilder1);
        const builder2 = instance(mockedBuilder2);
        parameterParser = new ParameterParser({
            param1: builder1,
            param2: builder2
        });
    });

    it('should parse parameters correctly', () => {
        const data = {
            param1: 1,
            param2: 'value'
        };
        const container = new ParameterContainer(data);
        const result = parameterParser.parse(container);
        expect(result).toBeEqual({
            param1: 2,
            param2: 'valuetest'
        });

        verify(mockedBuilder1.build(1)).once();
        verify(mockedBuilder2.build('value')).once();
        verify(mockedBuilder1.build(anything())).once();
        verify(mockedBuilder2.build(anything())).once();
    });

    it('should throw an error if a parameter has an invalid type', () => {
        const data = {
            param1: 'invalid',
            param2: 'value'
        };
        const container = new ParameterContainer(data);
        expect(() => parameterParser.parse(container))
            .toThrowError(Error)
            .toHaveMessage('Parameter param1 has an invalid type: string');
    });

    it('should handle missing parameters', () => {
        const data = { param2: 'value' };
        const container = new ParameterContainer(data);
        expect(() => parameterParser.parse(container))
            .toThrowError(Error)
            .toHaveMessage('No param1 in parameters.');
    });
});
