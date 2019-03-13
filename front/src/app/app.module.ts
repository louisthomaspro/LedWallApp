import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HomeComponent } from './components/home/home.component';


import { MustMatchDirective } from './directives/check-match.directive';

import { UserService } from './services/users.service';
import { AuthGuard } from './guards/authGuard';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatIconModule, MatCardModule, MatMenuModule, MatDialogModule, MatGridListModule, MatSnackBarModule, MatBadgeModule } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';
import { EditorComponent } from './components/editor/editor.component';
import { PixelArtInformationDialogComponent } from './components/pixelart-information-dialog/pixel-art-information-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ScriptComponent } from './components/script/script.component';

import {DragDropModule} from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    NotfoundComponent,
    HomeComponent,
    MustMatchDirective,
    EditorComponent,
    PixelArtInformationDialogComponent,
    ConfirmDialogComponent,
    ScriptComponent
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
    MatBadgeModule
  ],
  providers: [UserService, AuthGuard, AuthService],
  bootstrap: [AppComponent],
  entryComponents: [ PixelArtInformationDialogComponent, ConfirmDialogComponent ]
})
export class AppModule { }
