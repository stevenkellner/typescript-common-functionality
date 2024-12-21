import type { ValidParameterTypeName } from './ValidParameterTypeName';
import type { IParameterBuilder } from './parameterBuilder';

export type IParameterBuilders<Parameters extends Record<string, unknown>> = {
    [Key in keyof Parameters]: IParameterBuilder<ValidParameterTypeName, Parameters[Key]>
};
