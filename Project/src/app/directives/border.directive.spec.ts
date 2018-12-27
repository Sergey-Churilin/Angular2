import {Component} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BorderDirective } from './border.directive';

@Component({
  template: `
  <h2 [appBorder]="date">Text</h2>`
})
class TestComponent {
  date: Date = new Date();
}

describe('CourseListComponent', () => {
  const date: Date = new Date();
  const oneDay = (1000 * 60 * 60 * 24);
  let fixture: ComponentFixture<TestComponent>;
  let des, component;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ BorderDirective, TestComponent ]
    })
      .createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // initial binding

    // all elements with an attached HighlightDirective
    des = fixture.debugElement.query(By.directive(BorderDirective));
  });

  it('should set border color blue', () => {
    component.date = new Date(date.getTime() + oneDay);
    fixture.detectChanges();
    const bColor = des.nativeElement.style.borderColor;
    expect(bColor.indexOf('rgb') !== -1 ? rgbToHexFull(bColor) : bColor).toBe('blue');
  });

  it('should set border color green', () => {
    component.date =  new Date(date.getTime() - oneDay);
    fixture.detectChanges();
    const bColor = des.nativeElement.style.borderColor;
    expect(bColor.indexOf('rgb') !== -1 ? rgbToHexFull(bColor) : bColor).toBe('#06f406');
  });

  it('should NOT set border color', () => {
    component.date =  new Date(date.getTime() - oneDay * 20);
    fixture.detectChanges();
    const bColor = (des.nativeElement.style.borderColor);
    expect(bColor.indexOf('rgb') !== -1 ? rgbToHexFull(bColor) : bColor).toBe('');
  });
});

function rgbToHexFull(color) {
  const rgbArray = color.slice(4, -1).split(',').map(i => i.trim());
  return fullColorHex(rgbArray[0], rgbArray[1], rgbArray[2]);
}

function rgbToHex(rgb) {
  let hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = '0' + hex;
  }
  return hex;
}

function fullColorHex(r,g,b) {
  const red = rgbToHex(r);
  const green = rgbToHex(g);
  const blue = rgbToHex(b);
  return `#${red}${green}${blue}`;
}
