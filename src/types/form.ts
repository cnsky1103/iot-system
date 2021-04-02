export declare interface Form {
    canSubmit?: boolean,
    submitHint?: string,
    cancelHint?: string,
    finish?: () => void,
    cancel?: () => void,
    layout?: string
}

export declare interface Field {
    label: string,
    type?: 'input' | 'textarea' | 'number' | 'password' | 'radio',
    disabled?: boolean,
    rule?: {
        required?: boolean,
        message?: string,
        trigger: 'blur' | 'change',
        validator?: (rule, value) => Promise<string>,
    },
    radio?: Array<{ value: any, hint: string }>
}

export declare interface Fields {
    [property: string]: Field
}