import { UserLogin } from './../../domain/user-login';
import { URLSearchParams } from '@angular/http';
import { UserDataService } from './../../providers/user-data.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  loginForm: FormGroup;
  showForgotPassword: boolean;

  hidePassword = true;

  @ViewChild('inputPassword') inputPassword;
  @ViewChild('inputLogin') inputLogin;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private userDataService: UserDataService) {
    this.loginForm = this.formBuilder.group({
      'email': [''],
      'password': ['']
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.focusLogin();
    }, 500);
    this.changeDetectorRef.detectChanges();
  }

  canClearField(fieldName: string): boolean {
    return this.loginForm.get(fieldName).value && this.loginForm.get(fieldName).enabled;
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.userDataService.login(this.loginForm.value, new URLSearchParams).subscribe(
      (data: UserLogin) => {
        console.log('login data: ', data);
        this.userDataService.loginSuccess(data);
      },
      error => {

      }
    );
  }

  focusLogin() {
    this.inputLogin.nativeElement.focus();
  }

  focusPassword() {
    this.inputPassword.nativeElement.focus();
  }
}
