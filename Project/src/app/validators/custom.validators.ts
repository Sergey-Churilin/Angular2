import {AbstractControl} from '@angular/forms';

export class CustomValidators {
  static datePattern(c: AbstractControl): {[key: string]: boolean} | null {
    const value = c.value;
    if (!value) {
      return {
        datePattern: true
      };
    }
    if (value.indexOf('/') === -1) {
      return {
        datePattern: true
      };
    }

    const valueArr = value.split('/');
    if (valueArr.length !== 3) {
      return {
        datePattern: true
      };
    }

    let isValid = true;
    valueArr.forEach( v => {
      if (Number.isNaN(+v)) {
        isValid = false;
      }
    });

    if (!isValid || +valueArr[0] > 31 || +valueArr[1] > 12) {
      return {
        datePattern: true
      };
    }
    return null;
  }
}
