<<<<<<< HEAD
import Image from "next/image";
import ProjectCard from '../pages/Project';
import styles from "./page.module.css";
=======
import React from 'react';
import LoginForm from '../pages/Login/LoginForm';
>>>>>>> 3db4b8bc139d3a32701bb9bc8b7c7297a5219b8a



export default function Home() {
<<<<<<< HEAD
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
=======
  return <LoginForm />;
>>>>>>> 3db4b8bc139d3a32701bb9bc8b7c7297a5219b8a
}
