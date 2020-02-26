import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPokemonService } from './Ipokemon.service';
import { Observable } from 'rxjs';
import { Pokemon } from '../model/pokemon';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService implements IPokemonService {

  constructor(private http: HttpClient) {
    console.trace('PokemonService constructor');
  }// Constructor


  // Creamos un pokemon
  createPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const url = environment.ENDPOINT + 'pokemon/';
    return this.http.post<Pokemon>(url, pokemon);

  }

  // Eliminamos un pokemon
  deletePokemon(pokemon: Pokemon): Observable<Pokemon> {
    const url = environment.ENDPOINT + `pokemon/${pokemon.id}/`;
    console.debug(url);
    return this.http.delete<Pokemon>(url);
  }

  // Actualizamos un pokemon
  updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    const url = environment.ENDPOINT + `pokemon/${pokemon.id}/`;
    return this.http.put<Pokemon>(url, pokemon);
  }

  //Obtenemos el listado de todos los pokemons
  getAll(): Observable<any> {
    const url = environment.ENDPOINT + 'pokemon/';
    console.trace('PokemonService getAll ' + url);
    return this.http.get(url);
  }

  //Pasamos como parámetro una parte del nombre 
  getPokemon(nombre: string): Observable<any> {

    const url = `https://pokeapi.co/api/v2/pokemon/${nombre}/`;
    console.trace('PokemonService getPokemon ' + url);
    return this.http.get(url);
  }
  getCaracteristicas(id: number): Observable<Pokemon> {
    throw new Error("Method not implemented.");
  }

  getById(id: number): Observable<Pokemon> {
    throw new Error("Method not implemented.");
  }

  //Habilidades

  getAllHabilidades(): Observable<any> {
    const url = environment.ENDPOINT + '/habilidad/';
    console.trace('PokemonService getAllHabilidades ' + url);
    return this.http.get(url);
  }

}
