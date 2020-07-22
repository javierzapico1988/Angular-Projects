import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderServer'
})
export class OrderServerPipe implements PipeTransform {

  transform(value: any): any {
    return value.sort((e1, e2) => e1.name < e2.name ? 1 : -1);

  }
}
