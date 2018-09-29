import { AppConstants } from './../app.constants';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  publicationForm: FormGroup;

  codeOperationType: number[];

  constructor(private formBuilder: FormBuilder) {
    this.publicationForm = this.formBuilder.group({
      'id': [null],
      'codeOperationType': [null],
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
      'opSell': [false],
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

      'newModel': [''],
      'newManufacture': [''],

    });
  }

  ngOnInit() {
    this.codeOperationType = [];
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

}
