import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { UsersService } from '../users/users.service';
import * as crypto from 'crypto';

@Injectable()
export class TwoFactorAuthService {
  constructor(private readonly usersService: UsersService) {}

  async generateTwoFactorAuthSecret(userId: string) {
    const user = await this.usersService.findById(userId);
    const secret = authenticator.generateSecret();
    const appName = 'StormMatrix Kanban';
    const otpauthUrl = authenticator.keyuri(user.email, appName, secret);

    await this.usersService.updateTwoFactorSecret(user.id, secret);

    const qrCodeDataURL = await toDataURL(otpauthUrl);
    const recoveryCodes = this.generateRecoveryCodes();

    return {
      secret,
      qrCode: qrCodeDataURL,
      recoveryCodes,
    };
  }

  async enableTwoFactorAuth(userId: string, code: string) {
    const user = await this.usersService.findById(userId);
    const isCodeValid = this.verifyToken(user.twoFactorSecret, code);

    if (!isCodeValid) {
      return false;
    }

    // Generate recovery codes if not already present
    const recoveryCodes = this.generateRecoveryCodes();
    
    // Enable 2FA for the user
    await this.usersService.enableTwoFactor(user.id, recoveryCodes);
    return true;
  }

  verifyToken(twoFactorSecret: string, token: string): boolean {
    if (!twoFactorSecret) {
      return false;
    }
    
    return authenticator.verify({
      token,
      secret: twoFactorSecret,
    });
  }

  async verifyWithRecoveryCode(userId: string, recoveryCode: string): Promise<boolean> {
    const user = await this.usersService.findById(userId);
    const { twoFactorRecoveryCodes } = user;

    const codeIndex = twoFactorRecoveryCodes.indexOf(recoveryCode);
    if (codeIndex === -1) {
      return false;
    }

    // Remove used recovery code
    const updatedCodes = [
      ...twoFactorRecoveryCodes.slice(0, codeIndex),
      ...twoFactorRecoveryCodes.slice(codeIndex + 1),
    ];

    // Update user with the remaining recovery codes
    await this.usersService.enableTwoFactor(user.id, updatedCodes);
    return true;
  }

  private generateRecoveryCodes(): string[] {
    return Array.from({ length: 10 }, () =>
      crypto.randomBytes(4).toString('hex'),
    );
  }
}