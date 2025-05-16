import { usePokemon } from '../../hooks/usePokemon';
import styles from './styles.module.css';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = usePokemon();

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;