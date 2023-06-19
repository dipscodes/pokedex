import { useEffect, useState } from "react";
import ListingPage from "../ListingPage";
import DetailsPage from "../DetailsPage";

export default function Listing() {
  const [pokemon, setPokemon] = useState({});
  const [abilitiesList, setAbilitiesList] = useState([]);
  const [habitatList, setHabitatList] = useState([]);
  const [eggGroup, setEggGroup] = useState([]);
  const onClickPokemonCard = (pokemon) => {
    setPokemon(pokemon);
    console.log(pokemon);
  };

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
            <select className="bg-discord-secondary mr-6">{abilitiesList}</select>
          </div>
          <div className="flex flex-row items-center">
            <span className="mr-6">Habitat:</span>
            <select className="bg-discord-secondary mr-6">{habitatList}</select>
          </div>
          <div className="flex flex-row items-center">
            <span className="mr-6">Egg Groups:</span>
            <select className="bg-discord-secondary mr-6">{eggGroup}</select>
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        <ListingPage setPokemon={onClickPokemonCard}></ListingPage>
        <div className="w-4/6 bg-discord-text-color-1 overflow-y-scroll">
          <DetailsPage key={pokemon.name} pokemon={pokemon}></DetailsPage>
        </div>
      </div>
    </div>
  );
}
