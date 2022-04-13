import { useContext, useEffect, useMemo, useState } from "react";

import { Filter } from "../filter";
import { FilterTag } from "../filter-tag";
import { PokemonList } from "../pokemon-list";
import styles from "./game.module.css";
import pokemons from "../../data/pokemons.json";
import { elementContainsFilter, filterBasedOnTarget } from "./helpers";
import { randomIntFromInterval } from "../helpers";
import { PokemonContext } from "../context";

function Game() {
  const [filters, setFilters] = useState([]);
  const { chosenPokemon, setChosenPokemon } = useContext(PokemonContext);

  const filteredPokemons = useMemo(
    () => filterBasedOnTarget(filters, chosenPokemon, pokemons),
    [filters, chosenPokemon]
  );

  const selectFilter = (newFilter) => {
    const [attr, value] = newFilter.split(/-(.*)/s); // color-green, types-fairy
    setFilters([...filters, { name: attr, value }]);
  };

  useEffect(() => {
    const chosenPokemonIdx = randomIntFromInterval(0, pokemons.length - 1);
    setChosenPokemon(pokemons.at(chosenPokemonIdx));
    console.log({ chosenPokemonIdx });
  }, [setChosenPokemon]);

  return (
    <main className={styles.main}>
      {/* FILTERS */}
      <section className={styles.filter}>
        <section className={styles.selectable}>
          <Filter selectFilter={selectFilter} />
        </section>

        {/* SELECTED FILTERS */}
        <section className={styles.selected}>
          {filters.map((filter) => (
            <FilterTag
              key={`${filter.name}:${filter.value}`}
              name={filter.name}
              value={filter.value}
              isMatch={elementContainsFilter(filter, chosenPokemon)}
            />
          ))}
        </section>
      </section>

      {/* CARDS */}
      <PokemonList pokemons={filteredPokemons} />
    </main>
  );
}

export { Game };
