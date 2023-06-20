import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";

const BookmarksListingPage = ({ setPokemon, setRefresh }) => {
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        setPokemonList(JSON.parse(localStorage.getItem("pokemonList")));
    }, []);

    return (
        <div
            className="flex flex-col w-2/6 h-[calc(100vh-80px)] overflow-y-scroll break-words hidden-scrollbar bg-discord-text-color-1 border-r-2 border-solid border-gray-400"
            id="pokemonList"
        >
            {Object.keys(pokemonList).map((pokemonName) => (
                <PokemonCard 
                    key={pokemonList[pokemonName].id} 
                    pokemon={pokemonList[pokemonName]} 
                    onClickPokemonCard={() => setPokemon(pokemonList[pokemonName])} 
                />
            ))}
        </div>
    );
};

export default BookmarksListingPage;
