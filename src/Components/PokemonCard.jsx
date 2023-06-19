const PokemonCard = ({ pokemon, onClickPokemonCard }) => {  
  const getConcatenatedPokemonTypes = () => {
    let concatenatedTypes = "";
    pokemon.types.forEach(element => {
        concatenatedTypes += element.type.name + " ";
    });
    return concatenatedTypes;
  }

  return (
    (JSON.stringify(pokemon) !== '{}') ? 
    (<div className="flex flex-row justify-center my-3">
        <div className="w-[400px] bg-white h-[150px] flex flex-row items-center border-discord-sidebar border-solid rounded-lg border-2 cursor-pointer" onClick={() => onClickPokemonCard()}>
            <div className="w-2/6 h-16 flex justify-center border-r-2 border-gray-400 border-solid items-center">
                <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="h-auto"
                />
            </div>
            <div className="w-4/6 flex justify-center flex-col items-center">
                <div>
                <span>Name: {pokemon.name}</span>
                </div>

                <div>
                <span>Types: {getConcatenatedPokemonTypes()}</span>
                </div>
                
            </div>
            </div>
    </div>) : (<></>)
    
  );
};

export default PokemonCard;
