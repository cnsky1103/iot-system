import { Field } from './form';

export enum Gender { Male, Female }

export enum Role { Guest, User, Administrator }

export declare interface User {
    username: string,
    password: string,
    gender?: Gender,
    email: string,
    avatarID?: number
}

export const UsernameField: Field = {
    label: "用户名",
    type: "input",
    rule: {
        required: true,
        trigger: 'blur'
    }
}

export const PasswordField: Field = {
    label: "密码",
    type: "password",
    rule: {
        required: true,
        trigger: 'blur'
    }
}

export const EmailField: Field = {
    label: "邮箱",
    type: 'input',
    rule: {
        required: true,
        trigger: 'change',
        validator: (rule, value) => {
            if (/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(value) === false)
                return Promise.reject('邮箱格式错误!')
            return Promise.resolve('')
        }
    }
}

export const GenderField: Field = {
    label: "性别",
    type: 'radio',
    rule: {
        required: true,
        trigger: 'blur',
    },
    radio: [{ value: Gender.Male, hint: "男" }, { value: Gender.Female, hint: "女" }]
}