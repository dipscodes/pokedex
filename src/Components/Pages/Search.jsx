import { useState } from "react";
import { FcSearch } from "react-icons/fc"
import DetailsPage from "../DetailsPage";


export default function Search() {
  const [searching, setSearching] = useState(false);
  const [pokemon, setPokemon] = useState({});
  const [pokemonName, setPokemonName] = useState('');

  const handleInputChange = (e) => {
    setPokemonName(e.target.value);
  };

  const handleSearch = () => {
    if (pokemonName.trim() !== '') {
      onSearch(pokemonName.trim());
    }
  };

  const onSearch = (pokemonName) => {
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
    <div className="text-text-generic-color flex flex-col w-full">
      <div className="flex flex-row justify-center shadow-sm shadow-black h-[80px] bg-discord-tertiary items-center">
        <input
          type="text"
          value={pokemonName}
          onChange={handleInputChange}
          className="h-[45px] bg-slate-200 relative m-0 -mr-0.5 block min-w-0 rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon1"
        />
        <button
          onClick={handleSearch}
          className="h-[45px] bg-slate-200 relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
        >
          <FcSearch size={30} />
        </button>
      </div>
      <div className="w-full">
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
    </div>
  );
}