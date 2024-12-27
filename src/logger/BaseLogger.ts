import type { LogLevel } from './LogLevel';
import { StringBuilder } from '../types';
import { inspect } from 'util';

export class BaseLogger {

    protected logMessage(level: LogLevel, verbose: boolean, functionName: string, description: string | null, details: Record<string, unknown> | null): string {
        const descriptionString = description !== null ? ` ${description}` : '';
        const detailsString = verbose && details !== null ? `${description !== null ? ' |' : ''} ${this.detailsString(details)}` : '';
        return `[${level.toUpperCase()}: ${functionName}]${descriptionString}${detailsString}`;
    }

    private detailsString(details: Record<string, unknown>): string {
        if (Object.keys(details).length === 0)
            return '{}';
        const builder = new StringBuilder();
        builder.appendLine('{');
        for (const entry of Object.entries(details))
            builder.appendLine(this.detailString(entry[0], entry[1]));
        builder.append('}');
        return builder.toString();
    }

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
