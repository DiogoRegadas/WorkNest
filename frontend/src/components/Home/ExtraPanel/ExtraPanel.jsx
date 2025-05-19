//src/components/Home/ExtraPanel/ExtraPanel.jsx

import { useState } from 'react';
import LastActivities from './LastActivities/LastActivities';
import Properties from './Properties/Properties';
import Resizer from './Resize/Resize';
import AmigosExtraPanel from './AmigosExtraPanel/AmigosExtraPanel'; // novo
import styles from './ExtraPanel.module.css';

export default function ExtraPanel({ selectedProject, secaoAtiva, refreshAmigos,refreshPedidosTrigger }) {
  const [activitiesHeight, setActivitiesHeight] = useState(60); // % altura da zona de atividades

  const handleResize = (newHeight) => {
    setActivitiesHeight(newHeight);
  };

  // 👇 Novo bloco de renderização condicional
  if (secaoAtiva === 'Amigos') {
    return (
      <div className={styles.extraPanel}>
        <AmigosExtraPanel refreshTrigger={refreshPedidosTrigger}
        fetchAmigos={refreshAmigos}/>
      </div>
    );
  }

  // Secção de Projetos (default)
  return (
    <div className={styles.extraPanel}>
      <div
        className={styles.lastActivities}
        style={{ height: `${activitiesHeight}%` }}
      >
        <h2 className={styles.sectionTitle}>Last Activities</h2>
        <LastActivities />
      </div>

      <Resizer onResize={handleResize} />

      <div
        className={styles.properties}
        style={{ height: `${100 - activitiesHeight}%` }}
      >
        <h2 className={styles.sectionTitle}>Properties</h2>
        <Properties selectedProject={selectedProject} />
      </div>
    </div>
  );
}
