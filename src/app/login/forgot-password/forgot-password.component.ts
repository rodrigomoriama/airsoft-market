import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms/src/model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email: FormControl;
  backToLoginEmitter = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.email.setValue('');
  }

  backToLogin() {
    this.backToLoginEmitter.emit();
  }

  canClearField(fieldName: string): boolean {
    return this.email.get(fieldName).value && this.email.get(fieldName).enabled;
  }

  onSubmit() {
    console.log(this.email.get('email').value);
  }
}
