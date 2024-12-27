import { expect } from '@assertive-ts/core';
import { Guid } from '../../src/types/Guid';

describe('Guid', () => {
    describe('from', () => {
        it('should create a Guid from a valid string', () => {
            const validGuidString = '123e4567-e89b-42d3-a456-426614174000';
            const guid = Guid.from(validGuidString);
            expect(guid.guidString).toBeEqual(validGuidString);
        });

        it('should throw an error for an invalid string', () => {
            const invalidGuidString = 'invalid-guid-string';
            expect(() => Guid.from(invalidGuidString))
                .toThrowError(Error)
                .toHaveMessage('Could not parse Guid, guid string is invalid.');
        });
    });

    describe('generate', () => {
        it('should generate a valid Guid', () => {
            const guid = Guid.generate();
            const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/u;
            expect(regex.test(guid.guidString)).toBeTrue();
        });
    });

    describe('flatten', () => {
        it('should return the guid string', () => {
            const guidString = '123e4567-e89b-42d3-a456-426614174000';
            const guid = new Guid(guidString);
            expect(guid.flatten).toBeEqual(guidString);
        });
    });

    describe('TypeBuilder', () => {
        let builder: Guid.TypeBuilder;

        before(() => {
            builder = new Guid.TypeBuilder();
        });

        it('should build a Guid from a valid string', () => {
            const validGuidString = '123e4567-e89b-42d3-a456-426614174000';
            const guid = builder.build(validGuidString);
            expect(guid.guidString).toBeEqual(validGuidString);
        });

        it('should throw an error for an invalid string', () => {
            const invalidGuidString = 'invalid-guid-string';
            expect(() => builder.build(invalidGuidString))
                .toThrowError(Error)
                .toHaveMessage('Could not parse Guid, guid string is invalid.');
        });
    });
});
