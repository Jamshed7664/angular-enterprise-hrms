import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (request, next) => {
  const apiRequest = request.clone({
    setHeaders: {
      'X-Client': 'angular-enterprise-hrms'
    }
  });

  return next(apiRequest);
};
