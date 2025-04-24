import { useEffect, useState } from "react";
import styles from "./MessageCard.module.css";

export default function MessageCard() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step < 5) {
      const timer = setTimeout(() => {
        setStep((prev) => prev + 1);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className={styles.chatCard}>
      {/* 1. Mensagem da esquerda (A) */}
      {step >= 0 && (
        <div className={styles.messageLeft}>
          <div className={styles.avatar}></div>
          <div className={styles.bubble}>
            <div className={`${styles.bar} ${styles.greenBar}`}></div>
            <div className={styles.blurredText}></div>
          </div>
        </div>
      )}

      {/* 2. Typing... à direita (B) */}
      {step === 1 && (
        <div className={styles.typingWrapperRight}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      )}

      {/* 3. Mensagem da direita (B) */}
      {step >= 2 && (
        <div className={styles.messageRight}>
          <div className={styles.bubble}>
            <div className={`${styles.bar} ${styles.yellowBar}`}></div>
            <div className={styles.blurredText}></div>
          </div>
          <div className={styles.avatar}></div>
        </div>
      )}

      {/* 4. Typing... à esquerda (A) */}
      {step === 3 && (
        <div className={styles.typingWrapperLeft}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
        </div>
      )}

      {/* 5. Resposta final da esquerda (A) com fio de ligação */}
      {step === 4 && (
        <div className={styles.replyWrapper}>
          <div className={styles.messageLeft}>
            <div className={styles.avatar}></div>
            <div className={`${styles.bubble} ${styles.replyBubble}`}>
              <div className={`${styles.bar} ${styles.yellowBar}`}></div>
              <div className={styles.blurredText}></div>
            </div>
          </div>
          <div className={styles.linkLine}></div>
        </div>
      )}
    </div>
  );
}
