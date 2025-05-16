import { usePokemon } from '../../hooks/usePokemon';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const PokemonCard = ({ pokemon }) => {
  const { fetchPokemonDetails } = usePokemon();
  const navigate = useNavigate();

  const handleClick = () => {
    fetchPokemonDetails(pokemon.id);
    navigate(`/pokemon/${pokemon.id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img 
        src={pokemon.sprites.other['official-artwork'].front_default} 
        alt={pokemon.name} 
        className={styles.image}
      />
      <h3 className={styles.name}>{pokemon.name}</h3>
      <div className={styles.types}>
        {pokemon.types.map(type => (
          <span key={type.slot} className={`${styles.type} ${type.type.name}`}>
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;