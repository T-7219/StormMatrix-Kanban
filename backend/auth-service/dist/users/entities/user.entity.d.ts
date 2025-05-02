export declare class User {
    id: string;
    email: string;
    password: string;
    name: string;
    language: string;
    active: boolean;
    twoFactorSecret?: string;
    twoFactorEnabled: boolean;
    twoFactorRecoveryCodes: string[];
    roles: string[];
    createdAt: Date;
    updatedAt: Date;
    lastLoginAt: Date;
    hashPassword(): Promise<void>;
    comparePassword(attempt: string): Promise<boolean>;
}
