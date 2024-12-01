import Image from "next/image";
import ProjectCard from '../pages/Project';
import styles from "./page.module.css";
import React from 'react';
import LoginForm from '../pages/Login/LoginForm';



export default function Home() {
  return (
    <div className={styles.page}>
      <h1>My Projects</h1>
      <div className={styles.projectsContainer}>
        <ProjectCard projectId={1} />
        <ProjectCard projectId={2} />
        <ProjectCard projectId={3} />
      </div>
    </div>
  );
  return <LoginForm />;
}
