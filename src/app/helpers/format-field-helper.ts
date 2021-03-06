import { AppConstants } from './../app.constants';
import { FormGroup, FormBuilder } from '@angular/forms';
export class FormatFieldHelper {

  static formatAmount(amount: string): string {

    // posição do "."
    let i = amount.length;

    while (i > 3) {
      if (amount.includes('.')) {
        if (amount.substring(0, amount.indexOf('.') - 3).length >= 1) {
          amount = amount.substring(0, amount.indexOf('.') - 3) + '.' + amount.substring(amount.indexOf('.') - 3);
          i = amount.indexOf('.');
        }
      } else {
        amount = amount.substring(0, amount.length - 3) + '.' + amount.substring(amount.length - 3);
        i = amount.indexOf('.');
      }
    }

    return amount;
  }

  static formatPrice(price: string): string {

    if (price.includes('.')) {
      price = price.replace('.', ',');

      if (price.substring(price.indexOf(',') + 1).length === 1) {
        price = `${price}0`;
      }
    } else {
      price = `${price},00`;
    }
    price = `${this.formatAmount(price.substring(0, price.indexOf(',')))}${price.substring(price.indexOf(','))}`;

    return price;
  }

  static formatFieldLenght(field: string, fieldLength: number): string {
    if (!field) {
      return '';
    }

    if (field.length > fieldLength) {
      field = field.substring(0, fieldLength) + '...';
    }

    return field;
  }

  static formatFieldCPF(field: string): string {
    if (field.length === 11) {
      return `${this.formatAmount(field.substring(0, 9))}-${field.substring(9, 11)}`;
    }
    return field;
  }

  static formatFieldCNPJ(field: string): string {
    if (field.length === 14) {
      return `${this.formatAmount(field.substring(0, 8))}/${field.substring(8, 12)}-${field.substring(12)}`;
    }
    return field;
  }

  static formatFieldPhone(field: string): string {
    // phone field -> DDD + phone
    if (field.length === 11) {
      return `(${field.substring(0, 3)}) ${field.substring(3, 7)}-${field.substring(7)}`;
    }
    return '';
  }

  static formatFieldCellPhone(field: string): string {
    // phone field -> DDD + phone
    if (field.length === 11) {
      return this.formatFieldPhone(field);
    }

    if (field.length === 12) {
      return `(${field.substring(0, 3)}) ${field.substring(3, 8)}-${field.substring(8)}`;
    }
    return '';
  }

  static removeAccents(originalString: string): string {
    return originalString
      .replace(/[áàãâä]/gi, 'a')
      .replace(/[éè¨ê]/gi, 'e')
      .replace(/[íìïî]/gi, 'i')
      .replace(/[óòöôõ]/gi, 'o')
      .replace(/[úùüû]/gi, 'u')
      .replace(/[ç]/gi, 'c')
      .replace(/[ñ]/gi, 'n')
      .replace(/[^a-zA-Z0-9]/g, ' ');
  }

  static unmaskField(field: string): string {
    return field.replace(/\D+/g, '');
  }

  static normalizeDuration(duration: string): string {
    return duration.replace(/_/g, '0');
  }

  // Copy to other variable without object references
  static copyToFormGroup(oldForm: FormGroup, formBuilder: FormBuilder): FormGroup {

    const form = formBuilder.group({});

    Object.keys(oldForm.value).forEach(key => {
      if (oldForm.get(key).value) {
        form.addControl(key, formBuilder.control(oldForm.get(key).value));
      }
    });

    return form;
  }

  static copyAllDataToFormGroup(oldForm: FormGroup, formBuilder: FormBuilder): FormGroup {

    const form = formBuilder.group({});

    Object.keys(oldForm.value).forEach(key => {
      form.addControl(key, formBuilder.control(oldForm.get(key).value));
    });

    return form;
  }

  static copyToFormData(oldForm: FormGroup): FormData {
    const formData = new FormData();
    Object.keys(oldForm.value).forEach(key => {
      if (oldForm.get(key).value) {
        formData.append(key, oldForm.get(key).value);
      }
    });

    return formData;
  }

  // Enable all fields in FormGroup
  static enableAllFieldsFormGroup(form: FormGroup): FormGroup {
    Object.keys(form.controls).forEach(key => {
      form.controls[key].enable();
    });

    return form;
  }

  static disableAllFieldsFormGroup(form: FormGroup): FormGroup {
    Object.keys(form.controls).forEach(key => {
      form.controls[key].disable();
    });

    return form;
  }

  static formatEmpty(value: any) {
    if (value) {
      return value;
    }
    return '';
  }

  static getMasks(): any {
    return {
      cpf: [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
      phone: ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      cellphone: ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    };
  }

}
