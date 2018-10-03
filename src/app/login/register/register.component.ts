import { FormatFieldHelper } from './../../helpers/format-field-helper';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  hidePassword = true;
  hideConfirmPassword = true;

  masks: any;

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      'email': [''],
      'password': [''],
      'confirmPassword': [''],
      'firstName': [''],
      'lastName': [''],
      'phone': [null],
      'cellphone': [null]
    });

    this.masks = FormatFieldHelper.getMasks();
  }

  ngOnInit() {
  }

  canClearField(fieldName: string): boolean {
    return this.registerForm.get(fieldName).value && this.registerForm.get(fieldName).enabled;
  }

  onSubmit() {
    this.unmaskField();
  }

  unmaskField() {
    if (this.registerForm.get('phone').value) {
      this.registerForm.get('phone').setValue(FormatFieldHelper.unmaskField(this.registerForm.get('phone').value));
    }

    if (this.registerForm.get('cellphone').value) {
      this.registerForm.get('cellphone').setValue(FormatFieldHelper.unmaskField(this.registerForm .get('cellphone').value));
    }
  }
}
