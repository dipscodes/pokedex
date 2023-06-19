import { useState } from "react";
import ListingPage from "../ListingPage";
import DetailsPage from "../DetailsPage";

export default function Listing() {
  const [pokemon, setPokemon] = useState({});
  const onClickPokemonCard = (pokemon) => {
    setPokemon(pokemon);
  }
  return (
    <div className="w-screen h-screen flex flex-row">
      <ListingPage setPokemon={onClickPokemonCard}></ListingPage>
      <div className="w-4/6 h-screen bg-discord-text-color-1 overflow-y-scroll">
        <DetailsPage key={pokemon.name} pokemon={pokemon}></DetailsPage>
      </div>
    </div>
  );
}