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

  const onSearch = () => {
    localStorage.setItem("pokemonList", JSON.stringify({}));
    handleRefresh();
  }

  return (
    <div key={toggle} className="w-screen h-screen flex flex-col">
      <div className="w-full h-[80px] h-min-[80px] bg-discord-secondary flex flex-row justify-center items-center">
        <div className="text-white text-4xl mr-5"><span>Bookmarks</span></div>
        <div className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-100 ease-linear shadow-md hover:shadow-sm ml-5 cursor-pointer" onClick={() => onSearch()}><button>Clear all Bookmarks</button></div>
      </div>
      <div className="flex flex-row">
        <BookmarksListingPage setRefresh={handleRefresh} setPokemon={onClickPokemonCard}></BookmarksListingPage>
        <div className="w-4/6 bg-discord-text-color-1 overflow-y-scroll">
          <DetailsPage key={pokemon.id} handleRefresh={handleRefresh} pokemon={pokemon}></DetailsPage>
        </div>
      </div>
      
    </div>
  );
}