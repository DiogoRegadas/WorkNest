import { useState, useEffect } from "react";
import styles from "./ProjectCard.module.css";

export default function ProjectCard() {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [phase, setPhase] = useState("initial"); // initial → collapse → focus → done
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const moveTimer = setTimeout(() => {
      setButtonClicked(true);
    }, 1500);

    const clickTimer = setTimeout(() => {
      setClicked(true);
      setShowCursor(false);
    }, 2000);

    const collapseTimer = setTimeout(() => {
      setPhase("collapse");
    }, 4000);

    const focusTimer = setTimeout(() => {
      setPhase("focus");
    }, 4800);

    const doneTimer = setTimeout(() => {
      setPhase("done");
    }, 6100);

    return () => {
      clearTimeout(moveTimer);
      clearTimeout(clickTimer);
      clearTimeout(collapseTimer);
      clearTimeout(focusTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <div className={styles.card}>
      {!clicked ? (
        <div className={styles.buttonWrapper}>
          {showCursor && <div className={styles.cursor}></div>}
          <button
            className={`${styles.button} ${
              buttonClicked ? styles.clicked : ""
            }`}
          >
            New Project
          </button>
        </div>
      ) : (
        <div className={styles.animationArea}>
          {/* Caixa principal */}
          <div
            className={`${styles.box} ${
              phase === "focus" || phase === "done" ? styles.focusBox : ""
            }`}
          ></div>

          {/* Project X (texto inicial) */}
          {phase !== "focus" && phase !== "done" && (
            <h3
              className={`${styles.projectTitle} ${
                phase === "collapse" ? styles.fadeOut : ""
              }`}
            >
              Project X
            </h3>
          )}

          {/* X central permanece */}
          {(phase === "focus" || phase === "done") && (
            <div className={styles.bigX}>X</div>
          )}

          {/* Check de confirmação */}
          {phase === "done" && (
            <div className={styles.checkMark}>✓</div>
          )}

          {/* Folders */}
          {phase !== "focus" && phase !== "done" && (
            <>
              <div
                className={`${styles.folder1} ${
                  phase === "collapse" ? styles.collapse : ""
                }`}
              >
                A
              </div>
              <div
                className={`${styles.folder2} ${
                  phase === "collapse" ? styles.collapse : ""
                }`}
              >
                B
              </div>
              <div
                className={`${styles.folder3} ${
                  phase === "collapse" ? styles.collapse : ""
                }`}
              >
                C
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
