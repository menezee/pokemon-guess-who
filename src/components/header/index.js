import styles from "./header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Cara a cara</h1>
    </header>
  );
}

export { Header };
