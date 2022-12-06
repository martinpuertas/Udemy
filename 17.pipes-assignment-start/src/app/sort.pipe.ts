import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any[], orderBy: string, orderMethod: 'asc' | 'desc'): any {
    return value.sort((a, b) => {
      const valueA = a[orderBy].toUpperCase();
      const valueB = b[orderBy].toUpperCase();
      if (orderMethod === 'desc') {
        if (valueA > valueB) {
          return -1;
        }
        if (valueA < valueB) {
          return 1;
        }
        return 0;
      };
      if (valueA < valueB) {
        return -1;
      }
      if (valueA > valueB) {
        return 1;
      }
      return 0;
    })
  }
}
