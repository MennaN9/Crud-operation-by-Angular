import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
const routes: Route[] = [
  {path: '',pathMatch: 'full', redirectTo: '/users' },
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
