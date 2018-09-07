import { MosaicService } from './../../providers/mosaic.service';
import { MosaicComponent } from './mosaic.component';
import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MosaicFilterComponent } from './mosaic-filter/mosaic-filter.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MosaicComponent,
    MosaicFilterComponent
  ],
  providers: [
    MosaicService
  ],
  entryComponents: [

  ],
  exports: [
  ]
})
export class MosaicModule {
}
