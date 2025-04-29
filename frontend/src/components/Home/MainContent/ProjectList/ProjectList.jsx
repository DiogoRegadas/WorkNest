import ProjectCard from '../ProjectCard/ProjectCard';
import styles from './ProjectList.module.css';

export default function ProjectList({ projects, onHoverProject }) {
  return (
    <div className={styles.projectList}>
      {projects.map(project => (
        <div
          key={project._id}
          onMouseEnter={() => onHoverProject(project)}
          onMouseLeave={() => onHoverProject(null)}
        >
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}

