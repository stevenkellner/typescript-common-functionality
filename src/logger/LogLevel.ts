export type LogLevel = 'debug' | 'info' | 'notice';

export namespace LogLevel {
    export function isLogLevel(level: string): level is LogLevel {
        return ['debug', 'info', 'notice'].includes(level);
    }
}
