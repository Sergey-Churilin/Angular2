import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[appBorder]'
})
export class BorderDirective implements OnChanges {
  @Input('appBorder') date: Date;

  constructor(private el: ElementRef) {
  }

  ngOnChanges() {
    this.highlight();
  }

  private highlight() {
    if (!this.date) {
      return;
    }

    const currentDate = new Date();
    const curTime = currentDate.getTime();
    const inputTime = this.date.getTime();
    let color = '';

    if ((inputTime < curTime) && (inputTime >= (curTime - (14 * 1000 * 60 * 60 * 24)))) {
      color = '#06f406';
    } else if (inputTime > curTime) {
      color = 'blue';
    }

    this.el.nativeElement.style.borderColor = color;
  }
}
