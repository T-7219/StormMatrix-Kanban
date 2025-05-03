import { UserLanguage } from '../entities/user.entity';
export declare class CreateProfileDto {
    userId: string;
    email: string;
    displayName?: string;
    language?: UserLanguage;
}
