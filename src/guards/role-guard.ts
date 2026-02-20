// guards/roles.guard.ts
import { CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { UserRole } from '../model/User.model';

export class RolesGuard implements CanActivate {
    constructor(private requiredRole: UserRole) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user || user.role !== this.requiredRole) {
            throw new ForbiddenException('Access denied');
        }

        return true;
    }
}
