import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Patch, 
  Post, 
  Put, 
  Request, 
  UseGuards 
} from '@nestjs/common';
import { 
  ApiBearerAuth, 
  ApiOperation, 
  ApiParam, 
  ApiResponse, 
  ApiTags 
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { SavedFilterDto, DeleteFilterDto } from './dto/saved-filter.dto';
import { UserLanguage, UserTheme } from './entities/user.entity';
import { GetUsersByIdsDto } from './dto/get-users-by-ids.dto';
import { CreateProfileDto } from './dto/create-profile.dto';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Returns the user\'s profile' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@Request() req) {
    return this.usersService.getUserProfile(req.user.sub);
  }

  @Put('profile')
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateProfile(@Request() req, @Body() updateProfileDto: UpdateProfileDto) {
    return this.usersService.updateProfile(req.user.sub, updateProfileDto);
  }

  @Post('profile/avatar')
  @ApiOperation({ summary: 'Update user avatar' })
  @ApiResponse({ status: 200, description: 'Avatar updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid URL' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateAvatar(@Request() req, @Body('avatarUrl') avatarUrl: string) {
    return this.usersService.updateAvatar(req.user.sub, avatarUrl);
  }

  @Patch('profile/language')
  @ApiOperation({ summary: 'Update user language preference' })
  @ApiResponse({ status: 200, description: 'Language preference updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid language' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateLanguage(@Request() req, @Body('language') language: UserLanguage) {
    return this.usersService.updateLanguage(req.user.sub, language);
  }

  @Patch('profile/theme')
  @ApiOperation({ summary: 'Update user theme preference' })
  @ApiResponse({ status: 200, description: 'Theme preference updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid theme' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateTheme(@Request() req, @Body('theme') theme: UserTheme) {
    return this.usersService.updateTheme(req.user.sub, theme);
  }

  @Post('profile/filters')
  @ApiOperation({ summary: 'Save a filter' })
  @ApiResponse({ status: 201, description: 'Filter saved successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid filter data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not Found - When updating non-existent filter' })
  async saveFilter(@Request() req, @Body() savedFilterDto: SavedFilterDto) {
    return this.usersService.saveFilter(req.user.sub, savedFilterDto);
  }

  @Delete('profile/filters/:id')
  @ApiOperation({ summary: 'Delete a saved filter' })
  @ApiParam({ name: 'id', description: 'Filter ID to delete' })
  @ApiResponse({ status: 200, description: 'Filter deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not Found - Filter not found' })
  async deleteFilter(@Request() req, @Param('id') filterId: string) {
    return this.usersService.deleteFilter(req.user.sub, filterId);
  }

  @Post('profile/onboarding/complete')
  @ApiOperation({ summary: 'Mark user onboarding as completed' })
  @ApiResponse({ status: 200, description: 'Onboarding marked as completed' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async completeOnboarding(@Request() req) {
    return this.usersService.completeOnboarding(req.user.sub);
  }

  @Post('by-ids')
  @ApiOperation({ summary: 'Get multiple user profiles by their IDs' })
  @ApiResponse({ status: 200, description: 'Returns a list of user profiles' })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid ID format' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUsersByIds(@Body() getUsersByIdsDto: GetUsersByIdsDto) {
    return this.usersService.getUserProfilesByIds(getUsersByIdsDto.userIds);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user profile' })
  @ApiResponse({ status: 201, description: 'User profile created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request - Profile already exists or invalid data' })
  async createProfile(@Body() createProfileDto: CreateProfileDto) {
    return this.usersService.createUserProfile(createProfileDto);
  }
}