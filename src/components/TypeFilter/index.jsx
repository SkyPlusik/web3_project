import { usePokemon } from '../../hooks/usePokemon'
import styles from './styles.module.css'

const types = ['all', 'normal', 'fire', 'water', 'grass', 'electric', 'ice', 
               'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 
               'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy']

const TypeFilter = () => {
  const { filter, setFilter } = usePokemon()

  return (
    <div className={styles.filterContainer}>
      {types.map(type => (
        <button
          key={type}
          className={`${styles.filterButton} ${filter === type ? styles.active : ''}`}
          onClick={() => setFilter(type)}
        >
          {type}
        </button>
      ))}
    </div>
  )
}

export default TypeFilter