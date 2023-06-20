import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import loading from "./inf_loading.svg";

const FilteredListingPage = ({ setPokemon, fetchPokemonList }) => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    if (fetchPokemonList) setPokemonList(fetchPokemonList);
  }, [fetchPokemonList]);

  return (
    <div
      className="flex flex-col w-2/6 h-[calc(100vh-80px)] overflow-y-scroll break-words hidden-scrollbar bg-discord-text-color-1 border-r-2 border-solid border-gray-400"
      id="pokemonList"
    >
      {pokemonList.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onClickPokemonCard={() => setPokemon(pokemon)}
        ></PokemonCard>
      ))}
    </div>
  );
};

export default FilteredListingPage;
