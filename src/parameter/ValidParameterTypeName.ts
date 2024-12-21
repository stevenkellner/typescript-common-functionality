export type ValidParameterTypeName =
    | 'undefined'
    | 'boolean'
    | 'string'
    | 'number'
    | 'object';

export type RawParameterType<TypeName extends ValidParameterTypeName> =
    TypeName extends 'undefined' ? null :
        TypeName extends 'boolean' ? boolean :
            TypeName extends 'string' ? string :
                TypeName extends 'number' ? number :
                    TypeName extends 'object' ? object | null : never;
