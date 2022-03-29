import React from 'react';
import { Pokemon } from './Api';

interface PokemonWithPower extends Pokemon {
  power: number;
}

let tableRender = 0;
const PokemonTable: React.FunctionComponent<{
  pokemon: PokemonWithPower[];
}> = ({ pokemon }) => {
  console.log(`table update =${tableRender++}`);
  return (
    <div className="two-column">
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Type</td>
            <td colSpan={6}>Stats</td>
            <td>Power</td>
          </tr>
        </thead>
        <tbody>
          {pokemon.map((x) => {
            return (
              <tr key={x.id}>
                <td>{x.id}</td>
                <td>{x.name}</td>
                <td>{x.type.join(',')}</td>
                <td>{x.hp}</td>
                <td>{x.attack}</td>
                <td>{x.defense}</td>
                <td>{x.special_attack}</td>
                <td>{x.special_defense}</td>
                <td>{x.speed}</td>
                <td>{x.power}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const MemoedPokemonTable = React.memo(PokemonTable);
