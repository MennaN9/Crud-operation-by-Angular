import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { NotFoundedComponent } from '../shared/components/not-founded/not-founded.component';
import { TestSharedComponent } from '../shared/components/test-shared/test-shared.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginAndRegisterGuard } from './guards/login-register-guard.service';
import { FakeAPIInterceptor } from './interceptors/fake-api.interceptor';
import { AuthenticationInterceptor } from '../auth/interceptors/auth.interceptor';
import { AuthGuard } from './guards/auth-guard.service';
const routes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginAndRegisterGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginAndRegisterGuard],
  },
  { path: '**', component: NotFoundedComponent}
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: FakeAPIInterceptor,
    //   multi: true,
    // },
    //  {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthenticationInterceptor,
    //   multi: true,
    // },
  ],
})
export class AuthModule {}
