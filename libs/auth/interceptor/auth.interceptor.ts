import {
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

const getAuthorizationToken = () => {
  return localStorage.getItem('token');
};

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = getAuthorizationToken();

  if (authToken) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });
    return next(authReq);
  } else {
    return next(req);
  }
};
