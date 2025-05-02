import { UsersService } from '../users/users.service';
export declare class TwoFactorAuthService {
    private readonly usersService;
    constructor(usersService: UsersService);
    generateTwoFactorAuthSecret(userId: string): Promise<{
        secret: string;
        qrCode: string;
        recoveryCodes: string[];
    }>;
    enableTwoFactorAuth(userId: string, code: string): Promise<boolean>;
    verifyToken(twoFactorSecret: string, token: string): boolean;
    verifyWithRecoveryCode(userId: string, recoveryCode: string): Promise<boolean>;
    private generateRecoveryCodes;
}
