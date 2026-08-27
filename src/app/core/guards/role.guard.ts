import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const roles = route.data?.['roles'] as string[] | undefined;
  const user = auth.user();

  if (!roles || (user && roles.includes(user.role))) {
    return true;
  }

  return inject(Router).createUrlTree(['/access-denied']);
};
