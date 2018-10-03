import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  @Output() backToLoginEmitter = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {
    this.forgotPasswordForm = this.formBuilder.group({
      'email': ['']
    });
  }

  ngOnInit() {
    this.forgotPasswordForm.get('email').setValue('');
  }

  backToLogin() {
    this.backToLoginEmitter.emit();
  }

  canClearField(fieldName: string): boolean {
    return this.forgotPasswordForm.get(fieldName).value && this.forgotPasswordForm.get(fieldName).enabled;
  }

  onSubmit() {
    console.log(this.forgotPasswordForm.get('email').value);
  }
}
