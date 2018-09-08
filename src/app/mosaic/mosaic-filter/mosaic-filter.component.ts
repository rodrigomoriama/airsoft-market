import { MosaicFilter } from './../../../domain/mosaic-filter';
import { URLSearchParams } from '@angular/http';
import { forkJoin } from 'rxjs';
import { Dropdown } from './../../../domain/dropdown';
import { ProductService } from './../../../providers/product.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-mosaic-filter',
  templateUrl: './mosaic-filter.component.html',
  styleUrls: ['./mosaic-filter.component.css']
})
export class MosaicFilterComponent implements OnInit {

  operationType: Dropdown[];
  productType: Dropdown[];
  conditionType: Dropdown[];
  caliberType: Dropdown[];
  systemType: Dropdown[];

  emptyItem: Dropdown;

  filterForm: FormGroup;

  filterEmitter = new EventEmitter<MosaicFilter>();

  constructor(private productService: ProductService,
    private formBuilder: FormBuilder) {

    this.emptyItem = { id: null, name: '' };

    this.filterForm = this.formBuilder.group({
      'operationType': [null],
      'productType': [null],
      'conditionType': [null],
      'caliberType': [null],
      'systemType': [null],
      'model': [null],
      'manufacturer': [null],

      'hasUpgrade': [false],
      'acceptExchange': [false],

      'location': [''],
      'title': ['']
    });
  }

  ngOnInit() {
    forkJoin(
      this.productService.getOperationType(new URLSearchParams),
      this.productService.getProductType(new URLSearchParams),
      this.productService.getConditionType(new URLSearchParams),
      this.productService.getCaliberType(new URLSearchParams),
      this.productService.getSystemType(new URLSearchParams),
    ).subscribe(
      (data: [Dropdown[], Dropdown[], Dropdown[], Dropdown[], Dropdown[]]) => {

        this.operationType = data[0];
        this.productType = data[1];
        this.conditionType = data[2];
        this.caliberType = data[3];
        this.systemType = data[4];

        this.operationType.unshift(this.emptyItem);
        this.productType.unshift(this.emptyItem);
        this.conditionType.unshift(this.emptyItem);
        this.caliberType.unshift(this.emptyItem);
        this.systemType.unshift(this.emptyItem);
      },
      error => console.log(error)
      );
  }

  onSubmit() {
    this.filterEmitter.emit(this.filterForm.value);
  }

  cleanForm() {
    this.filterForm.get('operationType').setValue(null);
    this.filterForm.get('productType').setValue(null);
    this.filterForm.get('conditionType').setValue(null);
    this.filterForm.get('caliberType').setValue(null);
    this.filterForm.get('systemType').setValue(null);
    this.filterForm.get('model').setValue(null);
    this.filterForm.get('manufacturer').setValue(null);

    this.filterForm.get('hasUpgrade').setValue(false);
    this.filterForm.get('acceptExchange').setValue(false);

    this.filterForm.get('location').setValue('');
    this.filterForm.get('title').setValue('');

    this.onSubmit();
  }
}
