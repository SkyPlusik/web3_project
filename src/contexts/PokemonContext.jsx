import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPokemons = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50');
      const detailedPokemons = await Promise.all(
        data.results.map(pokemon => axios.get(pokemon.url))
      );
      setPokemons(detailedPokemons.map(res => res.data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPokemonDetails = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setSelectedPokemon(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter(pokemon => {
    const matchesType = filter === 'all' || pokemon.types.some(t => t.type.name === filter);
    const matchesSearch = pokemon.name.includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <PokemonContext.Provider
      value={{
        pokemons: filteredPokemons,
        selectedPokemon,
        loading,
        error,
        filter,
        searchTerm,
        setFilter,
        setSearchTerm,
        fetchPokemonDetails
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};