import styles from "./header.module.css";
import Spoiler from '../spoiler';
import getMessage from '../messages';

function Header({ reset, chosenPokemon, getHint }) {
  return (
    <header className={styles.header}>
      <section className={styles.title__container}>
        <h1 className={styles.title}>Cara a cara</h1>
      </section>
      
      <section className={styles.buttons__container}>
        <button onClick={reset} className={styles.button}>
          {getMessage('reset')}
        </button>
  
        <button onClick={getHint} className={styles.button}>
          {getMessage('request-hint')}
        </button>
      </section>
  
      <Spoiler
        title='Spoiler'
        description={chosenPokemon.name}
      />
    </header>
  );
}

export { Header };
