import { usePokemon } from '../hooks/usePokemon'
import SearchBar from '../components/SearchBar'
import TypeFilter from '../components/TypeFilter'
import PokemonList from '../components/PokemonList'
import styles from './Home.module.css'

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pokédex</h1>
      <SearchBar />
      <TypeFilter />
      <PokemonList />
    </div>
  )
}

export default Home