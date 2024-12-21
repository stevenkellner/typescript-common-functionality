import { expect } from '@assertive-ts/core';
import { ParameterContainer } from '../../src/parameter/ParameterContainer';
import type { ValidParameterTypeName } from '../../src/parameter/ValidParameterTypeName';

describe('ParameterContainer', () => {
    it('should return the parameter if it exists and has a valid type', () => {
        const data = { key1: 'value1' };
        const container = new ParameterContainer(data);
        const result = container.parameter('key1', new Set<ValidParameterTypeName>(['string']));
        expect(result).toBeEqual('value1');
    });

    it('should throw an error if the parameter does not exist', () => {
        const data = { key1: 'value1' };
        const container = new ParameterContainer(data);
        expect(() => container.parameter('key2', new Set<ValidParameterTypeName>(['string'])))
            .toThrowError(Error)
            .toHaveMessage('No key2 in parameters.');
    });

    it('should throw an error if the parameter has an invalid type', () => {
        const data = { key1: 'value1' };
        const container = new ParameterContainer(data);
        expect(() => container.parameter('key1', new Set<ValidParameterTypeName>(['number'])))
            .toThrowError(Error)
            .toHaveMessage('Parameter key1 has an invalid type: string');
    });

    it('should return null if the parameter does not exist and undefined is an expected type', () => {
        const data = { key1: 'value1' };
        const container = new ParameterContainer(data);
        const result = container.parameter('key2', new Set<ValidParameterTypeName>(['undefined']));
        expect(result).toBeNull();
    });

    it('should handle multiple expected types', () => {
        const data = {
            key1: 'value1',
            key2: 42
        };
        const container = new ParameterContainer(data);
        const result1 = container.parameter('key1', new Set<ValidParameterTypeName>(['string', 'number']));
        const result2 = container.parameter('key2', new Set<ValidParameterTypeName>(['string', 'number']));
        expect(result1).toBeEqual('value1');
        expect(result2).toBeEqual(42);
    });

    it('should handle all valid types', () => {
        const data = {
            key1: undefined,
            key2: true,
            key3: 'value3',
            key4: 42,
            key5: { key6: 'value6' }
        };
        const container = new ParameterContainer(data);
        const result1 = container.parameter('key1', new Set<ValidParameterTypeName>(['undefined']));
        const result2 = container.parameter('key2', new Set<ValidParameterTypeName>(['boolean']));
        const result3 = container.parameter('key3', new Set<ValidParameterTypeName>(['string']));
        const result4 = container.parameter('key4', new Set<ValidParameterTypeName>(['number']));
        const result5 = container.parameter('key5', new Set<ValidParameterTypeName>(['object']));
        expect(result1).toBeNull();
        expect(result2).toBeEqual(true);
        expect(result3).toBeEqual('value3');
        expect(result4).toBeEqual(42);
        expect(result5).toBeEqual({ key6: 'value6' });
    });
});
