import React, { useState, useEffect } from 'react';
import ListingPage from './Components/ListingPage';
import DetailsPage from './Components/DetailsPage';
import SearchPage from './Components/SearchPage';

// BookmarksScreen component
const BookmarksScreen = ({ bookmarks, onRemoveBookmark }) => {
  return (
    <div>
      {bookmarks.map((pokemon) => (
        <div key={pokemon.id}>
          <img src={pokemon.image} alt={pokemon.name} />
          <p>{pokemon.name}</p>
          <button onClick={() => onRemoveBookmark(pokemon)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

// App component
const App = () => {
  const [searching, setSearching] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [offset, setOffset] = useState(5);

  const handleSearch = (pokemonName) => {
    setSearching(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => response.json())
      .then((data) => {
        const type = data.types[0].type.name;
        handleSimilarTypePokemonSearch(type, data);
        setSearching(false);
      })
      .catch((error) => {
        setSearching(false);
        console.error(error);
      });

  }

  const handleSimilarTypePokemonSearch = (pokemonType, pName) => {
    setSearching(true);
    fetch(`https://pokeapi.co/api/v2/type/${pokemonType}`)
      .then((response) => response.json())
      .then((data) => {
        setSearching(false);
        const pokemonUrls = data.pokemon.map((entry) => entry.pokemon.url);
        fetchPokemonDetails(pokemonUrls, pName);
      })
      .catch((error) => {
        setSearching(false);
        console.error(error);
      });
  };

  const handleFirstLoad = () => {
    setSearching(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset }`)
      .then((response) => response.json())
      .then((data) => {
        setSearching(false);
        const pokemonUrls = data.results.map((entry) => entry.url);
        fetchPokemonDetails(pokemonUrls, '');
      })
      .catch((error) => {
        setSearching(false);
        console.error(error);
      });
  };

  const handleListingLoad = () => {
    setSearching(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
      .then((response) => response.json())
      .then((data) => {
        setSearching(false);
        const pokemonUrls = data.results.map((entry) => entry.url);
        fetchNextPokemonDetails(pokemonUrls, '');
      })
      .catch((error) => {
        setSearching(false);
        console.error(error);
      });
  };

  const fetchNextPokemonDetails = (urls, data) => {
    Promise.all(urls.map((url) => fetch(url).then((response) => response.json())))
      .then((pokemonData) => {
        setPokemonList([...pokemonList, ...pokemonData]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchPokemonDetails = (urls, data) => {
    Promise.all(urls.map((url) => fetch(url).then((response) => response.json())))
      .then((pokemonData) => {
        if (data !== '') {
          pokemonData = pokemonData.filter((value) => value.name !== data.name);
          setPokemonList([data, ...pokemonData]);
        }
        else
          setPokemonList(pokemonData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLoadMore = () => {
    setOffset((prev) => prev + 10);
    handleListingLoad();
    // Implement logic to load more Pokemon using API
  };

  const handleBookmark = (pokemon) => {
    if (bookmarks.includes(pokemon)) {
      setBookmarks(bookmarks.filter((p) => p.id !== pokemon.id));
    } else {
      setBookmarks([...bookmarks, pokemon]);
    }
  };

  const handleRemoveBookmark = (pokemon) => {
    setBookmarks(bookmarks.filter((p) => p.id !== pokemon.id));
  };

  useEffect(() => {
    if (pokemonList.length === 0) {
      handleFirstLoad(); // Replace 'fire' with your desired Pokemon type
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run the effect only once on initial render

  return (
    <div>
      <SearchPage onSearch={handleSearch} />
      {searching ? (
        <p>Loading...</p>
      ) : (
        <>
          <ListingPage pokemonList={pokemonList} onLoadMore={handleLoadMore} />
          {pokemonList.length > 0 && (
            <DetailsPage
              pokemon={pokemonList[0]} // Display details for the first Pokemon in the list
              onBookmark={handleBookmark}
            />
          )}
        </>
      )}
      <BookmarksScreen
        bookmarks={bookmarks}
        onRemoveBookmark={handleRemoveBookmark}
      />
    </div>
  );
};

// ListingPage component


export default App;



