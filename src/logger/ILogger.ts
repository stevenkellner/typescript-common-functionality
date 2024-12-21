import type { LogLevel } from './LogLevel';

export interface ILogger {

    log(level: LogLevel, verbose: boolean, functionName: string, description: string | null, details: Record<string, unknown> | null): void;
}
