import React, { useState } from 'react';

const DetailsPage = ({ pokemon, onBookmark }) => {
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    onBookmark(pokemon);
  };

  return (
    <div>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.image} alt={pokemon.name} />
      {/* Display other details */}
      <button onClick={handleBookmark}>
        {bookmarked ? 'Remove Bookmark' : 'Bookmark'}
      </button>
    </div>
  );
};

export default DetailsPage;