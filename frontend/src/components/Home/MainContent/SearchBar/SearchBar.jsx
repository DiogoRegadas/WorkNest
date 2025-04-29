import styles from './SearchBar.module.css';

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      className={styles.searchInput}
      placeholder="Search projects..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
