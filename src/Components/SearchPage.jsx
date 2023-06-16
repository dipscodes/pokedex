import { useState } from "react";

const SearchPage = ({ onSearch }) => {
  const [pokemonName, setPokemonName] = useState('');

  const handleInputChange = (e) => {
    setPokemonName(e.target.value);
  };

  const handleSearch = () => {
    if (pokemonName.trim() !== '') {
      onSearch(pokemonName.trim());
    }
  };

  return (
    <div>
      <input type="text" value={pokemonName} onChange={handleInputChange} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchPage;