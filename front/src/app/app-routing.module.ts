import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthGuard } from './guards/authGuard';
import { EditorComponent } from './components/editor/editor.component';
import { ScriptComponent } from './components/script/script.component';

const routes: Routes = [
  { path: '', component: HomeComponent/*, canActivate: [AuthGuard]*/ },
  // { path: 'register', component: RegisterComponent },
  // { path: 'login', component: LoginComponent },
  { path: 'notFound', component: NotfoundComponent },
  { path: 'editor/:id', component: EditorComponent },
  { path: 'home', component: HomeComponent },
  { path: 'editor', component: EditorComponent },
  { path: 'script', component: ScriptComponent },
  { path: '**', redirectTo: '/notFound' }
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
