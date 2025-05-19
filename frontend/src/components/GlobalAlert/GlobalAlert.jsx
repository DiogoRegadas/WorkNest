// src/components/GlobalAlert/GlobalAlert.jsx
import { useAlert } from '../../context/AlertContext';
import styles from './GlobalAlert.module.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function GlobalAlert() {
  const { alert, confirmData } = useAlert();

  return (
    <>
      {alert && (
        <div className={`${styles.alert} ${styles[alert.type]}`}>
          <div className={styles.icon}>
            {alert.type === 'sucesso' ? <FaCheckCircle /> : <FaTimesCircle />}
          </div>
          <span className={styles.text}>{alert.message}</span>
          <div className={`${styles.timerBar} ${styles[alert.type]}`}></div>
        </div>
      )}

      {confirmData && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmBox}>
            <p className={styles.confirmMessage}>{confirmData.message}</p>
            <div className={styles.confirmButtons}>
              <button className={styles.confirmYes} onClick={confirmData.onConfirm}>✓</button>
              <button className={styles.confirmNo} onClick={confirmData.onCancel}>✖</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
