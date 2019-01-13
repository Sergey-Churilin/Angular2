import {Component, OnInit, Input, forwardRef, OnDestroy} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';

import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DurationComponent),
    multi: true
  }]
})
export class DurationComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input('duration') durationMinutes: string;

  onChange: Function;
  onTouched: Function;

  durationGroup: FormGroup;
  durationInput: FormControl;

  private valueChangesSub: Subscription;

  ngOnInit() {
    this.durationInput = new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur'
    });
    this.durationGroup = new FormGroup({
      durationInput: this.durationInput
    });

    this.valueChangesSub = this.durationInput.valueChanges
      .subscribe(v => {
          if (!this.durationInput.errors && this.onChange) {
            this.onChange(v);
          }
        },
        error => console.log(error)
      );
  }

  ngOnDestroy() {
    this.valueChangesSub.unsubscribe();
  }

  public hasError(c: FormControl): boolean {
    return !!(c.touched && c.errors);
  }

  writeValue(obj: any): void {
    obj && this.durationInput.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
