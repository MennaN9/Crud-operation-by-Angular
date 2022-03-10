import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class FakeAPIInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
   // console.log('before if')
    if (
      request.method === 'POST' &&
      request.url === 'http://localhost:4200/auth/login'
    )
    {
      //console.log('after post')
      if (request.body.email === 'a@a.com' && request.body.password === '12345678') {
        console.log('true data')
        return of(
          new HttpResponse({
            status: 200,
            body: {
              success: true,
              data: {
                user: { id: '1', name: 'Ahmed', email: 'a@a.com', role: 'admin' },
                token:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiQWhtZWQiLCJlbWFpbCI6ImFAYS5jb20ifQ.2RxoWmDADR8sLfW6CGRcthcuXDk5jQCqxx7kx8rLzjA',
              },
            },
          })
        );
      } else {
        console.log('wrong data')
        return of(
          new HttpResponse({
            status: 401,
            body: {
              success: false,
              data: { error: 'Email or password is incorrect' },
            },
          })
        );
      }
    }

    if (
      request.method === 'POST' &&
      request.url === 'http://localhost:4200/auth/register'
    ) {
      if (
        request.body.username === 'mohamed' && request.body.email === 'm@m.com' && request.body.password === '123'
      ) {
        return of(
          new HttpResponse({
            status: 200,
            body: {
              success: true,
              data: {
                user: {
                  id: '2',name: 'Mohamed',email: 'm@m.com',
                },
                token:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJuYW1lIjoiTW9oYW1lZCIsImVtYWlsIjoibUBtLmNvbSJ9.J0LAKT6Uo9Mro23AT3IYZrGcWKEkyvNtqPEJSVWqnUY',
              },
            },
          })
        );
      } else {
        return of(
          new HttpResponse({
            status: 400,
            body: { success: false, data: { error: 'User already exists' } },
          })
        );
      }
    }

    return next.handle(request);
  }
}
