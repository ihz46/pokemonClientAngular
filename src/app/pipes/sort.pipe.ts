import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../model/pokemon';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(array: Array<Pokemon>, args: Pokemon): Array<Pokemon> {
    array.sort((p1, p2) => {
      if (p1.id > p2.id) {
        console.debug(p1);

        return 1;
      } else {
        console.debug(p2);

        return -1;
      }
    });

    return array;
  }


}
