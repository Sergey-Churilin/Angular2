import {Component, OnInit, Input, forwardRef} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';

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
export class DurationComponent implements OnInit, ControlValueAccessor {
  @Input('duration') durationMinutes: string;

  onChange: Function;
  onTouched: Function;

  durationGroup: FormGroup;
  durationInput: FormControl;

  ngOnInit() {
    this.durationInput = new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur'
    });
    this.durationGroup = new FormGroup({
      durationInput: this.durationInput
    });

    this.durationInput.valueChanges
      .subscribe(v => {
          if (!this.durationInput.errors && this.onChange) {
            this.onChange(v);
          }
        },
        error => console.log(error)
      );
  }

  hasError(c: FormControl) {
    if (c.touched && c.errors) {
      return true;
    }
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
