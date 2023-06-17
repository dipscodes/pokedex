import { useState } from "react";
import SearchPage from "../SearchPage";
import DetailsPage from "../DetailsPage";

export default function Search() {
  const [searching, setSearching] = useState(false);
  const [pokemon, setPokemon] = useState({});

  const handleSearch = (pokemonName) => {
    setSearching(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);  
        setPokemon(data);
        setSearching(false);
      })
      .catch((error) => {
        setSearching(false);
        console.error(error);
      });

  }

  return (
    <div className="page-common text-text-generic-color flex flex-row justify-center">
      <SearchPage onSearch={handleSearch} />
        {searching ? (
        <p>Loading...</p>
      ) : (
        <>
          <DetailsPage
            pokemon={pokemon} // Display details for the first Pokemon in the list
          />
        </>
      )}
    </div>
  );
}