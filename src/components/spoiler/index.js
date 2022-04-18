import { useState } from 'react';

import styles from './spoiler.module.css';

function Spoiler({ title, description }) {
  const [seen, setSeen] = useState(false);
  
  return (
    <details
      className={styles.spoiler}
      onFocus={() => setSeen(true)}
      style={{ opacity: seen ? 1 : 0 }}
    >
      <summary>{title}</summary>
      {description}
    </details>
  );
}

export default Spoiler;
