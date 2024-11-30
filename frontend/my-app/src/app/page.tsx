import Image from "next/image";
import ProjectCard from '../pages/Project';
import styles from "./page.module.css";



export default function Home() {
  return (
    <div className={styles.page}>
      <h1>My Projects</h1>
      <div className={styles.projectsContainer}>
        {/* Dynamically passing project number */}
        <ProjectCard projectId={1} />
        <ProjectCard projectId={2} />
        <ProjectCard projectId={3} />
      </div>
    </div>
  );
}
