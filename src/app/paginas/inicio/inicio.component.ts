import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/model/pokemon';
import { Mensaje } from 'src/app/model/mensaje';


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

  // Mensaje
  mensaje: Mensaje;

  //Busqueda por nombre
  pokemonBuscado: string;

  //Pintamos el pokemon en gris
  pokemonGris: boolean;

  constructor(private pokemonService: PokemonService) {
    console.trace('InicioComponent constructor')
    this.listaPokemon = new Array<Pokemon>();
    this.habilidades = new Set<any>();
    this.pokemonBuscado = '';

    this.pokemonSeleccionado = new Pokemon();
    // Mensajes
    this.mensaje = new Mensaje();

    this.mensaje.mensaje = 'Bienvenido a la app de Pokemon';

    this.pokemonGris = true;

  }//constructor()

  ngOnInit() {
    console.trace('InicioComponent ngOnInit');

    this.comprobarPokemon(this.pokemonSeleccionado);

    //Mostramos el listado de pokemon
    this.obtenerListado();



    //this.pokemonSeleccionado = new Pokemon();

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
        console.debug('habilidades %o', this.habilidades);
        this.pokemonGris = true;
        this.pokemonSeleccionado = data[0];
      },

      error => {
        console.warn('Error al obtener el listado de pokemon');
        this.mensaje.mensaje = 'Error al obtener el listado de pokemon';
        this.mensaje.tipoMensaje = 'danger';
      },
      () => {
        console.trace('Estamos intentando obtener el listado');
      }
    )
  }//obtenerListado()


  seleccionarPokemon(pokemon) {
    console.log('Click seleccionarPokemon');
    this.pokemonGris = false;
    this.pokemonSeleccionado = pokemon;

  }//seleccionarPokemon

}//InicioComponent
