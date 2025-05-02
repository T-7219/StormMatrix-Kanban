import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get user profile (placeholder)' })
  getProfile() {
    return {
      message: 'User profile endpoint - coming soon!',
      status: 'under development',
      timestamp: new Date().toISOString()
    };
  }
}