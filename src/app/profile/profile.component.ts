import { FormatFieldHelper } from './../helpers/format-field-helper';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  masks: any;

  constructor(private formBuilder: FormBuilder) {
    this.profileForm = this.formBuilder.group({
      'id': [null],
      'email': [''],
      'username': [''],
      'phone': [''],
      'cellphone': ['']
    });

    this.masks = FormatFieldHelper.getMasks();
  }

  ngOnInit() {
    this.disableFields();
  }

  canClearField(fieldName: string): boolean {
    return this.profileForm.get(fieldName).value && this.profileForm.get(fieldName).enabled;
  }

  onSubmit() {
    this.enableFields();
    this.unmaskField();
  }

  unmaskField() {
    if (this.profileForm.get('phone').value) {
      this.profileForm.get('phone').setValue(FormatFieldHelper.unmaskField(this.profileForm.get('phone').value));
    }

    if (this.profileForm.get('cellphone').value) {
      this.profileForm.get('cellphone').setValue(FormatFieldHelper.unmaskField(this.profileForm.get('cellphone').value));
    }
  }

  disableFields() {
    this.profileForm.get('email').disable();
  }

  enableFields() {
    this.profileForm.get('email').enable();
  }
}
