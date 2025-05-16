import styles from './styles.module.css';

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}></div>
      <p>Loading Pokémon...</p>
    </div>
  );
};

export default Loading;