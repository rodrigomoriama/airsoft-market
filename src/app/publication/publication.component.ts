import { LocalStorageHelper } from './../helpers/local-storage-helper';
import { MatSnackBar } from '@angular/material';
import { MessagesHelper } from './../helpers/messages-helper';
import { Router, ActivatedRoute } from '@angular/router';
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
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit, AfterViewInit, OnDestroy {

  publicationForm: FormGroup;

  hasUp: boolean;
  isAlter: boolean;

  productType: Dropdown[];
  conditionType: Dropdown[];
  caliberType: Dropdown[];
  systemType: Dropdown[];
  activationType: Dropdown[];
  location: Dropdown[];
  model: Dropdown[];
  manufacturer: Dropdown[];
  materialType: Dropdown[];

  emptyItem: Dropdown;

  showRegisteredInfo: boolean;

  masks: any;

  // MEDIAS
  fileMediaUpload: File[];
  fileMediaUploadAlter: any[];

  subscription: Subscription;
  subscriptionLocation: Subscription;
  subscriptionModel: Subscription;
  subscriptionManufacturer: Subscription;

  constructor(private formBuilder: FormBuilder,
    private publicationService: PublicationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar,
    private sanitizer: DomSanitizer) {

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
      'codeOperationType': ['2'],

      'price': [0],
      'amount': [1],

      'hasUpgrade': [false],
      'acceptExchange': [false],
      'sendRegisteredInfo': [false],

      'title': [''],
      'upgrades': [''],
      'itemsIncluded': [''],
      'range': [''],
      'fps': [''],

      'phone': [''],
      'cellphone': [''],
      'email': [''],
      'username': [''],

      'meetingPoint': [''],
      'dtValidate': [''],
      'desc': [''],
      'website_link': [''],

      'images_path': ['', '', '', '', ''],

      'locationName': [''],
      'modelName': [''],
      'manufacturerName': [''],

      'fileMediaUploadMainIndex': [0]
    });

    this.masks = FormatFieldHelper.getMasks();
  }

  ngOnInit() {
    this.fileMediaUpload = [];
    this.fileMediaUploadAlter = [];

    this.loadFieldsData();
  }

  ngAfterViewInit() {
    this.subscribeCombos();

    this.subscription = this.activatedRoute.queryParamMap.subscribe(params => {
      if (params.get('idOrder')) {
        this.isAlter = true;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribeCombos();
  }

  onSubmit() {
    this.unmaskField();

    // this.unsubscribeCombos();

    // const formData = FormatFieldHelper.copyToFormData(FormatFieldHelper.enableAllFieldsFormGroup(this.publicationForm));

    // this.subscribeCombos();

    // if (this.publicationForm.get('locationName').value) {
    //   formData.delete('locationName');
    // }

    // if (this.publicationForm.get('modelName').value) {
    //   formData.delete('modelName');
    // }

    // if (this.publicationForm.get('manufacturerName').value) {
    //   formData.delete('manufacturerName');
    // }

    this.enableContactFields();

    this.publicationService.createPublication(this.publicationForm.value, new URLSearchParams).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['success-publication', data]);
      },
      error => {
        console.log(error);
        MessagesHelper.handleSimpleErrorSnack(this.snackBar, error);
        this.disableContactField();
      }
    );

    console.log(this.publicationForm.value);
  }

  loadFieldsData() {
    const cityParams = new URLSearchParams();
    cityParams.set('name', '');

    const manufacturerParams = new URLSearchParams();
    manufacturerParams.set('name', '');

    forkJoin(
      this.publicationService.getProductType(new URLSearchParams),
      this.publicationService.getConditionType(new URLSearchParams),
      this.publicationService.getCaliberType(new URLSearchParams),
      this.publicationService.getSystemType(new URLSearchParams),
      this.publicationService.getMaterialType(new URLSearchParams),
      this.publicationService.getActivationType(new URLSearchParams),
      this.publicationService.getLocationCity(cityParams),
      this.publicationService.getManufacturer(manufacturerParams),
    ).subscribe(
      (data: [Dropdown[], Dropdown[], Dropdown[], Dropdown[], Dropdown[], Dropdown[], Dropdown[], Dropdown[]]) => {

        this.productType = data[0];
        this.conditionType = data[1];
        this.caliberType = data[2];
        this.systemType = data[3];
        this.materialType = data[4];
        this.activationType = data[5];
        this.location = data[6];
        this.manufacturer = data[7];

        this.productType.unshift(this.emptyItem);
        this.conditionType.unshift(this.emptyItem);
        this.caliberType.unshift(this.emptyItem);
        this.systemType.unshift(this.emptyItem);
        this.materialType.unshift(this.emptyItem);
        this.activationType.unshift(this.emptyItem);
        this.manufacturer.unshift(this.emptyItem);
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

  unsubscribeCombos() {
    this.subscription.unsubscribe();
    this.subscriptionLocation.unsubscribe();
    this.subscriptionManufacturer.unsubscribe();
    this.subscriptionModel.unsubscribe();
  }

  canClearField(fieldName: string): boolean {
    return this.publicationForm.get(fieldName).value && this.publicationForm.get(fieldName).enabled;
  }

  hasUpChange(value): void {
    this.hasUp = value.checked;
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
    params.set('name', event);

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
    params.set('name', event);

    this.loadModel(params);
  }

  loadModel(params: URLSearchParams) {
    // cannot load data model when user has selected a product type
    if (this.publicationForm.get('codeProductType').value) {
      params.set('codeProductType', this.publicationForm.get('codeProductType').value);

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
        this.onClearManufacturerDropdown();
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
    params.set('name', event);

    this.publicationService.getManufacturer(params).subscribe(
      (manufacturer: Dropdown[]) => {
        this.manufacturer = manufacturer;
      },
      error => console.log(error)
    );
  }

  backToHome() {
    this.router.navigate(['home']);
  }

  getUrlFromImageUpload(fileImage: File): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(fileImage));
  }

  onFileMediaSelect(fileInput) {

    if (!this.isAlter) {
      if (this.fileMediaUpload.length >= 5) {
        MessagesHelper.handleSimpleMsgSnack(this.snackBar, 'Apenas 5 imagens serão salvos');
        return;
      }

      if (fileInput.target.files.length > 0) {
        this.publicationForm.get('fileMediaUploadMainIndex').setValue(fileInput.target.files[0]);
        for (let index = 0; index < fileInput.target.files.length; index++) {
          if (index >= 5) {
            MessagesHelper.handleSimpleMsgSnack(this.snackBar, 'Apenas 5 imagens serão salvos');
            return;
          }
          if (!this.fileMediaUpload.includes(fileInput.target.files[index])) {
            this.fileMediaUpload.push(fileInput.target.files[index]);
          }
        }
      }
    } else { // Alter Offer
      // if (this.fileMediaUpload.length + this.fileMediaUploadAlter.length >= 5) {
      //   MessagesHelper.handleSimpleMsgSnack(this.snackBar, 'Apenas 5 imagens serão salvos');
      //   return;
      // }

      // if (fileInput.target.files.length > 0) {

      //   for (let index = 0; index < fileInput.target.files.length; index++) {
      //     if (index >= 5) {
      //       MessagesHelper.handleSimpleMsgSnack(this.snackBar, 'Apenas 5 imagens serão salvos');
      //       return;
      //     }
      //     if (!this.fileMediaUpload.includes(fileInput.target.files[index])) {
      //       this.fileMediaUpload.push(fileInput.target.files[index]);
      //     }
      //   }
      // }
    }
  }

  onDeleteMediaFile(fileImage: File): void {
    const index = this.fileMediaUpload.findIndex(image => image === fileImage);
    this.fileMediaUpload.splice(index, 1);
    this.publicationForm.get('fileMediaUploadMainIndex').setValue(this.fileMediaUpload[0]);

    // Remove CSS de erro caso tenha
    // switch (index) {
    //   case 0:
    //     this.fileMedia0HasError = false;
    //     break;
    //   case 1:
    //     this.fileMedia1HasError = false;
    //     break;
    //   case 2:
    //     this.fileMedia2HasError = false;
    //     break;
    //   case 3:
    //     this.fileMedia3HasError = false;
    //     break;
    //   case 4:
    //     this.fileMedia4HasError = false;
    //     break;
    // }
  }

  isFileMediaMain(fileImage: File): boolean {
    return this.publicationForm.get('fileMediaUploadMainIndex').value === fileImage;
  }

  onSelectedMediaIndex() {
    console.log(this.publicationForm.get('fileMediaUploadMainIndex').value);

  }

  changeRegisteredInfo(value: any) {
    this.showRegisteredInfo = value.checked;

    if (value.checked) {
      this.publicationForm.get('username').setValue(LocalStorageHelper.getUsername());
      this.publicationForm.get('phone').setValue(LocalStorageHelper.getPhone());
      this.publicationForm.get('cellphone').setValue(LocalStorageHelper.getCellphone());
      this.publicationForm.get('email').setValue(LocalStorageHelper.getEmail());

      this.disableContactField();
    } else {
      this.enableContactFields();

      this.publicationForm.get('username').setValue('');
      this.publicationForm.get('phone').setValue('');
      this.publicationForm.get('cellphone').setValue('');
      this.publicationForm.get('email').setValue('');
    }
  }

  disableContactField() {
    this.publicationForm.get('username').disable();
    this.publicationForm.get('phone').disable();
    this.publicationForm.get('cellphone').disable();
    this.publicationForm.get('email').disable();
  }

  enableContactFields() {
    this.publicationForm.get('username').enable();
    this.publicationForm.get('phone').enable();
    this.publicationForm.get('cellphone').enable();
    this.publicationForm.get('email').enable();
  }

  unmaskField() {
    if (this.publicationForm.get('phone').value) {
      this.publicationForm.get('phone').setValue(FormatFieldHelper.unmaskField(this.publicationForm.get('phone').value));
    }

    if (this.publicationForm.get('cellphone').value) {
      this.publicationForm.get('cellphone').setValue(FormatFieldHelper.unmaskField(this.publicationForm.get('cellphone').value));
    }
  }

  showCanExchangeField(): boolean {
    return Number(this.publicationForm.get('codeOperationType').value) !== AppConstants.OPERATION_TYPE_EXCHANGE;
  }
}
