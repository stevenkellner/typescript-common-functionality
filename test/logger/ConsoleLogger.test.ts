import { expect } from '@assertive-ts/core';
import { ConsoleLogger } from '../../src/logger/ConsoleLogger';
import type { ILogger } from '../../src/logger/ILogger';
import { capture, spy } from 'ts-mockito';

describe('ConsoleLogger', () => {
    let consoleLogger: ILogger;
    let consoleSpy: Console;

    beforeEach(() => {
        consoleLogger = new ConsoleLogger();
        consoleSpy = spy(console);
    });

    it('should log a message with default level', () => {
        consoleLogger.log('info', true, 'testFunction', 'testDescription', { key: 'value' });
        expect(capture(consoleSpy.log).last()[0] as string).toBeEqual('[INFO: testFunction] testDescription | {\n\tkey: \'value\'\n}');
    });

    it('should log a message with debug level', () => {
        consoleLogger.log('debug', true, 'testFunction', 'testDescription', { key: 'value' });
        expect(capture(consoleSpy.log).last()[0] as string).toBeEqual('[DEBUG: testFunction] testDescription | {\n\tkey: \'value\'\n}');
    });

    it('should log a message with info level', () => {
        consoleLogger.log('info', true, 'testFunction', 'testDescription', { key: 'value' });
        expect(capture(consoleSpy.log).last()[0] as string).toBeEqual('[INFO: testFunction] testDescription | {\n\tkey: \'value\'\n}');
    });

    it('should log a message with notice level', () => {
        consoleLogger.log('notice', true, 'testFunction', 'testDescription', { key: 'value' });
        expect(capture(consoleSpy.log).last()[0] as string).toBeEqual('[NOTICE: testFunction] testDescription | {\n\tkey: \'value\'\n}');
    });

    it('should log a message without description', () => {
        consoleLogger.log('info', true, 'testFunction', null, { key: 'value' });
        expect(capture(consoleSpy.log).last()[0] as string).toBeEqual('[INFO: testFunction] {\n\tkey: \'value\'\n}');
    });

    it('should log a message without details', () => {
        consoleLogger.log('info', true, 'testFunction', 'testDescription', null);
        expect(capture(consoleSpy.log).last()[0] as string).toBeEqual('[INFO: testFunction] testDescription');
    });

    it('should log a message with only function name', () => {
        consoleLogger.log('info', true, 'testFunction', null, null);
        expect(capture(consoleSpy.log).last()[0] as string).toBeEqual('[INFO: testFunction]');
    });

    it('should log a message with level and function name', () => {
        consoleLogger.log('debug', true, 'testFunction', null, null);
        expect(capture(consoleSpy.log).last()[0] as string).toBeEqual('[DEBUG: testFunction]');
    });

    it('should log a message with level, function name, and description', () => {
        consoleLogger.log('debug', true, 'testFunction', 'testDescription', null);
        expect(capture(consoleSpy.log).last()[0] as string).toBeEqual('[DEBUG: testFunction] testDescription');
    });

    it('should log a message with level, function name, and details', () => {
        consoleLogger.log('debug', true, 'testFunction', null, { key: 'value' });
        expect(capture(consoleSpy.log).last()[0] as string).toBeEqual('[DEBUG: testFunction] {\n\tkey: \'value\'\n}');
    });

    it('should log a message with level, function name, description, and details', () => {
        consoleLogger.log('debug', true, 'testFunction', 'testDescription', { key: 'value' });
        expect(capture(consoleSpy.log).last()[0] as string).toBeEqual('[DEBUG: testFunction] testDescription | {\n\tkey: \'value\'\n}');
    });
});
