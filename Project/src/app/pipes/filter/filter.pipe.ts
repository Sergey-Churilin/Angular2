import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(values: any, filterValue: any): any {
    if (!filterValue) {
      return values;
    }

    return values.filter (v => v.title.indexOf(filterValue) !== -1);
  }

}
