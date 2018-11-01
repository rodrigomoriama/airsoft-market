import { MosaicService } from './../../../providers/mosaic.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormatFieldHelper } from './../../helpers/format-field-helper';
import { MosaicFilter } from './../../../domain/mosaic-filter';
import { URLSearchParams } from '@angular/http';
import { forkJoin } from 'rxjs';
import { Dropdown } from './../../../domain/dropdown';
import { Component, OnInit, AfterViewInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { subscribeOn } from 'rxjs/internal/operators/subscribeOn';


@Component({
  selector: 'app-mosaic-filter',
  templateUrl: './mosaic-filter.component.html',
  styleUrls: ['./mosaic-filter.component.css']
})
export class MosaicFilterComponent implements OnInit, AfterViewInit {

  operationType: Dropdown[];
  productType: Dropdown[];
  conditionType: Dropdown[];
  caliberType: Dropdown[];
  systemType: Dropdown[];

  location: Dropdown[];

  emptyItem: Dropdown;

  filterForm: FormGroup;

  filterEmitter = new EventEmitter<MosaicFilter>();
  subscriptionLocation: Subscription;

  constructor(private mosaicService: MosaicService,
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

      'title': [''],

      'location': [''],
      'locationName': ['']
    });
  }

  ngOnInit() {
    forkJoin(
      this.mosaicService.getOperationType(new URLSearchParams),
      this.mosaicService.getProductType(new URLSearchParams),
      this.mosaicService.getConditionType(new URLSearchParams),
      this.mosaicService.getCaliberType(new URLSearchParams),
      this.mosaicService.getSystemType(new URLSearchParams),
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

  ngAfterViewInit() {
    this.subscriptionLocation = this.filterForm.get('locationName').valueChanges
    .pipe(
      debounceTime(400)
    ).subscribe(value => {
      this.onFilterLocation(value);
    });
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
    this.filterForm.get('location').setValue(null);

    this.filterForm.get('hasUpgrade').setValue(false);
    this.filterForm.get('acceptExchange').setValue(false);

    this.filterForm.get('locationName').setValue('');
    this.filterForm.get('title').setValue('');

    this.onSubmit();
  }

  // ===================================================
  // LOCATION
  // ===================================================
  onSelectedItemLocation(event) {
    if (event !== undefined || event !== null) {

      if (event.id) {
        this.selectLocation(event);
      } else if (event !== '') {
        const findItem = this.location.find(
          l => FormatFieldHelper.removeAccents(l.name).toLowerCase() === FormatFieldHelper.removeAccents(event).toLowerCase());

        if (findItem) {
          this.selectLocation(findItem);
          return;
        }
      } else {
        this.onClearLocationDropdown();
      }
    }
  }

  selectLocation(event: Dropdown) {
    console.log(event);
    this.filterForm.get('location').setValue(event);
    this.filterForm.get('locationName').setValue(event.name);
  }

  onClearLocationDropdown() {
    this.filterForm.get('location').setValue(this.emptyItem);
    this.filterForm.get('locationName').setValue('');
  }

  onFilterLocation(event: string) {
    const params = new URLSearchParams();
    params.set('city', event);

    this.mosaicService.getLocationCity(params).subscribe(
      (location: Dropdown[]) => {
        this.location = location;
      },
      error => console.log(error)
    );
  }

  canClearField(fieldName: string): boolean {
    return this.filterForm.get(fieldName).value && this.filterForm.get(fieldName).enabled;
  }
}
