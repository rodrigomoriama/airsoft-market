import { FormatFieldHelper } from './../helpers/format-field-helper';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Subscription } from 'rxjs/internal/Subscription';
import { URLSearchParams } from '@angular/http';
import { forkJoin } from 'rxjs';
import { PublicationService } from './../../providers/publication.service';
import { Dropdown } from './../../domain/dropdown';
import { AppConstants } from './../app.constants';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit, AfterViewInit, OnDestroy {

  publicationForm: FormGroup;

  codeOperationType: number[];

  productType: Dropdown[];
  conditionType: Dropdown[];
  caliberType: Dropdown[];
  systemType: Dropdown[];
  location: Dropdown[];
  model: Dropdown[];
  manufacturer: Dropdown[];
  materialType: Dropdown[];

  emptyItem: Dropdown;

  subscriptionLocation: Subscription;
  subscriptionModel: Subscription;
  subscriptionManufacturer: Subscription;

  constructor(private formBuilder: FormBuilder,
    private publicationService: PublicationService) {

    this.emptyItem = { id: null, name: '' };

    this.publicationForm = this.formBuilder.group({
      'id': [null],
      'codeProductType': [null],
      'codeModel': [null],
      'codeManufacturer': [null],
      'codeMaterialType': [null],
      'codeConditionType': [null],
      'codeLocation': [null],
      'codeCaliberType': [null],
      'codeSystemType': [null],
      'codeActivationType': [null],

      'price': [null],
      'amount': [null],

      'hasUpgrade': [false],
      'acceptExchange': [false],
      'opBuy': [false],
      'opSell': [true],
      'opExchange': [false],


      'title': [''],
      'upgrades': [''],
      'itemsIncluded': [''],
      'range': [''],
      'fps': [''],

      'phone': [''],
      'cellphone': [''],
      'email': [''],
      'ownerName': [''],
      'meetingPoint': [''],
      'dtValidate': [''],
      'desc': [''],
      'website_link': [''],

      'images_path': ['', '', '', '', ''],

      'locationName': [''],
      'modelName': [''],
      'manufacturerName': ['']

    });
  }

  ngOnInit() {
    this.codeOperationType = [];
    this.loadFieldsData();
  }

  ngAfterViewInit() {
    this.subscribeCombos();
  }

  ngOnDestroy() {
    this.subscriptionLocation.unsubscribe();
  }

  onSubmit() {
    const formData = new FormData;
    formData.set('codeOperationType', <any>this.codeOperationType);

    console.log(this.publicationForm.value);
  }

  loadFieldsData() {
    forkJoin(
      this.publicationService.getProductType(new URLSearchParams),
      this.publicationService.getConditionType(new URLSearchParams),
      this.publicationService.getCaliberType(new URLSearchParams),
      this.publicationService.getSystemType(new URLSearchParams),
      this.publicationService.getManufacturer(new URLSearchParams),
      this.publicationService.getMaterialType(new URLSearchParams),
    ).subscribe(
      (data: [Dropdown[], Dropdown[], Dropdown[], Dropdown[], Dropdown[], Dropdown[]]) => {

        this.productType = data[0];
        this.conditionType = data[1];
        this.caliberType = data[2];
        this.systemType = data[3];
        this.manufacturer = data[4];
        this.materialType = data[5];

        this.productType.unshift(this.emptyItem);
        this.conditionType.unshift(this.emptyItem);
        this.caliberType.unshift(this.emptyItem);
        this.systemType.unshift(this.emptyItem);
        this.materialType.unshift(this.emptyItem);
      },
      error => console.log(error)
      );
  }

  subscribeCombos() {
    this.subscriptionLocation = this.publicationForm.get('locationName').valueChanges
      .pipe(
      debounceTime(400)
      ).subscribe(value => {
        this.onFilterLocation(value);
      });

    this.subscriptionModel = this.publicationForm.get('modelName').valueChanges
      .pipe(
      debounceTime(400)
      ).subscribe(value => {
        this.onFilterModel(value);
      });

    this.subscriptionManufacturer = this.publicationForm.get('manufacturerName').valueChanges
      .pipe(
      debounceTime(400)
      ).subscribe(value => {
        this.onFilterManufacturer(value);
      });
  }

  selectOperationType(value: any, operationType: number): void {
    // console.log(value.checked);
    // console.log(operationType);

    if (value.checked) {
      if (operationType === AppConstants.OPERATION_TYPE_BUY) {
        const val = this.codeOperationType.findIndex(v => v === AppConstants.OPERATION_TYPE_SELL);
        if (val >= 0) {
          this.codeOperationType[val] = AppConstants.OPERATION_TYPE_BUY;
          this.publicationForm.get('opBuy').setValue(true);
          this.publicationForm.get('opSell').setValue(false);
        } else {
          this.codeOperationType.push(AppConstants.OPERATION_TYPE_BUY);
          this.publicationForm.get('opBuy').setValue(true);
          this.publicationForm.get('opSell').setValue(false);
        }
      }

      if (operationType === AppConstants.OPERATION_TYPE_SELL) {
        const val = this.codeOperationType.findIndex(v => v === AppConstants.OPERATION_TYPE_BUY);
        if (val >= 0) {
          this.codeOperationType[val] = AppConstants.OPERATION_TYPE_SELL;
          this.publicationForm.get('opBuy').setValue(false);
          this.publicationForm.get('opSell').setValue(true);
        } else {
          this.codeOperationType.push(AppConstants.OPERATION_TYPE_SELL);
          this.publicationForm.get('opBuy').setValue(false);
          this.publicationForm.get('opSell').setValue(true);
        }
      }

      if (operationType === AppConstants.OPERATION_TYPE_EXCHANGE) {
        const val = this.codeOperationType.findIndex(v => v === AppConstants.OPERATION_TYPE_EXCHANGE);
        if (val < 0) {
          this.codeOperationType.push(AppConstants.OPERATION_TYPE_EXCHANGE);
        }
      }
    } else {
      if (this.codeOperationType.length === 2) {
        const op = this.codeOperationType.filter(v => v !== operationType);
        this.codeOperationType = op;
      } else {
        this.codeOperationType = [];
        this.publicationForm.get('opBuy').setValue(false);
        this.publicationForm.get('opSell').setValue(false);
        this.publicationForm.get('opExchange').setValue(false);
      }
    }

    console.log(this.codeOperationType);
  }

  canClearField(fieldName: string): boolean {
    return this.publicationForm.get(fieldName).value && this.publicationForm.get(fieldName).enabled;
  }

  onSelectedProductType() {
    // after load product type, load model
    if (this.publicationForm.get('codeProductType').value) {
      const params = new URLSearchParams();
      params.set('productType', this.publicationForm.get('codeProductType').value);
      this.onClearModelDropdown();
      this.model = [];
      this.loadModel(params);
    }
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
    this.publicationForm.get('codeLocation').setValue(event.id);
    this.publicationForm.get('locationName').setValue(event.name);
  }

  onClearLocationDropdown() {
    this.publicationForm.get('codeLocation').setValue(null);
    this.publicationForm.get('locationName').setValue('');
  }

  onFilterLocation(event: string) {
    const params = new URLSearchParams();
    params.set('name_like', event);

    this.publicationService.getLocationCity(params).subscribe(
      (location: Dropdown[]) => {
        this.location = location;
      },
      error => console.log(error)
    );
  }

  // ===================================================
  // MODEL
  // ===================================================
  onSelectedItemModel(event) {
    // only if user has selected product Type
    if (this.publicationForm.get('codeProductType').value) {
      if (event !== undefined || event !== null) {

        if (event.id) {
          this.selectModel(event);
        } else if (event !== '') {
          // NEW MODEL
          const findItem = this.model.find(
            p => FormatFieldHelper.removeAccents(p.name).toLowerCase() === FormatFieldHelper.removeAccents(event).toLowerCase());
          if (findItem) {
            this.selectModel(findItem);
            return;
          }

          console.log('New Model: ' + event);
          this.publicationForm.get('codeModel').setValue(null);
          this.publicationForm.get('modelName').setValue(event);
        } else {
          this.onClearModelDropdown();
        }
      }
    }
  }

  selectModel(event: Dropdown) {
    console.log(event);
    this.publicationForm.get('codeModel').setValue(event.id);
    this.publicationForm.get('modelName').setValue(event.name);
  }

  onClearModelDropdown() {
    this.publicationForm.get('codeModel').setValue(null);
    this.publicationForm.get('modelName').setValue('');
  }

  onFilterModel(event: string) {
    const params = new URLSearchParams();
    params.set('name_like', event);

    this.loadModel(params);
  }

  loadModel(params: URLSearchParams) {
    // cannot load data model when user has selected a product type
    if (this.publicationForm.get('codeProductType').value) {
      this.publicationService.getProductModel(params).subscribe(
        (model: Dropdown[]) => {
          this.model = model;
        },
        error => console.log(error)
      );
    }
  }

  // ===================================================
  // MANUFACTURER
  // ===================================================
  onSelectedItemManufacturer(event) {
    if (event !== undefined || event !== null) {

      if (event.id) {
        this.selectManufacturer(event);
      } else if (event !== '') {
        // NEW MANUFACTURER
        const findItem = this.manufacturer.find(
          p => FormatFieldHelper.removeAccents(p.name).toLowerCase() === FormatFieldHelper.removeAccents(event).toLowerCase());
        if (findItem) {
          this.selectManufacturer(findItem);
          return;
        }

        console.log('New Manufacturer: ' + event);
        this.publicationForm.get('codeManufacturer').setValue(null);
        this.publicationForm.get('manufacturerName').setValue(event);
      } else {
        this.onClearModelDropdown();
      }
    }
  }

  selectManufacturer(event: Dropdown) {
    console.log(event);
    this.publicationForm.get('codeManufacturer').setValue(event.id);
    this.publicationForm.get('manufacturerName').setValue(event.name);
  }

  onClearManufacturerDropdown() {
    this.publicationForm.get('codeManufacturer').setValue(null);
    this.publicationForm.get('manufacturerName').setValue('');
  }

  onFilterManufacturer(event: string) {
    const params = new URLSearchParams();
    params.set('name_like', event);

    this.publicationService.getManufacturer(params).subscribe(
      (manufacturer: Dropdown[]) => {
        this.manufacturer = manufacturer;
      },
      error => console.log(error)
    );
  }

}