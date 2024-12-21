import type { LogLevel } from './LogLevel';
import type { ILogger } from './ILogger';
import { StringBuilder } from '../types';
import { inspect } from 'util';

export class ConsoleLogger implements ILogger {

    public log(level: LogLevel, verbose: boolean, functionName: string, description: string | null, details: Record<string, unknown> | null): void {
        const descriptionString = description !== null ? ` ${description}` : '';
        const detailsString = verbose && details !== null ? `${description !== null ? ' |' : ''} ${this.detailsString(details)}` : '';
        const logString = `[${level.toUpperCase()}: ${functionName}]${descriptionString}${detailsString}`;
        // eslint-disable-next-line no-console
        console.log(logString);
    }

    private detailsString(details: Record<string, unknown>): string {
        const builder = new StringBuilder();
        builder.appendLine('{');
        for (const entry of Object.entries(details))
            builder.appendLine(this.detailString(entry[0], entry[1]));
        builder.append('}');
        return builder.toString();
    }

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    private detailString(key: string, detail: unknown): string {
        const jsonString = inspect(detail, {
            compact: true,
            depth: null,
            maxArrayLength: 25,
            maxStringLength: 250,
            breakLength: Number.POSITIVE_INFINITY
        });
        return `\t${key}: ${jsonString}`;
    }
}
