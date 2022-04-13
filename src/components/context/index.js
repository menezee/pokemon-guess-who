import { createContext, useMemo, useState } from "react";

import pokemons from "../../data/pokemons.json";
import { randomIntFromInterval } from "../helpers";

export const PokemonContext = createContext();
function PokemonContextProvider({ children }) {
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(null);
  const [chosenPokemon, setChosenPokemon] = useState(null);

  return (
    <PokemonContext.Provider value={{ chosenPokemon, setChosenPokemon }}>
      {children}
    </PokemonContext.Provider>
  );
}

export default PokemonContextProvider;
