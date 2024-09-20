import { HttpInterceptorFn } from '@angular/common/http';

export const authTokInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('logTok');
  const clonedReq = req.clone({
    setHeaders:{
      Authorization:`Bearer $token`
    }
  })
  return next(req);
};
