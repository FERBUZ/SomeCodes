import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filtroCompletado',
  pure: false,
})
export class FiltroCompletadoPipe implements PipeTransform {

  transform(listas: Lista[], completada: Boolean = true): Lista[] {

    return listas.filter( lista => lista.terminada === completada);
    
  }

}
