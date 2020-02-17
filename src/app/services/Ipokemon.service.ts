import { Observable } from "rxjs";
import { Pokemon } from '../model/pokemon';

export interface IPokemonService {

    /**
     * Recuperamos los datos en JSON de todos los pokemon
     * 
     */
    getAll(): Observable<Pokemon>;

    /**
     * Recuperamos los datos en JSON de un pokemon buscando el nombre
     * @param nombre: string, nombre del pokemon buscado
     * 
     */
    getPokemon(nombre: string): Observable<Pokemon>;

    /**
     * Recupera un JSON con las caracteristicas de un Pokemon
     * @param id: number - es el identificador de un pokemon
     * @see GET /api/v2/characteristic/{id}/
     */
    getCaracteristicas(id: number): Observable<Pokemon>;

    /**
     * Recupera el detalle de un Pokemon
     * @param id del pokemon que se quiere recuperar
     * @return pokemon encontrado
     */
    getById(id: number): Observable<Pokemon>;

    /**
     * Crea un pokemon 
     * @param pokemon 
     * @return Pokemon creado
     */
    createPokemon(pokemon: Pokemon): Observable<Pokemon>;

    /**
     * Actualiza el pokemon 
     * @param pokemon 
     * @return pokemon actualizado
     */
    updatePokemon(pokemon: Pokemon): Observable<Pokemon>;

    /**
     * Elimina un pokemon
     * @param pokemon 
     * @return pokemon eliminado
     */
    deletePokemon(pokemon: Pokemon): Observable<Pokemon>;
}