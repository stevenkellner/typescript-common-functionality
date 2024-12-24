import type { LogLevel } from './LogLevel';
import type { ILogger } from './ILogger';
import { BaseLogger } from './BaseLogger';

export class ConsoleLogger extends BaseLogger implements ILogger {

    public log(level: LogLevel, verbose: boolean, functionName: string, description: string | null, details: Record<string, unknown> | null): void {
        // eslint-disable-next-line no-console
        console.log(this.logMessage(level, verbose, functionName, description, details));
    }
}
