import { User } from './../../../domain/user';
import { URLSearchParams } from '@angular/http';
import { LocalStorageHelper } from './../../helpers/local-storage-helper';
import { MessagesHelper } from './../../helpers/messages-helper';
import { FormatFieldHelper } from './../../helpers/format-field-helper';
import { MatSnackBar } from '@angular/material';
import { UserDataService } from './../../../providers/user-data.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  profileForm: FormGroup;
  masks: any;


  constructor(private formBuilder: FormBuilder,
    private userDataService: UserDataService,
    public snackBar: MatSnackBar) {
    this.profileForm = this.formBuilder.group({
      'idUser': [null],
      'email': [''],
      'username': [''],
      'phone': [''],
      'cellphone': ['']
    });

    this.masks = FormatFieldHelper.getMasks();
  }

  ngOnInit() {
    this.disableFields();
    this.loadData();
  }

  canClearField(fieldName: string): boolean {
    return this.profileForm.get(fieldName).value && this.profileForm.get(fieldName).enabled;
  }

  onSubmit() {
    this.enableFields();
    this.unmaskField();

    this.userDataService.updateUser(this.profileForm.get('idUser').value, this.profileForm.value, new URLSearchParams).subscribe(
      data => {
        this.disableFields();
        MessagesHelper.handleSimpleMsgSnack(this.snackBar, 'Usuário Atualizado com sucesso');
        this.userDataService.updateUserDataLocalStorage(this.profileForm.get('email').value,
          this.profileForm.get('phone').value, this.profileForm.get('cellphone').value);
      },
      error => {
        MessagesHelper.handleSimpleErrorSnack(this.snackBar, error);
      }
    );
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

  loadData() {
    this.userDataService.getUserByEmail(LocalStorageHelper.getEmail(), new URLSearchParams).subscribe(
      (data: User) => {
        this.profileForm.get('idUser').setValue(data.idUser);
        this.profileForm.get('email').setValue(data.email);
        this.profileForm.get('username').setValue(data.username);

        if (data.phone) {
          this.profileForm.get('phone').setValue(data.phone);
        }

        if (data.cellphone) {
          this.profileForm.get('cellphone').setValue(data.cellphone);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
