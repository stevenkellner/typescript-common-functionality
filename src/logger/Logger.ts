import { LogLevel } from './LogLevel';
import type { ILogger } from './ILogger';

export class Logger {

    public static instance: Logger;

    public constructor(
        private readonly logger: ILogger,
        private readonly verbose: boolean
    ) {}

    public static setup(logger: ILogger, verbose: boolean = false): void {
        Logger.instance = new Logger(logger, verbose);
    }

    private _log(functionNameOrLevel: string | LogLevel, functionNameDescriptionOrDetails?: string | Record<string, unknown>, descriptionOrDetails?: string | Record<string, unknown>, details?: Record<string, unknown>): void {

        // Get log level
        let level: LogLevel | null = null;
        if (LogLevel.isLogLevel(functionNameOrLevel))
            level = functionNameOrLevel;

        // Get function name
        let functionName: string;
        if (level === null)
            functionName = functionNameOrLevel;
        else
            functionName = functionNameDescriptionOrDetails as string;

        // Get description
        let description: string | null = null;
        if (level === null && typeof functionNameDescriptionOrDetails === 'string')
            description = functionNameDescriptionOrDetails;
        else if (typeof descriptionOrDetails === 'string')
            description = descriptionOrDetails;

        // Get details
        let _details: Record<string, unknown> | null = null;
        if (level === null && typeof functionNameDescriptionOrDetails === 'object')
            _details = functionNameDescriptionOrDetails;
        else if (typeof descriptionOrDetails === 'object')
            _details = descriptionOrDetails;
        else if (typeof details === 'object')
            _details = details;

        this.logger.log(level ?? 'info', this.verbose, functionName, description, _details);
    }

    public log(functionName: string): void;
    public log(functionName: string, description: string): void;
    public log(functionName: string, details: Record<string, unknown>): void;
    public log(functionName: string, description: string, details: Record<string, unknown>): void;
    public log(level: LogLevel, functionName: string): void;
    public log(level: LogLevel, functionName: string, description: string): void;
    public log(level: LogLevel, functionName: string, details: Record<string, unknown>): void;
    public log(level: LogLevel, functionName: string, description: string, details: Record<string, unknown>): void;
    public log(functionNameOrLevel: string | LogLevel, functionNameDescriptionOrDetails?: string | Record<string, unknown>, descriptionOrDetails?: string | Record<string, unknown>, details?: Record<string, unknown>): void {
        this._log(functionNameOrLevel, functionNameDescriptionOrDetails, descriptionOrDetails, details);
    }

    public debug(functionName: string): void;
    public debug(functionName: string, description: string): void;
    public debug(functionName: string, details: Record<string, unknown>): void;
    public debug(functionName: string, description: string, details: Record<string, unknown>): void;
    public debug(functionName: string, descriptionOrDetails?: string | Record<string, unknown>, details?: Record<string, unknown>): void {
        this._log('debug', functionName, descriptionOrDetails, details);
    }

    public info(functionName: string): void;
    public info(functionName: string, description: string): void;
    public info(functionName: string, details: Record<string, unknown>): void;
    public info(functionName: string, description: string, details: Record<string, unknown>): void;
    public info(functionName: string, descriptionOrDetails?: string | Record<string, unknown>, details?: Record<string, unknown>): void {
        this._log('info', functionName, descriptionOrDetails, details);
    }

    public notice(functionName: string): void;
    public notice(functionName: string, description: string): void;
    public notice(functionName: string, details: Record<string, unknown>): void;
    public notice(functionName: string, description: string, details: Record<string, unknown>): void;
    public notice(functionName: string, descriptionOrDetails?: string | Record<string, unknown>, details?: Record<string, unknown>): void {
        this._log('notice', functionName, descriptionOrDetails, details);
    }
}
