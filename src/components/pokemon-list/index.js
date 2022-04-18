import styles from "./pokemon-list.module.css";
import { PokemonCard } from "../pokemon-card";

function PokemonList({ pokemons, guessPokemon }) {
  return (
    <section className={styles.list}>
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.name}
          name={pokemon.name}
          sprite={pokemon.sprite}
          color={pokemon.color}
          onClick={() => guessPokemon(pokemon)}
        />
      ))}
    </section>
  );
}

export { PokemonList };
