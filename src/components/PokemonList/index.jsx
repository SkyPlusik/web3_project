import { usePokemon } from '../../hooks/usePokemon'
import PokemonCard from '../PokemonCard'
import LoadingSpinner from '../LoadingSpinner'
import styles from './styles.module.css'

const PokemonList = () => {
  const { pokemons, loading, error } = usePokemon()

  if (loading) return <LoadingSpinner />
  if (error) return <div className={styles.error}>{error}</div>

  return (
    <div className={styles.list}>
      {pokemons.map(pokemon => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  )
}

export default PokemonList