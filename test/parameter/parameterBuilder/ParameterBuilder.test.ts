import { expect } from '@assertive-ts/core';
import { ParameterBuilder } from '../../../src/parameter/parameterBuilder/ParameterBuilder';
import type { RawParameterType } from '../../../src/parameter/ValidParameterTypeName';

describe('ParameterBuilder', () => {
    let builder: ParameterBuilder<'string', string>;

    before(() => {
        builder = new ParameterBuilder<'string', string>('string', (value: RawParameterType<'string'>) => value);
    });

    it('should return expected types', () => {
        expect(builder.expectedTypes).toBeEqual(new Set(['string']));
    });

    it('should build parameter correctly', () => {
        const result = builder.build('test');
        expect(result).toBeEqual('test');
    });

    it('should build parameter with number type', () => {
        const builder = new ParameterBuilder<'number', number>('number', (value: RawParameterType<'number'>) => value);
        const result = builder.build(123);
        expect(result).toBeEqual(123);
    });

    it('should build parameter with boolean type', () => {
        const builder = new ParameterBuilder<'boolean', boolean>('boolean', (value: RawParameterType<'boolean'>) => value);
        const result = builder.build(true);
        expect(result).toBeEqual(true);
    });
});
