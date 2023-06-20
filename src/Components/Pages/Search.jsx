import { useState } from "react";
import { FcSearch } from "react-icons/fc"
import PokemonCard from "../PokemonCard";
import DetailsPage from "../DetailsPage";
import loading from "../loading.svg";


export default function Search() {
  const [searching, setSearching] = useState(false);
  const [pokemon, setPokemon] = useState({});
  const [pokemonName, setPokemonName] = useState('');

  const handleInputChange = (e) => {
    setPokemonName(e.target.value);
  };

  const handleSearch = () => {
    if (pokemonName.trim() !== '') {
      onSearch(pokemonName.trim().toLowerCase());
    }
  };

  const onSearch = (pokemonName) => {
    const errorDiv = document.getElementById('error-div');
    errorDiv.style.display = 'none';
    setSearching(true);
    setPokemon({});
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        if(response.status === 404)
          throw new Error('No pokemon found by name');
        else
          return response;
      })
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data);
        setSearching(false);
      })
      .catch((error) => {
        setSearching(false);
        errorDiv.style.display = 'block';
        errorDiv.innerText = JSON.stringify({message: "No Pokemon was found."});
      });
  }

  return (
    <div className="flex flex-col w-full h-screen bg-discord-text-color-1">
      <div className="flex flex-row justify-center shadow-sm shadow-black h-[80px] bg-discord-tertiary items-center min-h-[80px]">
        <input
          type="text"
          value={pokemonName}
          onChange={handleInputChange}
          className="h-[45px] bg-slate-200 relative m-0 -mr-0.5 block min-w-0 rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-white focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
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
          <div className='h-full w-full flex flex-row justify-center items-center'>
            <img src={loading} alt="loading"/>
          </div>
        ) : (
          <>
            <PokemonCard pokemon={pokemon}></PokemonCard>
          </>
        )}
        <div id='error-div' className='hidden'></div>
      </div>
      <div className="w-full h-auto overflow-y-scroll">
        <DetailsPage pokemon={pokemon}></DetailsPage>
      </div>
    </div>
  );
}