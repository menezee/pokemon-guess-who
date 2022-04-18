import { useMemo, useState } from 'react';

import { Filter, FilterTag, Header } from '../';
import { randomIntFromInterval } from '../helpers';
import { calculateScore, elementContainsFilter, filterBasedOnTarget, getHint, parseFilterInput } from './helpers';
import { PokemonList } from '../pokemon-list';

import pokemons from '../../data/pokemons.json';
import styles from './app.module.css';
import getMessage from '../messages';

export default function App() {
  const [chosenPokemonIdx, setChosenPokemonIdx] = useState(() => randomIntFromInterval(0, pokemons.length - 1));
  const chosenPokemon = pokemons.at(chosenPokemonIdx);
  const [startTime, setStartTime] = useState(Date.now());
  const [filters, setFilters] = useState([]);
  const [amountOfHintsUsed, setAmountOfHintsUsed] = useState(0);
  
  const filteredPokemons = useMemo(
    () => filterBasedOnTarget(filters, chosenPokemon, pokemons),
    [filters, chosenPokemon]
  );
  
  const addFilter = newFilter => {
    const { attr, value } = parseFilterInput(newFilter);
    
    const isDuplicate = filters.some(filter => filter.name === attr && filter.value === value);
    if (isDuplicate) {
      alert(getMessage('duplicated-filter'));
    } else {
      setFilters([...filters, { name: attr, value }]);
    }
  };
  const reset = () => {
    setFilters([]);
    setChosenPokemonIdx(randomIntFromInterval(0, pokemons.length - 1));
    setStartTime(Date.now());
    setAmountOfHintsUsed(0);
  };
  
  const guessPokemon = pokemon => {
    const confirmed = window?.confirm(getMessage('submission-confirmation', { pokemonName: pokemon.name }));
    if (confirmed) {
      const { score, reason } = calculateScore(filters.length, startTime, amountOfHintsUsed);
      
      if (pokemon.name === chosenPokemon.name) {
        alert(getMessage('successful-submission', { score, reason }));
      } else {
        alert(getMessage('unsuccessful-submission', { pokemonName: chosenPokemon.name, reason }));
      }
  
      reset();
    }
  };
  
  const handleGetHint = () => {
    const hint = getHint(filters, chosenPokemon);
    if (hint === null) {
      alert(getMessage('no-more-tips'));
    } else {
      setAmountOfHintsUsed(amountOfHintsUsed + 1);
      addFilter(hint);
    }
  };
  
  return (
    <>
      <Header reset={reset} chosenPokemon={chosenPokemon} getHint={handleGetHint}/>
      <main className={styles.main}>
        
        <section className={styles.filter}>
  
          {/* FILTERS DROPDOWN */}
          <section className={styles.selectable}>
            <Filter selectFilter={addFilter} selectedFilters={filters} />
          </section>
  
          {/* SELECTED FILTERS TAGS */}
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
  
        {/* AMOUNT LEFT */}
        <section className={styles.disclaimer}>
          Ainda faltam {filteredPokemons.length}
        </section>
  
        {/* CARDS */}
        <PokemonList pokemons={filteredPokemons} guessPokemon={guessPokemon} />
      </main>
    </>
  );
}
