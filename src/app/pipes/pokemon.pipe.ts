import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonFiltro'
})
export class PokemonPipe implements PipeTransform {


  /**
   * 
   * @param datos el array que se va a iterar
   * @param pokemonBuscado el parámetro de búsqueda
   * @param habilidades el array de habilidades escogidas para buscar
   */
  transform(datos: any, pokemonBuscado: string): any {

    let resultado = datos;

    //Busqueda por nombre
    if (pokemonBuscado && '' !== pokemonBuscado.trim()) {
      pokemonBuscado = pokemonBuscado.toLowerCase();

      //Filtramos el array de datos
      resultado = resultado.filter((elemento) => {

        //Cogemos de cada pokemon las habilidades y elegimos solo el nombre.
        const nombreHabilidades = elemento.habilidades.reduce((previous, current) => {
          return previous.concat(current.nombre);
        }, "");

        const parametrosBuscados = (elemento.nombre + nombreHabilidades).toLowerCase();
        return parametrosBuscados.includes(pokemonBuscado);
        console.debug(resultado);
      });
    }

    return resultado;
  }



}
