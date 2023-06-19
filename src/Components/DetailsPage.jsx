import React, { useEffect, useState } from "react";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import DetailsTabs from "./DetailsTabs";

const DetailsPage = ({ pokemon, handleRefresh }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const pokemonID = pokemon.id;

  const capatalize = (string) => {
    return string[0].toUpperCase() + string.substring(1);
  }

  useEffect(() => {
    // localStorage.removeItem("pokemonList");
    if (localStorage.getItem("pokemonList") === null) localStorage.setItem("pokemonList", JSON.stringify({}));
    
    if (JSON.parse(localStorage.getItem("pokemonList"))[pokemonID] !== undefined) setBookmarked(true);
  }, [pokemonID]);

  const handleBookmark = () => {
    if (bookmarked) {
      const temp = JSON.parse(localStorage.getItem("pokemonList"));
      delete temp[pokemonID];
      localStorage.setItem("pokemonList", JSON.stringify(temp));
    }
    else {
      const temp = JSON.parse(localStorage.getItem("pokemonList"));
      temp[pokemonID] = pokemon;
      localStorage.setItem("pokemonList", JSON.stringify(temp));
    }
    setBookmarked(!bookmarked);
    if (handleRefresh) handleRefresh();
  };

  return JSON.stringify(pokemon) !== "{}" ? (
    <div className="hidden-scrollbar w-full h-auto bg-discord-text-color-1 flex flex-col pt-10">
      <div className="flex flex-row justify-center">
        <img
          src={pokemon.sprites.other.dream_world.front_default}
          alt={pokemon.name}
        />
      </div>
      <div className="flex flex-row justify-center mt-10">
        <div className="border-b-2 border-solid border-gray-400 pb-5 w-10/12 flex flex-row justify-between">
          <span className="text-4xl">#{pokemon.id}{" "}</span>
          <span className="text-4xl">
            {capatalize(pokemon.name)}
          </span>
          <div className="mt-3 cursor-pointer" onClick={() => handleBookmark()}>
            {(bookmarked) ? (<BsFillBookmarkFill size={30}></BsFillBookmarkFill>) : (<BsBookmark size={30}></BsBookmark>)}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center mt-5">
        <div className="w-10/12 flex flex-row justify-around px-10">
          <div>Height: {pokemon.height}</div>
          <div>Weight: {pokemon.weight}</div>
          <div>Order: {pokemon.order}</div>
          <div>Base Experience: {pokemon.base_experience}</div>
        </div>
      </div>
      <DetailsTabs pokemon={pokemon}/>
    </div>
  ) : (
    <></>
  );
};

export default DetailsPage;
