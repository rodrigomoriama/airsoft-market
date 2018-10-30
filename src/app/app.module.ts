import { UserDataService } from './../providers/user-data.service';
import { ProfileModule } from './profile/profile.module';
import { TextMaskModule } from 'angular2-text-mask';
import { LoginModule } from './login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatMenuModule,
  MatIconModule,
  MatRadioModule,
  MatButtonModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatInputModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatCardModule,
  MatDialogModule
} from '@angular/material';
import { CurrencyMaskModule } from 'ngx-currency-mask';
import { ApiService } from './../providers/api.service';
import { MosaicModule } from './mosaic/mosaic.module';
import { AppRoutingModule } from './app.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpModule } from '@angular/http';
import { PublicationDetailComponent } from './publication-detail/publication-detail.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { PublicationComponent } from './publication/publication.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReportPublicationComponent } from './modal/report-publication/report-publication.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PublicationDetailComponent,
    PublicationComponent,
    PageNotFoundComponent,
    ReportPublicationComponent
  ],
  entryComponents: [
    ReportPublicationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    MosaicModule,
    HttpModule,
    MatIconModule,
    MatButtonModule,
    NgxGalleryModule,
    MatSnackBarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatCardModule,
    MatRadioModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    CurrencyMaskModule,
    LoginModule,
    TextMaskModule,
    ProfileModule
  ],
  providers: [
    ApiService,
    UserDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
