import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(values: any, args?: any): any {
    return values.sort((v1, v2) => (v1.creationDate as Date).getTime() - (v2.creationDate as Date).getTime());
  }

}
