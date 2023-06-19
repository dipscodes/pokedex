import { useState } from "react";
import DetailsPage from "../DetailsPage";
import BookmarksListingPage from "../BookmarksListingPage";

export default function Listing() {
  const [pokemon, setPokemon] = useState({});
  const [toggle, setToggle] = useState(0);
  const onClickPokemonCard = (pokemon) => {
    setPokemon(pokemon);
  }

  const handleRefresh = () => {
    setToggle((prev) => (prev + 1) % 2);
  }
  return (
    <div key={toggle} className="w-screen h-screen flex flex-row">
      <BookmarksListingPage setRefresh={handleRefresh} setPokemon={onClickPokemonCard}></BookmarksListingPage>
      <div className="w-4/6 h-screen bg-discord-text-color-1 overflow-y-scroll">
        <DetailsPage key={pokemon.id} handleRefresh={handleRefresh} pokemon={pokemon}></DetailsPage>
      </div>
    </div>
  );
}