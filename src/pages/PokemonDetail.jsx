import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { usePokemon } from '../hooks/usePokemon'
import LoadingSpinner from '../components/LoadingSpinner'
import styles from './PokemonDetail.module.css'

const PokemonDetail = () => {
  const { id } = useParams()
  const { selectedPokemon, loading, fetchPokemonDetails } = usePokemon()
  const [localLoading, setLocalLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    const timer = setTimeout(() => {
      fetchPokemonDetails(id).finally(() => {
        if (isMounted) setLocalLoading(false)
      })
    }, 300)

    return () => {
      isMounted = false
      clearTimeout(timer)
    }
  }, [id, fetchPokemonDetails])

  if (loading && localLoading) return <LoadingSpinner />
  if (!selectedPokemon) return null

  return (
    <div className={`${styles.container} ${!localLoading ? styles.visible : ''}`}>
      <div className={styles.card}>
        <Link to="/" className={styles.backButton}>← Back</Link>
        <h1 className={styles.name}>{selectedPokemon.name}</h1>
        <img
          src={selectedPokemon.sprites.other['official-artwork'].front_default}
          alt={selectedPokemon.name}
          className={styles.image}
        />
        <div className={styles.details}>
          <p>Height: {(selectedPokemon.height / 10).toFixed(1)} m</p>
          <p>Weight: {(selectedPokemon.weight / 10).toFixed(1)} kg</p>
          <h3>Types</h3>
          <div className={styles.types}>
            {selectedPokemon.types.map(type => (
              <span key={type.slot} className={`${styles.type} ${type.type.name}`}>
                {type.type.name}
              </span>
            ))}
          </div>
          <h3>Abilities</h3>
          <ul className={styles.abilities}>
            {selectedPokemon.abilities.map(ability => (
              <li key={ability.slot}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetail