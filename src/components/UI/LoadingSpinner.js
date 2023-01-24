import styles from "./LoadingSpinner.module.scss";

/**
 * UI element displaying loading ring
 * @returns loading animation
 */
const LoadingSpinner = () => {
  return <div className={styles.spinner}></div>;
};

export default LoadingSpinner;
