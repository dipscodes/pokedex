const PokemonCard = ({ pokemon }) => {
  console.log(pokemon);
  
  const getConcatenatedPokemonTypes = () => {
    let concatenatedTypes = "";
    pokemon.types.forEach(element => {
        concatenatedTypes += element.type.name + " ";
    });
    return concatenatedTypes;
  }

  return (
    <div className="flex flex-row justify-center my-3">
        <div className="w-2/4 bg-white h-[150px] flex flex-row items-center border-discord-sidebar border-solid rounded-lg border-2 cursor-pointer">
            <div className="w-2/6 flex justify-center">
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
    </div>
    
  );
};

export default PokemonCard;
