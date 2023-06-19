import React, { useState } from 'react';

const DetailsPage = ({ pokemon }) => {
  const [bookmarked, setBookmarked] = useState(false);

  // const handleBookmark = () => {
  //   setBookmarked(!bookmarked);
  //   onBookmark(pokemon);
  // };

  return (
    (JSON.stringify(pokemon) !== '{}') ? (
      <div className="w-full bg-black">
        <div>
          {pokemon.name}
        </div>
        <div></div>
      </div>
    ) : (
      <></>
    )
  );
};

export default DetailsPage;