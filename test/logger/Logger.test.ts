import { Logger } from '../../src/logger/Logger';
import type { ILogger } from '../../src/logger/ILogger';
import { mock, instance, verify, resetCalls, anything } from 'ts-mockito';

describe('Logger', () => {
    let mockedLogger: ILogger;
    let logger: Logger;

    function testLoggerWithVerboseMode(verbose: boolean): void {
        it('should log a message with default level', () => {
            logger.log('testFunction', 'testDescription', { key: 'value' });
            verify(mockedLogger.log('info', verbose, 'testFunction', 'testDescription', anything())).once();
        });

        it('should log a message with debug level', () => {
            logger.debug('testFunction', 'testDescription', { key: 'value' });
            verify(mockedLogger.log('debug', verbose, 'testFunction', 'testDescription', anything())).once();
        });

        it('should log a message with info level', () => {
            logger.info('testFunction', 'testDescription', { key: 'value' });
            verify(mockedLogger.log('info', verbose, 'testFunction', 'testDescription', anything())).once();
        });

        it('should log a message with notice level', () => {
            logger.notice('testFunction', 'testDescription', { key: 'value' });
            verify(mockedLogger.log('notice', verbose, 'testFunction', 'testDescription', anything())).once();
        });

        it('should log a message with warning level', () => {
            logger.warning('testFunction', 'testDescription', { key: 'value' });
            verify(mockedLogger.log('warning', verbose, 'testFunction', 'testDescription', anything())).once();
        });

        it('should log a message with error level', () => {
            logger.error('testFunction', 'testDescription', { key: 'value' });
            verify(mockedLogger.log('error', verbose, 'testFunction', 'testDescription', anything())).once();
        });

        it('should log a message with critical level', () => {
            logger.critical('testFunction', 'testDescription', { key: 'value' });
            verify(mockedLogger.log('critical', verbose, 'testFunction', 'testDescription', anything())).once();
        });

        it('should log a message with alert level', () => {
            logger.alert('testFunction', 'testDescription', { key: 'value' });
            verify(mockedLogger.log('alert', verbose, 'testFunction', 'testDescription', anything())).once();
        });

        it('should log a message with emergency level', () => {
            logger.emergency('testFunction', 'testDescription', { key: 'value' });
            verify(mockedLogger.log('emergency', verbose, 'testFunction', 'testDescription', anything())).once();
        });

        it('should log a message without description', () => {
            logger.log('testFunction', { key: 'value' });
            verify(mockedLogger.log('info', verbose, 'testFunction', null, anything())).once();
        });

        it('should log a message without details', () => {
            logger.log('testFunction', 'testDescription');
            verify(mockedLogger.log('info', verbose, 'testFunction', 'testDescription', null)).once();
        });

        it('should log a message with only function name', () => {
            logger.log('testFunction');
            verify(mockedLogger.log('info', verbose, 'testFunction', null, null)).once();
        });

        it('should log a message with level and function name', () => {
            logger.log('debug', 'testFunction');
            verify(mockedLogger.log('debug', verbose, 'testFunction', null, null)).once();
        });

        it('should log a message with level, function name, and description', () => {
            logger.log('debug', 'testFunction', 'testDescription');
            verify(mockedLogger.log('debug', verbose, 'testFunction', 'testDescription', null)).once();
        });

        it('should log a message with level, function name, and details', () => {
            logger.log('debug', 'testFunction', { key: 'value' });
            verify(mockedLogger.log('debug', verbose, 'testFunction', null, anything())).once();
        });

        it('should log a message with level, function name, description, and details', () => {
            logger.log('debug', 'testFunction', 'testDescription', { key: 'value' });
            verify(mockedLogger.log('debug', verbose, 'testFunction', 'testDescription', anything())).once();
        });
    }

    describe('verbose mode enabled', () => {

        beforeEach(() => {
            mockedLogger = mock<ILogger>();
            logger = new Logger(instance(mockedLogger), true);
        });

        afterEach(() => {
            resetCalls(mockedLogger);
        });

        testLoggerWithVerboseMode(true);
    });

    describe('verbose mode disabled', () => {

        beforeEach(() => {
            mockedLogger = mock<ILogger>();
            logger = new Logger(instance(mockedLogger));
        });

        afterEach(() => {
            resetCalls(mockedLogger);
        });

        testLoggerWithVerboseMode(false);
    });

    describe('verbose mode enabled with setup', () => {

        beforeEach(() => {
            mockedLogger = mock<ILogger>();
            Logger.setup(instance(mockedLogger), true);
            logger = Logger.instance;
        });

        afterEach(() => {
            resetCalls(mockedLogger);
        });

        testLoggerWithVerboseMode(true);
    });

    describe('verbose mode disabled with setup', () => {

        beforeEach(() => {
            mockedLogger = mock<ILogger>();
            Logger.setup(instance(mockedLogger));
            logger = Logger.instance;
        });

        afterEach(() => {
            resetCalls(mockedLogger);
        });

        testLoggerWithVerboseMode(false);
    });
});
