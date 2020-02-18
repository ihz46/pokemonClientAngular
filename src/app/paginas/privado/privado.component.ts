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
  urlRegex: any;

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

    //Inicializamos regex
    this.urlRegex = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;

    // Mensajes
    this.mensaje = 'Listado de pokemon disponibles:';

    this.tipoMensaje = 'primary';

    // Construimos el formulario:
    this.formulario = this.builder.group({
      // Definimos los formControl : input
      id: new FormControl(0),
      nombre: new FormControl(
        '', // valor inicial
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)] // validacines
      ),
      imagen: new FormControl(
        '', // valor inicial
        [Validators.required, Validators.pattern(this.urlRegex)],
      )
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
    this.formulario.get('imagen').setValue(pokemon.imagen);

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
        this.mensaje = 'Error al obtener el listado de pokemons';
        this.tipoMensaje = 'danger';
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
    this.formulario.get('imagen').setValue('');
    this.pokemonSeleccionado = new Pokemon();
  }

  eliminarPokemon(pokemon) {
    //Ventana modal para confirmar que se desea eliminar el pokemon
    let opcion = confirm('¿Estás seguro de eliminar el pokemon '.concat(pokemon.nombre).concat('?'));
    console.debug('Pokemon %o', pokemon)
    if (opcion) {
      this.pokemonService.deletePokemon(this.pokemonSeleccionado).subscribe(
        data => {
          console.debug('Datos obtenidos %o', data);
          this.mensaje = 'Se he eliminado correctamente el pokemon ' + this.pokemonSeleccionado.nombre + '.';
          this.tipoMensaje = 'success';
          this.obtenerListado();
        },

        error => {
          console.debug('Petición erronea %o', error);
          this.mensaje = 'Error al eliminar el pokemon';
          this.tipoMensaje = 'danger';
        },

        () => {
          console.debug('Finaliza la petición')
        }
      );
    }

  }

  // Método que servirá para realizar el submit del formulario (create y update)
  enviarFormulario(datosEnviados) {
    console.trace('Enviar formulario %o', datosEnviados);

    // Le metemos el nombre y la imagen al pokemon, independientemente si existe o no
    this.pokemon.nombre = (datosEnviados.nombre);
    this.pokemon.imagen = (datosEnviados.imagen);

    if (datosEnviados.id === 0) {

      // llamamos al service para crear
      this.pokemonService.createPokemon(this.pokemon).subscribe(
        data => {
          console.debug('Datos obtenidos %o', data);
          this.tipoMensaje = 'success';
          this.mensaje = 'Se he creado correctamente el pokemon ' + this.pokemon.nombre + '.';
          this.obtenerListado();
        },

        error => {
          console.debug('Petición erronea %o', error);
          this.mensaje = 'Error al crear el pokemon ' + this.pokemon.nombre + '.';
          this.tipoMensaje = 'danger';
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
          this.tipoMensaje = 'success';
          this.mensaje = 'Se he actualizado correctamente el pokemon ' + this.pokemonSeleccionado.nombre + '.';
          this.obtenerListado();
        },

        error => {
          console.debug('Petición erronea %o', error);
          this.mensaje = 'Error al actualizar el pokemon' + this.pokemon.nombre + '.';
          this.tipoMensaje = 'danger';
        },

        () => {
          console.debug('Finaliza la petición')
        }
      );

    }
  }//enviarFormulario(datosEnviados)

}//PrivadoComponent
