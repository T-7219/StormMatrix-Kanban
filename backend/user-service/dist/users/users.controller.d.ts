import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { SavedFilterDto } from './dto/saved-filter.dto';
import { UserLanguage, UserTheme } from './entities/user.entity';
import { GetUsersByIdsDto } from './dto/get-users-by-ids.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<import("./entities/user.entity").UserProfile>;
    updateProfile(req: any, updateProfileDto: UpdateProfileDto): Promise<import("./entities/user.entity").UserProfile>;
    updateAvatar(req: any, avatarUrl: string): Promise<import("./entities/user.entity").UserProfile>;
    updateLanguage(req: any, language: UserLanguage): Promise<import("./entities/user.entity").UserProfile>;
    updateTheme(req: any, theme: UserTheme): Promise<import("./entities/user.entity").UserProfile>;
    saveFilter(req: any, savedFilterDto: SavedFilterDto): Promise<import("./entities/user.entity").UserProfile>;
    deleteFilter(req: any, filterId: string): Promise<import("./entities/user.entity").UserProfile>;
    completeOnboarding(req: any): Promise<import("./entities/user.entity").UserProfile>;
    getUsersByIds(getUsersByIdsDto: GetUsersByIdsDto): Promise<import("./entities/user.entity").UserProfile[]>;
    createProfile(createProfileDto: CreateProfileDto): Promise<import("./entities/user.entity").UserProfile>;
}
