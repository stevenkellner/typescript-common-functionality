export type LogLevel = 'debug' | 'info' | 'notice' | 'warning' | 'error' | 'critical' | 'alert' | 'emergency';

export namespace LogLevel {
    export function isLogLevel(level: string): level is LogLevel {
        return ['debug', 'info', 'notice', 'warning', 'error', 'critical', 'alert', 'emergency'].includes(level);
    }
}
