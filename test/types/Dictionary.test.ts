import { expect } from '@assertive-ts/core';
import { Dictionary, ValueTypeBuilder, type ITypeBuilder } from '../../src';
import { anything, instance, mock, resetCalls, verify, when } from 'ts-mockito';

describe('Dictionary', () => {
    let dictionary: Dictionary<string, number>;

    beforeEach(() => {
        dictionary = new Dictionary<string, number>(new ValueTypeBuilder());
    });

    describe('get', () => {
        it('should return the value for the given key', () => {
            dictionary.set('a', 1);
            expect(dictionary.get('a')).toBeEqual(1);
        });

        it('should return undefined for a non-existent key', () => {
            expect(dictionary.get('b')).toBeUndefined();
        });
    });

    describe('set', () => {
        it('should set the value for the given key', () => {
            dictionary.set('a', 1);
            expect(dictionary.get('a')).toBeEqual(1);
        });
    });

    describe('has', () => {
        it('should return true if the key exists', () => {
            dictionary.set('a', 1);
            expect(dictionary.has('a')).toBeTrue();
        });

        it('should return false if the key does not exist', () => {
            expect(dictionary.has('b')).toBeFalse();
        });
    });

    describe('keys', () => {
        it('should return all keys in the dictionary', () => {
            dictionary.set('a', 1);
            dictionary.set('b', 2);
            expect(dictionary.keys).toHaveSameMembers(['a', 'b']);
        });
    });

    describe('values', () => {
        it('should return all values in the dictionary', () => {
            dictionary.set('a', 1);
            dictionary.set('b', 2);
            expect(dictionary.values).toHaveSameMembers([1, 2]);
        });
    });

    describe('entries', () => {
        it('should return all entries in the dictionary', () => {
            dictionary.set('a', 1);
            dictionary.set('b', 2);
            expect(dictionary.entries.map(({ value, key }) => `${key}: ${value}`)).toHaveSameMembers([
                'a: 1',
                'b: 2'
            ]);
        });
    });

    describe('isEmpty', () => {
        it('should return true if the dictionary is empty', () => {
            expect(dictionary.isEmpty).toBeTrue();
        });

        it('should return false if the dictionary is not empty', () => {
            dictionary.set('a', 1);
            expect(dictionary.isEmpty).toBeFalse();
        });
    });

    describe('map', () => {
        it('should map the dictionary values using the callback function', () => {
            dictionary.set('a', 1);
            dictionary.set('b', 2);
            const mapped = dictionary.map((value, key) => `${key}: ${value}`);
            expect(mapped.get('a')).toBeEqual('a: 1');
            expect(mapped.get('b')).toBeEqual('b: 2');
        });
    });

    describe('flatten', () => {
        it('should return the flattened dictionary', () => {
            dictionary.set('a', 1);
            dictionary.set('b', 2);
            expect(dictionary.flatten).toBeEqual({
                a: 1,
                b: 2
            });
        });
    });
});

describe('Dictionary.TypeBuilder', () => {

    let mockedTypeBuilder: ITypeBuilder<number, number>;
    let builder: Dictionary.TypeBuilder<string, number>;

    before(() => {
        mockedTypeBuilder = mock<ITypeBuilder<number, number>>();
        when(mockedTypeBuilder.build(anything()))
            .thenCall((value: number) => value + 1);
        const typeBuilder = instance(mockedTypeBuilder);
        builder = Dictionary.builder(new ValueTypeBuilder(), typeBuilder);
    });

    afterEach(() => {
        resetCalls(mockedTypeBuilder);
    });

    it('should build a dictionary from the raw record', () => {
        const dictionary = builder.build({
            a: 1,
            b: 2
        });
        expect(dictionary.get('a')).toBeEqual(2);
        expect(dictionary.get('b')).toBeEqual(3);

        verify(mockedTypeBuilder.build(1)).once();
        verify(mockedTypeBuilder.build(2)).once();
        verify(mockedTypeBuilder.build(anything())).twice();
    });
});
