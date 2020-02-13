import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/model/pokemon';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  listaPokemon: Array<Pokemon>;
  pokemonSeleccionado: Pokemon;
  habilidades: Set<any>;
  hayPokemon: boolean;
  mensaje: string;

  //Busqueda por nombre
  pokemonBuscado: string;

  constructor(private pokemonService: PokemonService) {
    console.trace('InicioComponent constructor')
    this.listaPokemon = new Array<Pokemon>();
    this.habilidades = new Set<any>();
    this.pokemonBuscado = '';
    this.mensaje = "Este es el listado de pokemons: "

  }//constructor()

  ngOnInit() {
    console.trace('InicioComponent ngOnInit');

    //Mostramos el listado de pokemon
    this.obtenerListado();


  }//ngOnInit

  comprobarPokemon(pokemon) {
    if (pokemon != '' || typeof pokemon != undefined) {
      this.hayPokemon = true;
    };
    return this.hayPokemon;
  }

  //Método para obtener todos los pokemon
  obtenerListado() {
    this.pokemonService.getAll().subscribe(

      data => {
        console.debug(data);
        this.listaPokemon = data;

        this.habilidades = data.reduce((previous, currently, index, array) => {
          return previous.concat(currently.habilidades);
        }, []);

        console.debug('habilidades %o', this.habilidades)
      },

      error => {
        console.warn('Error al obtener el listado de pokemon');
      },
      () => {
        console.trace('Estamos intentando obtener el listado');
      }
    )
  }//obtenerListado()

  comprobarBusqueda() {

  }

  seleccionarPokemon(pokemon) {
    console.log('Click seleccionarPokemon');
    this.pokemonSeleccionado = pokemon;

  }//seleccionarPokemon

}//InicioComponent
