import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(durationInMinutes: number, args?: any): string {
    if (!durationInMinutes) {
      return '';
    }

    if (durationInMinutes < 60) {
      return `${durationInMinutes}min`;
    }

    const hours = (durationInMinutes / 60).toFixed();
    const minutes = durationInMinutes % 60;
    if (minutes > 0) {
      return `${hours}h ${minutes}min`;
    } else {
      return `${hours}h`;
    }
  }

}
