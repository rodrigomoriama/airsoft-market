import { MatMenuModule, MatIconModule, MatButtonModule, MatSnackBarModule } from '@angular/material';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PublicationDetailComponent,
    PublicationComponent,
    PageNotFoundComponent
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
    MatMenuModule
  ],
  providers: [
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
