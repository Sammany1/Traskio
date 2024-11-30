import React from 'react';
import styles from './Login.module.css';

const LoginForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h2 className={styles.title}>Login</h2>
        <form>
          <input type="text" placeholder="Username" className={styles.input} />
          <input type="password" placeholder="Password" className={styles.input} />
          <button type="submit" className={styles.button}>Login</button>
        </form>
        <div className={styles.signupContainer}>
          <p>Don't have an account?</p>
          <button className={styles.signupButton}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
