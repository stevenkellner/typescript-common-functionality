import { expect } from '@assertive-ts/core';
import { Tagged } from '../../src/types/Tagged';
import { Guid } from '../../src/types/Guid';
import type { ITypeBuilder } from '../../src';
import { anything, instance, mock, when, verify } from 'ts-mockito';

describe('Tagged', () => {
    describe('constructor', () => {
        it('should create a Tagged instance with the given value and tag', () => {
            const value = 42;
            const tag = 'test-tag';
            const tagged = new Tagged(value, tag);
            expect(tagged.value).toBeEqual(value);
            expect(tagged.tag).toBeEqual(tag);
        });
    });

    describe('flatten', () => {
        it('should return the value', () => {
            const value = 42;
            const tag = 'test-tag';
            const tagged = new Tagged(value, tag);
            expect(tagged.flatten).toBeEqual(value);
        });
    });

    describe('generate', () => {
        it('should generate a Tagged instance with a Guid value and the given tag', () => {
            const tag = 'test-tag';
            const tagged = Tagged.generate(tag);
            expect(tagged.value).toBeInstanceOf(Guid);
            expect(tagged.tag).toBeEqual(tag);
        });
    });

    describe('guidString', () => {
        it('should return the guid string if the value is a Guid', () => {
            const guid = Guid.generate();
            const tag = 'test-tag';
            const tagged = new Tagged(guid, tag);
            expect(tagged.guidString).toBeEqual(guid.guidString);
        });

        it('should return never if the value is not a Guid', () => {
            const value = 42;
            const tag = 'test-tag';
            const tagged = new Tagged(value, tag);
            expect(tagged.guidString).toBeUndefined();
        });
    });
});

describe('Tagged.TypeBuilder', () => {

    let mockedValueBuilder: ITypeBuilder<number, number>;
    let builder: Tagged.TypeBuilder<number, 'test-tag'>;

    before(() => {
        mockedValueBuilder = mock<ITypeBuilder<number, number>>();
        when(mockedValueBuilder.build(anything()))
            .thenCall((value: number) => value + 1);
        const valueBuilder = instance(mockedValueBuilder);
        builder = Tagged.builder('test-tag', valueBuilder);
    });

    it('should build a Tagged instance with the given value and tag', () => {
        expect(builder.build(42)).toBeEqual(new Tagged(43, 'test-tag'));

        verify(mockedValueBuilder.build(42)).once();
        verify(mockedValueBuilder.build(anything())).once();
    });
});
