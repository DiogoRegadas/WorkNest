import styles from "./lamp.module.css";

export default function Lamp() {
  return (
    <div className={styles.bulbContainer}>
      <div className={styles.wire}></div>
      <div className={styles.connector}>
        <div className={styles.grove}></div>
        <div className={styles.grove}></div>
        <div className={styles.grove}></div>
      </div>
      <div className={styles.bulb}>
        <div className={styles.metalWire}></div>
        <div className={styles.metalWire}></div>
        <div className={styles.metalWire}></div>
      </div>
    </div>
  );
}