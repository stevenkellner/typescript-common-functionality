import type { IParameterBuilders } from './IParameterBuilders';
import type { ParameterContainer } from './ParameterContainer';
import { mapRecord } from '../utils';

export class ParameterParser<Parameters extends Record<string, unknown>> {

    public constructor(
        private readonly paramterBuilders: IParameterBuilders<Parameters>
    ) {}

    public parse(container: ParameterContainer): Parameters {
        return mapRecord(this.paramterBuilders, (builder, key) => {
            const parameter = container.parameter(key, builder.expectedTypes);
            return builder.build(parameter);
        }) as Parameters;
    }
}
