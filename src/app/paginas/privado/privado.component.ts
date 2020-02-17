import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/model/pokemon';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-privado',
  templateUrl: './privado.component.html',
  styleUrls: ['./privado.component.scss']
})
export class PrivadoComponent implements OnInit {

  // Pokemon
  listaPokemon: Array<any>;
  pokemonSeleccionado: Pokemon;
  pokemon: Pokemon;

 // Formulario

  formulario: FormGroup;

  // Mensaje
  mensaje: string;
  tipoMensaje: string;


  constructor(private pokemonService: PokemonService, private builder: FormBuilder) {
    // Inicializamos la lista
    this.listaPokemon = [];

     // Inicializamos el pokemon seleccionado
    this.pokemonSeleccionado = new Pokemon();

    //Inicializamos el pokemon que vamos a utilizar 
    this.pokemon = new Pokemon();


    // Construimos el formulario:
    this.formulario = this.builder.group({
      // Definimos los formControl : input
      id: new FormControl(0),
      nombre: new FormControl(
        '', // valor inicial
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)] // validacines
      ),
    });

  }// Constructor()

  ngOnInit() {

    console.trace('ngOnInit: cargamos el listado de pokemons');
    this.obtenerListado();

  }// ngOnInit()

  seleccionarPokemon(pokemon) {
    console.debug('seleccionarPokemon %o', pokemon)
    this.pokemonSeleccionado = pokemon;
    this.formulario.get('id').setValue(pokemon.id);
    this.formulario.get('nombre').setValue(pokemon.nombre);

  }// seleccionarPokemon(pokemon)

  // Método para obtener todos los pokemon
  obtenerListado() {
    this.pokemonService.getAll().subscribe(

      data => {
        console.debug(data);
        this.listaPokemon = data;

      },

      error => {
        console.warn('Error al obtener el listado de pokemon');
      },
      () => {
        console.trace('Estamos intentando obtener el listado');
      }
    )
  }// obtenerListado()

  // Método que sirve para limpiar el formulario
  limpiarFormulario() {
    console.trace('Limpiar formulario')
    this.formulario.get('nombre').setValue('');
    this.formulario.get('id').setValue(0);
    this.pokemonSeleccionado = new Pokemon();
  }

  eliminarPokemon(pokemon){
    this.pokemonService.deletePokemon(this.pokemonSeleccionado).subscribe(
      data => {
        console.debug('Datos obtenidos %o', data);
        this.obtenerListado();
      },

      error => {
        console.debug('Petición erronea %o', error);
      },

      () => {
        console.debug('Finaliza la petición')
      }
    );
  }
  enviarFormulario(datosEnviados) {
    console.trace('Enviar formulario %o', datosEnviados);

    // Le metemos el nombre al pokemon, independientemente si existe o no
    this.pokemon.nombre = (datosEnviados.nombre);
    if (datosEnviados.id === 0) {
     
      // llamamos al service para crear
      this.pokemonService.createPokemon(this.pokemon).subscribe(
        data => {
          console.debug('Datos obtenidos %o', data);
          this.obtenerListado();
        },

        error => {
          console.debug('Petición erronea %o', error);
        },

        () => {
          console.debug('Finaliza la petición')
        }
      );
    } else {
      // Llamamos al service para actualizar

      //Le metemos los datos al nuevo pokemon
      this.pokemon.id = (datosEnviados.id);
      this.pokemonService.updatePokemon(this.pokemon).subscribe(
        data => {
          console.debug('Datos obtenidos %o', data);
          this.obtenerListado();
        },

        error => {
          console.debug('Petición erronea %o', error);
        },

        () => {
          console.debug('Finaliza la petición')
        }
      );
      
    }
  }//enviarFormulario(datosEnviados)

}//PrivadoComponent
