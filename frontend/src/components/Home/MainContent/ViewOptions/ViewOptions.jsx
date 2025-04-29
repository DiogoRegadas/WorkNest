import { useState } from 'react';
import styles from './ViewOptions.module.css';

export default function ViewOptions({ sortOption, setSortOption }) {
  return (
    <div className={styles.viewOptions}>
      <select
        className={styles.dropdown}
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="lastUpdated">Last Updated</option>
        <option value="alphabetical">Alphabetical</option>
      </select>
    </div>
  );
}
