import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Verify2faDto } from './dto/verify-2fa.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        id: string;
        email: string;
        name: string;
        language: string;
        active: boolean;
        twoFactorEnabled: boolean;
        roles: string[];
        createdAt: Date;
        updatedAt: Date;
        lastLoginAt: Date;
    }>;
    login(req: any): Promise<{
        access_token: string;
        refresh_token: string;
        token_type: string;
        expires_in: number;
        user: {
            id: string;
            email: string;
            name: string;
        };
    } | {
        requires2FA: boolean;
        temporaryToken: string;
    }>;
    verify2fa(verify2faDto: Verify2faDto): Promise<{
        access_token: string;
        refresh_token: string;
        token_type: string;
        expires_in: number;
        user: {
            id: string;
            email: string;
            name: string;
        };
    }>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{
        access_token: string;
        refresh_token: string;
        token_type: string;
        expires_in: number;
        user: {
            id: string;
            email: string;
            name: string;
        };
    }>;
    logout(req: any): Promise<{
        message: string;
    }>;
    getProfile(req: any): any;
}
