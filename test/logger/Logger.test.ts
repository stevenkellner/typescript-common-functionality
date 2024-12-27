import { Logger } from '../../src/logger/Logger';
import type { ILogger } from '../../src/logger/ILogger';
import { mock, instance, verify, resetCalls, anything } from 'ts-mockito';

describe('Logger', () => {
    let mockedLogger: ILogger;

    function testLoggerWithVerboseMode(verbose: boolean): void {
        it('should log a message with default level', () => {
            Logger.instance.log('testFunction', 'testDescription', { key: 'value' });
            verify(mockedLogger.log('info', verbose, 'testFunction', 'testDescription', anything())).once();
        });

        it('should log a message with debug level', () => {
            Logger.instance.debug('testFunction', 'testDescription', { key: 'value' });
            verify(mockedLogger.log('debug', verbose, 'testFunction', 'testDescription', anything())).once();
        });

        it('should log a message with info level', () => {
            Logger.instance.info('testFunction', 'testDescription', { key: 'value' });
            verify(mockedLogger.log('info', verbose, 'testFunction', 'testDescription', anything())).once();
        });

        it('should log a message with notice level', () => {
            Logger.instance.notice('testFunction', 'testDescription', { key: 'value' });
            verify(mockedLogger.log('notice', verbose, 'testFunction', 'testDescription', anything())).once();
        });

        it('should log a message with warning level', () => {
            Logger.instance.warning('testFunction', 'testDescription', { key: 'value' });
            verify(mockedLogger.log('warning', verbose, 'testFunction', 'testDescription', anything())).once();
        });

        it('should log a message with error level', () => {
            Logger.instance.error('testFunction', 'testDescription', { key: 'value' });
            verify(mockedLogger.log('error', verbose, 'testFunction', 'testDescription', anything())).once();
        });

        it('should log a message with critical level', () => {
            Logger.instance.critical('testFunction', 'testDescription', { key: 'value' });
            verify(mockedLogger.log('critical', verbose, 'testFunction', 'testDescription', anything())).once();
        });

        it('should log a message with alert level', () => {
            Logger.instance.alert('testFunction', 'testDescription', { key: 'value' });
            verify(mockedLogger.log('alert', verbose, 'testFunction', 'testDescription', anything())).once();
        });

        it('should log a message with emergency level', () => {
            Logger.instance.emergency('testFunction', 'testDescription', { key: 'value' });
            verify(mockedLogger.log('emergency', verbose, 'testFunction', 'testDescription', anything())).once();
        });

        it('should log a message without description', () => {
            Logger.instance.log('testFunction', { key: 'value' });
            verify(mockedLogger.log('info', verbose, 'testFunction', null, anything())).once();
        });

        it('should log a message without details', () => {
            Logger.instance.log('testFunction', 'testDescription');
            verify(mockedLogger.log('info', verbose, 'testFunction', 'testDescription', null)).once();
        });

        it('should log a message with only function name', () => {
            Logger.instance.log('testFunction');
            verify(mockedLogger.log('info', verbose, 'testFunction', null, null)).once();
        });

        it('should log a message with level and function name', () => {
            Logger.instance.log('debug', 'testFunction');
            verify(mockedLogger.log('debug', verbose, 'testFunction', null, null)).once();
        });

        it('should log a message with level, function name, and description', () => {
            Logger.instance.log('debug', 'testFunction', 'testDescription');
            verify(mockedLogger.log('debug', verbose, 'testFunction', 'testDescription', null)).once();
        });

        it('should log a message with level, function name, and details', () => {
            Logger.instance.log('debug', 'testFunction', { key: 'value' });
            verify(mockedLogger.log('debug', verbose, 'testFunction', null, anything())).once();
        });

        it('should log a message with level, function name, description, and details', () => {
            Logger.instance.log('debug', 'testFunction', 'testDescription', { key: 'value' });
            verify(mockedLogger.log('debug', verbose, 'testFunction', 'testDescription', anything())).once();
        });
    }

    describe('verbose mode enabled', () => {

        beforeEach(() => {
            mockedLogger = mock<ILogger>();
            Logger.setup(instance(mockedLogger), true);
        });

        afterEach(() => {
            resetCalls(mockedLogger);
        });

        testLoggerWithVerboseMode(true);
    });

    describe('verbose mode disabled', () => {

        beforeEach(() => {
            mockedLogger = mock<ILogger>();
            Logger.setup(instance(mockedLogger));
        });

        afterEach(() => {
            resetCalls(mockedLogger);
        });

        testLoggerWithVerboseMode(false);
    });
});
