import { createContext, useState, useCallback, useEffect } from 'react'
import axios from 'axios'

export const PokemonContext = createContext()

export const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [cache, setCache] = useState({})

  const fetchPokemons = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50')
      const detailedPokemons = await Promise.all(
        data.results.map(pokemon => axios.get(pokemon.url))
      )
      setPokemons(detailedPokemons.map(res => res.data))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchPokemonDetails = useCallback(async (id) => {
    if (cache[id]) {
      setSelectedPokemon(cache[id])
      return
    }

    setLoading(true)
    try {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      setSelectedPokemon(data)
      setCache(prev => ({ ...prev, [id]: data }))
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [cache])

  useEffect(() => {
    fetchPokemons()
  }, [fetchPokemons])

  const filteredPokemons = pokemons.filter(pokemon => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filter === 'all' || pokemon.types.some(t => t.type.name === filter)
    return matchesSearch && matchesType
  })

  return (
    <PokemonContext.Provider
      value={{
        pokemons: filteredPokemons,
        selectedPokemon,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        filter,
        setFilter,
        fetchPokemonDetails
      }}
    >
      {children}
    </PokemonContext.Provider>
  )
}