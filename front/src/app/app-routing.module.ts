import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuard } from './guards/authGuard';

import { NotfoundComponent } from './components/pages/notfound/notfound.component';

import { EditorComponent } from './components/pages/editor/editor.component';
import { GalleryComponent} from './components/pages/gallery/gallery.component';
import { AnimationsComponent } from './components/pages/animations/animations.component';
import { WordartsComponent } from './components/pages/wordarts/wordarts.component';
import { ControllerComponent } from './components/pages/controller/controller.component';


const routes: Routes = [
  { path: '', component: GalleryComponent/*, canActivate: [AuthGuard]*/ },
  // { path: 'register', component: RegisterComponent },
  // { path: 'login', component: LoginComponent },
  { path: 'editor/:id', component: EditorComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'editor', component: EditorComponent },
  { path: 'animations', component: AnimationsComponent },
  { path: 'animations/:id', component: AnimationsComponent },
  { path: 'wordarts/:id', component: WordartsComponent },
  { path: 'wordarts', component: WordartsComponent },
  { path: 'controller', component: ControllerComponent },
  { path: 'notFound', component: NotfoundComponent },
  { path: '**', component: NotfoundComponent }
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
