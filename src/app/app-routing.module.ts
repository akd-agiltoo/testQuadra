import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { TacheComponent } from './tache/tache.component';
import { AuthGuard } from './_helpers/autho.guard';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'tache', component: TacheComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
