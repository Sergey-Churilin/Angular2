import {Component, OnInit, Input, forwardRef, OnDestroy} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {CustomValidators} from '../../../../validators/custom.validators';

import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateComponent),
    multi: true
  }]
})
export class DateComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() creationDate: number;

  onChange: Function;
  onTouched: Function;

  dateGroup: FormGroup;
  dateInput: FormControl;

  private valueChangesSub: Subscription;

  constructor() {
  }

  ngOnInit() {
    this.dateInput = new FormControl('', {
      validators: [Validators.required, CustomValidators.datePattern],
      updateOn: 'blur'
    });
    this.dateGroup = new FormGroup({
      dateInput: this.dateInput
    });

    this.valueChangesSub = this.dateInput.valueChanges
      .subscribe(v => {
          if (!this.dateInput.errors && this.onChange) {
            const valArr = this.dateInput.value.split('/');
            const time = new Date(`${valArr[1]}/${valArr[0]}/${valArr[2]}`).getTime();
            this.onChange(time);
          }
        },
        error => console.log(error)
      );
  }

  ngOnDestroy() {
    this.valueChangesSub.unsubscribe();
  }

  writeValue(obj: any): void {
    obj && this.dateInput.setValue(this.formatDate(obj));
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public hasError(c: FormControl): boolean {
    return !!(c.touched && c.errors);
  }

  private formatDate(d) {
    const date = new Date(d);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${day}/${month+1}/${year}`;
  }

}
