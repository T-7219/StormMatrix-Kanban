import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // This is a simplified implementation for development purposes
    // In a production environment, this would validate the JWT token
    return true;
  }
}