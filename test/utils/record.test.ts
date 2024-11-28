import { expect } from '@assertive-ts/core';
import { keys, values, entries, mapRecord } from '../../src/utils/record';

describe('Record Utils', () => {
    const record = {
        a: 1,
        b: 'two',
        c: true
    };

    describe('keys', () => {
        it('should return the keys of the record', () => {
            const result = keys(record);
            expect(result).toHaveSameMembers(['a', 'b', 'c']);
        });
    });

    describe('values', () => {
        it('should return the values of the record', () => {
            const result = values(record);
            expect(result).toHaveSameMembers([1, 'two', true]);
        });
    });

    describe('entries', () => {
        it('should return the entries of the record', () => {
            const result = entries(record);
            expect(result.map(({ value, key }) => `${key}: ${value}`)).toHaveSameMembers([
                'a: 1',
                'b: two',
                'c: true'
            ]);
        });
    });

    describe('mapRecord', () => {
        it('should map the record values using the callback function', () => {
            const result = mapRecord(record, (value, key) => `${key}: ${value}`);
            expect(result).toBeEqual({
                a: 'a: 1',
                b: 'b: two',
                c: 'c: true'
            });
        });
    });
});
