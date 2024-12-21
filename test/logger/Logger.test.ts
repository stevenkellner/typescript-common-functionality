import { Logger } from '../../src/logger/Logger';
import type { ILogger } from '../../src/logger/ILogger';
import { mock, instance, verify, resetCalls, anything } from 'ts-mockito';

describe('Logger', () => {
    let mockedLogger: ILogger;

    beforeEach(() => {
        mockedLogger = mock<ILogger>();
        Logger.setup(instance(mockedLogger), true);
    });

    afterEach(() => {
        resetCalls(mockedLogger);
    });

    it('should log a message with default level', () => {
        Logger.instance.log('testFunction', 'testDescription', { key: 'value' });
        verify(mockedLogger.log('info', true, 'testFunction', 'testDescription', anything())).once();
    });

    it('should log a message with debug level', () => {
        Logger.instance.debug('testFunction', 'testDescription', { key: 'value' });
        verify(mockedLogger.log('debug', true, 'testFunction', 'testDescription', anything())).once();
    });

    it('should log a message with info level', () => {
        Logger.instance.info('testFunction', 'testDescription', { key: 'value' });
        verify(mockedLogger.log('info', true, 'testFunction', 'testDescription', anything())).once();
    });

    it('should log a message with notice level', () => {
        Logger.instance.notice('testFunction', 'testDescription', { key: 'value' });
        verify(mockedLogger.log('notice', true, 'testFunction', 'testDescription', anything())).once();
    });

    it('should log a message without description', () => {
        Logger.instance.log('testFunction', { key: 'value' });
        verify(mockedLogger.log('info', true, 'testFunction', null, anything())).once();
    });

    it('should log a message without details', () => {
        Logger.instance.log('testFunction', 'testDescription');
        verify(mockedLogger.log('info', true, 'testFunction', 'testDescription', null)).once();
    });

    it('should log a message with only function name', () => {
        Logger.instance.log('testFunction');
        verify(mockedLogger.log('info', true, 'testFunction', null, null)).once();
    });

    it('should log a message with level and function name', () => {
        Logger.instance.log('debug', 'testFunction');
        verify(mockedLogger.log('debug', true, 'testFunction', null, null)).once();
    });

    it('should log a message with level, function name, and description', () => {
        Logger.instance.log('debug', 'testFunction', 'testDescription');
        verify(mockedLogger.log('debug', true, 'testFunction', 'testDescription', null)).once();
    });

    it('should log a message with level, function name, and details', () => {
        Logger.instance.log('debug', 'testFunction', { key: 'value' });
        verify(mockedLogger.log('debug', true, 'testFunction', null, anything())).once();
    });

    it('should log a message with level, function name, description, and details', () => {
        Logger.instance.log('debug', 'testFunction', 'testDescription', { key: 'value' });
        verify(mockedLogger.log('debug', true, 'testFunction', 'testDescription', anything())).once();
    });
});
