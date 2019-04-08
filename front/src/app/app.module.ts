import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';



import { MustMatchDirective } from './directives/check-match.directive';

import { UserService } from './services/users.service';
import { AuthGuard } from './guards/authGuard';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatIconModule, MatCardModule,
  MatMenuModule, MatDialogModule, MatGridListModule, MatSnackBarModule, MatBadgeModule, MatFormFieldModule,
  MatInputModule, MatExpansionModule } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { FooterComponent } from './components/footer/footer.component';
import { TimeDialogComponent } from './components/dialog/time-dialog/time-dialog.component';
import { GalleryComponent } from './components/pages/gallery/gallery.component';
import { AnimationsComponent } from './components/pages/animations/animations.component';
import { EditorComponent } from './components/pages/editor/editor.component';
import { PixelArtInformationDialogComponent } from './components/dialog/pixelart-information-dialog/pixel-art-information-dialog.component';
import { ConfirmDialogComponent } from './components/dialog/confirm-dialog/confirm-dialog.component';
import { NotfoundComponent } from './components/pages/notfound/notfound.component';
import { WordartsComponent } from './components/pages/wordarts/wordarts.component';
import { ControllerComponent } from './components/pages/controller/controller.component';
import { SavingComponent } from './components/saving/saving.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    NotfoundComponent,
    MustMatchDirective,
    EditorComponent,
    PixelArtInformationDialogComponent,
    ConfirmDialogComponent,
    TimeDialogComponent,
    GalleryComponent,
    AnimationsComponent,
    WordartsComponent,
    ControllerComponent,
    SavingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    MatGridListModule,
    MatSnackBarModule,
    DragDropModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule
  ],
  providers: [UserService, AuthGuard, AuthService],
  bootstrap: [AppComponent],
  entryComponents: [ PixelArtInformationDialogComponent, ConfirmDialogComponent, TimeDialogComponent ]
})
export class AppModule { }
