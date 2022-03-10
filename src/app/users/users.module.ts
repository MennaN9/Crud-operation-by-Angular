import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AuthGuard } from '../auth/guards/auth-guard.service';
import { AuthenticationInterceptor } from '../auth/interceptors/auth.interceptor';
import { TestSharedComponent } from '../shared/components/test-shared/test-shared.component';
import { SharedModule } from '../shared/shared.module';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UsersComponent } from './components/users/users.component';
import { PhotosComponent } from './components/album-photos/photos/photos.component';
import { NotFoundedComponent } from '../shared/components/not-founded/not-founded.component';
import { FakeAPIInterceptor} from '../auth/interceptors/fake-api.interceptor';
import { LoginAndRegisterGuard } from '../auth/guards/login-register-guard.service';
const routes: Route[] = [
   {
    path: ':id/albums/:aid/photos',
    component: PhotosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: UserDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: '', component: UsersComponent,
   canActivate: [AuthGuard]
  },
  { path: '**', component: NotFoundedComponent
  },
];

@NgModule({
  declarations: [UsersComponent, UserDetailsComponent,PhotosComponent],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgxSmartModalModule.forChild(),
    SharedModule,
  ],
  exports: [],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: FakeAPIInterceptor,
    //   multi: true,
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
  ],
})
export class UsersModule {}
