import { useEffect, useRef, useState } from "react";
import ListingPage from "../ListingPage";
import DetailsPage from "../DetailsPage";

export default function Listing() {
  const [pokemon, setPokemon] = useState({});
  const [abilitiesList, setAbilitiesList] = useState([]);
  const [habitatList, setHabitatList] = useState([]);
  const [eggGroup, setEggGroup] = useState([]);
  const [pokemonList, setPokemonList] = useState(null);
  const [refresh, setrefresh] = useState(0);
  const searching = useRef(false);
  const onClickPokemonCard = (pokemon) => {
    setPokemon(pokemon);
  };

  const onSearch = () => {
    const ability = document.getElementById('ability').value;
    const eggGroup = document.getElementById('egggroup').value;
    const habitat = document.getElementById('habitat').value;

    if (ability !== "None" || habitat !== "None" || eggGroup !== "None") {
      (async () => {
        searching.current = true;
        let pokemonsByAbility = null;
        let pokemonsByHabitat = null;
        let pokemonsByEggGroup = null;
        if (ability !== "None") {
          const searchedAbilityResp = await fetch(
            `https://pokeapi.co/api/v2/ability/${ability}`,
            { method: "GET" }
          );
          const abilitiesJSON = await searchedAbilityResp.json();
          pokemonsByAbility = abilitiesJSON.pokemon.map((pokemon) => pokemon.pokemon.name);
        }

        if (habitat !== "None") {
          const searchedHabitatResp = await fetch(
            `https://pokeapi.co/api/v2/pokemon-habitat/${habitat}`,
            { method: "GET" }
          );
          const habitatListJSON = await searchedHabitatResp.json();
          pokemonsByHabitat = habitatListJSON.pokemon_species.map((pokemon) => pokemon.name);
        }

        if (eggGroup !== "None") {
          const searchedEggGroupResp = await fetch(
            `https://pokeapi.co/api/v2/egg-group/${eggGroup}`,
            { method: "GET" }
          );
          const eggGroupJson = await searchedEggGroupResp.json();
          pokemonsByEggGroup = eggGroupJson.pokemon_species.map((pokemon) => pokemon.name);
        }

        const listOfListsOfPokemons = [pokemonsByAbility, pokemonsByHabitat, pokemonsByEggGroup];

        const validList = await Promise.all(listOfListsOfPokemons.map(async (pokemonName) => {
          const pokemonData = await (() => {
            if (pokemonName !== null) return pokemonName;
            for (const itr of listOfListsOfPokemons) {
              if (itr !== null) return itr;
            }
          })();
          return pokemonData;
        }));

        let commonElements = validList[0].filter(element => validList[1].includes(element));
        commonElements = commonElements.filter(element => validList[2].includes(element));

        

        let commonPokemons = await Promise.all(commonElements.map(async (pokemonName) => {
          const pokemonData = await (async () => {
            const apiResponseByPokemonName = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            
            if (apiResponseByPokemonName.status === 404) {
              return null;
            }
            else {
              const apiResponseInJson = await apiResponseByPokemonName.json();
              return apiResponseInJson;
            }
          })();
          return pokemonData;
        }));

        commonPokemons = commonPokemons.filter((elm) => elm !== null);
        setPokemonList(commonPokemons);
      })();
    }
  }

  useEffect(() => {
    (async () => {
      const abilitiesPromise = await fetch(
        "https://pokeapi.co/api/v2/ability?limit=1000",
        { method: "GET" }
      );
      const abilitiesJSON = await abilitiesPromise.json();
      const listOfAbilities = abilitiesJSON.results.map((abilityObj) => {
        return <option value={abilityObj.name}>{abilityObj.name}</option>;
      });
      listOfAbilities.unshift(<option value="None">None</option>);
      setAbilitiesList(listOfAbilities);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const habitatListPromise = await fetch(
        "https://pokeapi.co/api/v2/pokemon-habitat/",
        { method: "GET" }
      );
      const habitatListJSON = await habitatListPromise.json();
      const listOfHabitats = habitatListJSON.results.map((habitatObj) => {
        return <option value={habitatObj.name}>{habitatObj.name}</option>;
      });
      listOfHabitats.unshift(<option value="None">None</option>);
      setHabitatList(listOfHabitats);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const eggGroupPromise = await fetch(
        "https://pokeapi.co/api/v2/egg-group/",
        { method: "GET" }
      );
      const eggGroupJSON = await eggGroupPromise.json();
      const listOfEggGroup = eggGroupJSON.results.map((eggGroupObj) => {
        return <option value={eggGroupObj.name}>{eggGroupObj.name}</option>;
      });
      listOfEggGroup.unshift(<option value="None">None</option>);
      setEggGroup(listOfEggGroup);
    })();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="topbar h-[80px] min-h-[80px] bg-discord-secondary">
        <div className="h-[80px] flex flex-row justify-center w-auto text-slate-200">
          <div className="flex flex-row items-center">
            <span className="mr-6">Ability: </span>
            <select id="ability" className="bg-discord-secondary mr-6">{abilitiesList}</select>
          </div>
          <div className="flex flex-row items-center">
            <span className="mr-6">Habitat:</span>
            <select id='habitat' className="bg-discord-secondary mr-6">{habitatList}</select>
          </div>
          <div className="flex flex-row items-center">
            <span className="mr-6">Egg Groups:</span>
            <select id="egggroup" className="bg-discord-secondary mr-6">{eggGroup}</select>
          </div>
          <div className="flex flex-row items-center">
            <button className="bg-discord-button-color hover:bg-discord-button-color-hover text-white font-bold py-2 px-4 rounded-full transition-all duration-100 ease-linear shadow-md hover:shadow-sm" onClick={() => onSearch()}>Search</button>
          </div>
          <div className="flex flex-row items-center">
            <button className="bg-discord-button-color hover:bg-discord-button-color-hover text-white font-bold py-2 px-4 rounded-full transition-all duration-100 ease-linear shadow-md hover:shadow-sm ml-5" onClick={() => setrefresh((prev) => (prev + 1) % 2)}>Refresh</button>
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        <ListingPage key={refresh} fetchPokemonList={pokemonList} setPokemon={onClickPokemonCard} isSearching={searching.current}></ListingPage>
        <div className="w-4/6 bg-discord-text-color-1 overflow-y-scroll">
          <DetailsPage key={pokemon.name} pokemon={pokemon}></DetailsPage>
        </div>
      </div>
    </div>
  );
}
