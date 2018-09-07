import { Mosaic } from './../../domain/mosaic';
import { URLSearchParams } from '@angular/http';
import { MosaicService } from './../../providers/mosaic.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mosaic',
  templateUrl: './mosaic.component.html',
  styleUrls: ['./mosaic.component.css']
})
export class MosaicComponent implements OnInit {

  mosaicData: Mosaic[];

  constructor(private mosaicService: MosaicService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const params = this.loadFilterParams();
    this.mosaicService.getAllProductsMosaic(params).subscribe(
      (data: Mosaic[]) => {
        this.mosaicData = data;
      },
      error => console.log(error)
    );
  }

  loadFilterParams(): URLSearchParams {
    const params  = new URLSearchParams();
    return params;
  }

}
