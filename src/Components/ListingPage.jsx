import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";

const ListingPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(offset > 0 && isLoading) {
      handleListingLoad();
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  const handleLoadMore = () => {
    setIsLoading(true);
    setOffset((prev) => prev + 10);
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } =
      document.getElementById("pokemonList");
    if (scrollTop + clientHeight >= scrollHeight - 30) {
      handleLoadMore();
    }
  };

  const fetchNextPokemonDetails = (urls, data) => {
    Promise.all(
      urls.map((url) => fetch(url).then((response) => response.json()))
    )
      .then((pokemonData) => {
        setPokemonList([...pokemonList, ...pokemonData]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleListingLoad = () => {
    // setSearching(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
      .then((response) => response.json())
      .then((data) => {
        // setSearching(false);
        const pokemonUrls = data.results.map((entry) => entry.url);
        fetchNextPokemonDetails(pokemonUrls, "");
      })
      .catch((error) => {
        // setSearching(false);
        console.error(error);
      });
  };

  const fetchPokemonDetails = (urls, data) => {
    Promise.all(
      urls.map((url) => fetch(url).then((response) => response.json()))
    )
      .then((pokemonData) => {
        if (data !== "") {
          pokemonData = pokemonData.filter((value) => value.name !== data.name);
          setPokemonList([data, ...pokemonData]);
        } else setPokemonList(pokemonData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFirstLoad = () => {
    // setSearching(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
      .then((response) => response.json())
      .then((data) => {
        // setSearching(false);
        const pokemonUrls = data.results.map((entry) => entry.url);
        fetchPokemonDetails(pokemonUrls, "");
      })
      .catch((error) => {
        // setSearching(false);
        console.error(error);
      });
  };

  useEffect(() => {
    if (pokemonList.length === 0) {
      handleFirstLoad(); // Replace 'fire' with your desired Pokemon type
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run the effect only once on initial render

  useEffect(() => {
    const pokemonListDiv = document.getElementById("pokemonList");
    pokemonListDiv.addEventListener("scroll", handleScroll);
    return () => {
      pokemonListDiv.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="flex flex-col w-2/6 h-screen overflow-y-scroll break-words hidden-scrollbar"
      id="pokemonList"
    >
      {/*  */}
      {pokemonList.map((pokemon) => (
        <PokemonCard pokemon={pokemon}></PokemonCard>
        // <div key={pokemon.id} className="grid-item">
        //   <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        //   <p>{pokemon.name}</p>
        // </div>
      ))}
    </div>
  );
};

export default ListingPage;
