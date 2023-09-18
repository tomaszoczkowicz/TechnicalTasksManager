export interface User {
    username: string;
    displayName: string;
    token: string;
    image?: string;
    }

export interface UserFormValues {
        email: string;
        password: string;
        displayName?: string;
        username?: string;
        }

export interface ChangePasswordFormValues {
    username?: string;
    oldPassword: string;
    newPassword: string;
    newPasswordCheck: string;
    }
