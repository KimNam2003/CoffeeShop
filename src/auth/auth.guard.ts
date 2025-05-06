
// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Observable } from 'rxjs';

// @Injectable()
// export class RolesGuard implements CanActivate {
//     constructor(private reflector: Reflector) {}
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const roles = this.reflector.get(Roles, context.getHandler());
//     if (!roles) {
//         return true;
//       }
//       const request = context.switchToHttp().getRequest();
//       const user = request.currentUser;
//       if(!user)
//         return false;
//       else {
//         console.log(user)
//         return roles.includes(user.role)
//       }
//   }
// }