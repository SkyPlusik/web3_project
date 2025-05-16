import { usePokemon } from '../../hooks/usePokemon';
import styles from './styles.module.css';

const types = ['all', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon'];

const TypeFilter = () => {
  const { filter, setFilter } = usePokemon();

  return (
    <div className={styles.filterContainer}>
      {types.map(type => (
        <button
          key={type}
          className={`${styles.filterButton} ${filter === type ? 'active' : ''}`}
          onClick={() => setFilter(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default TypeFilter;