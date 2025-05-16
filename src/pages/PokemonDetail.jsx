import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePokemon } from '../hooks/usePokemon';
import styles from './PokemonDetail.module.css';

const PokemonDetail = () => {
  const { id } = useParams();
  const { selectedPokemon, fetchPokemonDetails, loading, error } = usePokemon();

  useEffect(() => {
    fetchPokemonDetails(id);
  }, [id, fetchPokemonDetails]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!selectedPokemon) return null;

  return (
    <div className={styles.detailContainer}>
      <h1 className={styles.name}>{selectedPokemon.name}</h1>
      <div className={styles.content}>
        <img 
          src={selectedPokemon.sprites.other['official-artwork'].front_default} 
          alt={selectedPokemon.name} 
          className={styles.image}
        />
        <div className={styles.info}>
          <h2>Details</h2>
          <p>Height: {selectedPokemon.height / 10}m</p>
          <p>Weight: {selectedPokemon.weight / 10}kg</p>
          
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
  );
};

export default PokemonDetail;