import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core/src/change_detection/change_detector_ref';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  loginForm: FormGroup;
  showForgotPassword: boolean;

  @ViewChild('inputPassword') inputPassword;
  @ViewChild('inputLogin') inputLogin;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef) {
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
  }

  backToHome() {
    this.router.navigate(['home']);
  }

  focusLogin() {
    this.inputLogin.nativeElement.focus();
  }

  forgotPassBack() {
    this.showForgotPassword = false;
  }

  focusPassword() {
    this.inputPassword.nativeElement.focus();
  }
}
