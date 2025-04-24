import { useEffect, useState } from "react";
import styles from "./TaskCard.module.css";

export default function TaskCard() {
  const tasks = ["Organizar Equipa", "Definir Prazos", "Atribuir Responsáveis"];
  const [statuses, setStatuses] = useState(["To Do", "To Do", "To Do"]);
  const doneCount = statuses.filter(status => status === "Done").length;
  const progress = Math.floor((doneCount / statuses.length) * 100);

  useEffect(() => {
    const taskOrder = [0, 1, 2].sort(() => Math.random() - 0.5);
  
    const statusUpdates = [];
  
    // Muda para In Progress
    taskOrder.forEach((taskIdx, i) => {
      const timeout = setTimeout(() => {
        setStatuses((prev) => {
          const updated = [...prev];
          updated[taskIdx] = "In Progress";
          return updated;
        });
      }, 1000 + i * 2000);
      statusUpdates.push(timeout);
    });
  
    // Depois muda para Done
    taskOrder.forEach((taskIdx, i) => {
      const timeout = setTimeout(() => {
        setStatuses((prev) => {
          const updated = [...prev];
          updated[taskIdx] = "Done";
          return updated;
        });
      }, 4000 + i * 2000);
      statusUpdates.push(timeout);
    });
  
    return () => statusUpdates.forEach(clearTimeout);
  }, []);

  return (
    <div className={styles.taskBox}>
     
     <div className={styles.progressWrapper}>
  <div className={styles.progressBar} style={{ width: `${progress}%` }} />
  <span className={styles.progressText}>{progress}%</span>
</div>
{tasks.map((task, i) => (
  <div
    key={i}
    className={`${styles.taskCard} ${styles[`taskCardDelayed${i + 1}`]}`}
  >
    <span
      className={`${styles.checkIcon} ${
        statuses[i] === "Done" ? styles.animateCheck : ""
      }`}
    >
      {statuses[i] === "Done" ? "✔" : "❌"}
    </span>

    <span className={styles.taskName}>{task}</span>

    <div className={styles.statusContainer}>
      <div
        className={
          styles.flipper +
          " " +
          (statuses[i] === "Done" ? styles.flipped : "")
        }
      >
        {/* Frente: To Do ou In Progress */}
        <span
          className={`${styles.statusText} ${styles.front}`}
          data-status={statuses[i]}
        >
          {statuses[i] === "In Progress" ? "In Progress" : "To Do"}
        </span>

        {/* Verso: Done apenas */}
        <span
          className={`${styles.statusText} ${styles.back}`}
          data-status="Done"
        >
          Done
        </span>
      </div>
    </div>
  </div>
))}
    </div>
  );
}
