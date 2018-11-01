import { MatSnackBar } from '@angular/material';
import { MessagesHelper } from './../../helpers/messages-helper';
import { User } from './../../../domain/user';
import { URLSearchParams } from '@angular/http';
import { LocalStorageHelper } from './../../helpers/local-storage-helper';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserDataService } from './../../../providers/user-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  private userCode: number;

  constructor(private userDataService: UserDataService,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar) {
      this.changePasswordForm = this.formBuilder.group({
        'currentPassword': [''],
        'newPassword': [''],
        'confirmPassword': ['']
      });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.userDataService.getUserByEmail(LocalStorageHelper.getEmail(), new URLSearchParams).subscribe(
      (data: User) => {
        this.userCode = data.idUser;
      },
      error => {
        console.log(error);
      }
    );
  }

  clearForm() {
    this.changePasswordForm.get('currentPassword').setValue('');
    this.changePasswordForm.get('newPassword').setValue('');
    this.changePasswordForm.get('confirmPassword').setValue('');
  }

  onSubmit() {
    this.userDataService.changePassword(this.userCode, this.changePasswordForm.value, new URLSearchParams).subscribe(
      data => {
        this.clearForm();
        MessagesHelper.handleSimpleMsgSnack(this.matSnackBar, 'Senha alterada');
      },
      error => {
        MessagesHelper.handleSimpleErrorMessageSnack(this.matSnackBar, error);
      }
    );
  }

}
