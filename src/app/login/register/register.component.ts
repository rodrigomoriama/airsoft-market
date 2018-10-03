import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      'email': [''],
      'password': [''],
      'confirmPassword': [''],
      'firstName': [''],
      'lastName': ['']
    });
  }

  ngOnInit() {
  }

  canClearField(fieldName: string): boolean {
    return this.registerForm.get(fieldName).value && this.registerForm.get(fieldName).enabled;
  }

  onSubmit() {
    
  }
}
