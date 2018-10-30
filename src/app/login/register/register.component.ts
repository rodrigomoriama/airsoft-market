import { MatSnackBar } from '@angular/material';
import { MessagesHelper } from './../../helpers/messages-helper';
import { UserLogin } from './../../../domain/user-login';
import { URLSearchParams } from '@angular/http';
import { UserDataService } from './../../../providers/user-data.service';
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

  constructor(private formBuilder: FormBuilder,
    private userDataService: UserDataService,
    public snackBar: MatSnackBar) {
    this.registerForm = this.formBuilder.group({
      'email': [''],
      'password': [''],
      'confirmPassword': [''],
      'username': [''],
      'phone': [''],
      'cellphone': ['']
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
    this.userDataService.registerUser(this.registerForm.value, new URLSearchParams).subscribe(
      (data: UserLogin) => {
        MessagesHelper.handleSimpleMsgSnack(this.snackBar, 'Usuário criado com sucesso !');
        this.userDataService.loginSuccess(data);
      },
      error => {
        MessagesHelper.handleSimpleMsgSnack(this.snackBar, error);
      }
    );
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
