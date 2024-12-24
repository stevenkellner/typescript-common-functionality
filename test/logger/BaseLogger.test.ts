import { expect } from '@assertive-ts/core';
import { BaseLogger } from '../../src/logger/BaseLogger';
import type { LogLevel } from '../../src/logger/LogLevel';

describe('BaseLogger', () => {
    class TestLogger extends BaseLogger {
        public testLogMessage(level: LogLevel, verbose: boolean, functionName: string, description: string | null, details: Record<string, unknown> | null): string {
            return this.logMessage(level, verbose, functionName, description, details);
        }
    }

    const logger = new TestLogger();

    it('should format log message without description and details', () => {
        const result = logger.testLogMessage('info', false, 'testFunction', null, null);
        expect(result).toBeEqual('[INFO: testFunction]');
    });

    it('should format log message with description but without details', () => {
        const result = logger.testLogMessage('info', false, 'testFunction', 'test description', null);
        expect(result).toBeEqual('[INFO: testFunction] test description');
    });

    it('should format log message with description and details', () => {
        const details = {
            key1: 'value1',
            key2: 2
        };
        const result = logger.testLogMessage('info', true, 'testFunction', 'test description', details);
        expect(result).toContain('[INFO: testFunction] test description |');
        expect(result).toContain('key1: \'value1\'');
        expect(result).toContain('key2: 2');
    });

    it('should format log message with details but without description', () => {
        const details = {
            key1: 'value1',
            key2: 2
        };
        const result = logger.testLogMessage('info', true, 'testFunction', null, details);
        expect(result).toContain('[INFO: testFunction] {');
        expect(result).toContain('key1: \'value1\'');
        expect(result).toContain('key2: 2');
    });

    it('should handle empty details object', () => {
        const details = {};
        const result = logger.testLogMessage('info', true, 'testFunction', 'test description', details);
        expect(result).toBeEqual('[INFO: testFunction] test description | {}');
    });
});
