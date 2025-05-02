import { ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class JwtAuthGuard {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
