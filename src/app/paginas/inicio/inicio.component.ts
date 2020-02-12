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

  constructor(private pokemonService: PokemonService) {
    console.trace('InicioComponent constructor')
    this.listaPokemon = new Array<Pokemon>();
    this.pokemonSeleccionado = new Pokemon(0, '', '', '');
  }//constructor()

  ngOnInit() {
    console.trace('InicioComponent ngOnInit');

    this.obtenerListado();
  }//ngOnInit

  //Método para obtener todos los pokemon
  obtenerListado() {
    this.pokemonService.getAll().subscribe(

      data => {
        console.debug(data);
        this.listaPokemon = data;

      },

      error => {

      },
      () => {
        console.trace('Estamos intentando obtener el listado');
      }
    )
  }


  seleccionarPokemon(pokemon) {
    console.log('Click seleccionarPokemon');
    this.pokemonSeleccionado = pokemon;
    console.log(this.pokemon);
  }//seleccionarPokemon

}//InicioComponent
