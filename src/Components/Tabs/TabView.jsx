import { useEffect, useState } from "react";

function TabView({ tab, pokemonData }) {
  const [extraData, setExtraData] = useState({});

  useEffect(() => {
    (async () => {
      const speciesResp = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonData.name}`
      );
      const speciesDataInJson = await speciesResp.json();
      setExtraData(speciesDataInJson);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const capatalize = (string) => {
    return string[0].toUpperCase() + string.substring(1);
  };

  const getConcatenatedPokemonTypes = (types) => {
    let concatenatedTypes = "";
    types.forEach((element, index) => {
      concatenatedTypes +=
        capatalize(element.type.name) +
        (index !== types.length - 1 ? ", " : "");
    });
    return concatenatedTypes;
  };

  const getConcatenatedPokemonAbitlies = (abilities) => {
    let concatenatedTypes = "";
    abilities.forEach((element, index) => {
      concatenatedTypes +=
        capatalize(element.ability.name) +
        (index !== abilities.length - 1 ? ", " : "");
    });
    return concatenatedTypes;
  };

  function dataToVisualize() {
    if (tab === "stats") {
      return (
        <div className="flex flex-col">
          {pokemonData.stats.map((statsObj) => {
            return (
              <div key={capatalize(statsObj.stat.name)} className="w-[300px] flex flex-row justify-between">
                <span>{capatalize(statsObj.stat.name)}</span> <span>{statsObj.base_stat}</span>
              </div>
            );
          })}
        </div>
      );
    } else if (tab === "moves") {
      return (
        <ul>
          {pokemonData.moves.map((pokemonMoveObj) => {
            return (
              <li key={pokemonMoveObj.move.name}>
                {capatalize(pokemonMoveObj.move.name)}
              </li>
            );
          })}
        </ul>
      );
    } else if (tab === "helditems") {
      return (
        <ul>
          {pokemonData.held_items.map((heldItemObj) => {
            return (
              <li key={heldItemObj.item.name}>
                {capatalize(heldItemObj.item.name)}
              </li>
            );
          })}
        </ul>
      );
    } else if (tab === "basics") {
      return JSON.stringify(extraData) !== "{}" ? (
        <div className="">
          <div className="about flex flex-col">
            <div className="w-[300px] flex flex-row justify-between">
              <span>Order: </span> <span>{pokemonData.order}</span>
            </div>
            <div className="w-[300px] flex flex-row justify-between">
              <span>Height: </span> <span>{pokemonData.height}</span>
            </div>
            <div className="w-[300px] flex flex-row justify-between">
              <span>Weight: </span> <span>{pokemonData.weight}</span>
            </div>
            <div className="w-[300px] flex flex-row justify-between">
              <span>Shape: </span> <span>{capatalize(extraData.shape.name)}</span>
            </div>
            <div className="w-[300px] flex flex-row justify-between">
              <span>Base Experience: </span> <span>{pokemonData.base_experience}</span>
            </div>
            <div className="w-[300px] flex flex-row justify-between">
              <span>Types: </span>{" "}
              <span>{getConcatenatedPokemonTypes(pokemonData.types)}</span>
            </div>
            <div className="w-[300px] flex flex-row justify-between">
              <span>Abilities: </span>{" "}
              <span>
                {getConcatenatedPokemonAbitlies(pokemonData.abilities)}
              </span>
            </div>
            <div className="w-[300px] flex flex-row justify-between">
              <span>Evolves from: </span>{" "}
              <span>
                {extraData.evolves_from_species
                  ? extraData.evolves_from_species.name
                  : "No One"}
              </span>
            </div>
          </div>
          <div className="breeding"></div>
        </div>
      ) : (
        <></>
      );
    }
  }
  return (
    <div className="border-solid border-text-generic-color-muted w-10/12 border-t-2 flex flex-col items-center pt-5">
      {dataToVisualize()}
    </div>
  );
}

export default TabView;
