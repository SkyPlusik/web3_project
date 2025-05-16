import { Link } from 'react-router-dom'
import styles from './styles.module.css'

const PokemonCard = ({ pokemon }) => {
  const imageUrl = pokemon.sprites?.other?.['official-artwork']?.front_default || 
                   pokemon.sprites?.front_default

  return (
    <Link to={`/pokemon/${pokemon.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={imageUrl} 
          alt={pokemon.name}
          className={styles.image}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/150'
          }}
        />
      </div>
      <h3 className={styles.name}>{pokemon.name}</h3>
      <div className={styles.types}>
        {pokemon.types.map(type => (
          <span key={type.slot} className={`${styles.type} ${type.type.name}`}>
            {type.type.name}
          </span>
        ))}
      </div>
    </Link>
  )
}

export default PokemonCard