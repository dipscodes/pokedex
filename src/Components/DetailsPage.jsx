import React, { useState } from 'react';

const DetailsPage = ({ pokemon, onBookmark }) => {
  console.log(pokemon);
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    onBookmark(pokemon);
  };

  return (
    (JSON.stringify(pokemon) !== '{}') ? (
      <div>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    </div>
    ) : (
      <></>
    )
  );
};

export default DetailsPage;