import { PublicationService } from './../../providers/publication.service';
import {
  MatChipsModule,
  MatIconModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatInputModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatCardModule
} from '@angular/material';
import { MosaicService } from './../../providers/mosaic.service';
import { MosaicComponent } from './mosaic.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MosaicFilterComponent } from './mosaic-filter/mosaic-filter.component';


@NgModule({
  imports: [
    CommonModule,

    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCardModule,

    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule
  ],
  declarations: [
    MosaicComponent,
    MosaicFilterComponent
  ],
  providers: [
    MosaicService,
    PublicationService
  ],
  entryComponents: [

  ],
  exports: [
  ]
})
export class MosaicModule {
}
