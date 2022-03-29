import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getByName, Pokemon } from "./Api";
import "./App.css";
import { MemoedPokemonTable } from "./pokemon-table";

const calculatePower = (pokemon: Pokemon) =>
  pokemon.hp +
  pokemon.attack +
  pokemon.defense +
  pokemon.special_attack +
  pokemon.special_defense +
  pokemon.speed;

let appRender = 0;

function App() {
  console.log(`app update =${appRender++}`);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [search, setSearchTerm] = useState("");

  useEffect(() => {
    getByName(search).then(setPokemonData);
  }, [search]);

  /**just using Memo for any component doesnt help
you need to focus on the props,functions too being passed to that component.
memo for props and callback for functions */
  const pokemonWithPower = useMemo(
    () =>
      pokemonData.map((p) => ({
        ...p,
        power: calculatePower(p),
      })),
    [pokemonData]
  );

  const [threshold, setThreshold] = useState(0);

  const countOverThreshold = useMemo(
    () => pokemonWithPower.filter((p) => p.power > threshold).length,
    [threshold, pokemonWithPower]
  );

  const onSetThreshold = useCallback(
    (evt) =>
      setThreshold(evt.target.value ? parseInt(evt.target.value, 10) : 0),
    []
  );

  const min = useMemo(() => Math.min(...pokemonWithPower.map((p) => p.power)), [
    pokemonWithPower,
  ]);

  const max = useMemo(() => Math.max(...pokemonWithPower.map((p) => p.power)), [
    pokemonWithPower,
  ]);

  const onSetSearch = useCallback((evt) => setSearchTerm(evt.target.value), []);

  return (
    <>
      <div className="top-bar">
        <div>Search</div>
        <input type="text" value={search} onChange={onSetSearch} />
        <div>Power threshold</div>
        <input type="text" value={threshold} onChange={onSetThreshold}></input>
        <div>Count over threshold:</div>
        <div>{countOverThreshold}</div>
      </div>
      <div className="two-column">
        <MemoedPokemonTable pokemon={pokemonWithPower} />
        <div>
          <div>Min:{min}</div>
          <div>Max:{max}</div>
        </div>
      </div>
    </>
  );
}

export default App;
