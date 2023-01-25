import styles from "./Button.module.scss";

/**
 * UI button component
 * @param {string} props.children - button name
 * @param {string} props.type - additional css class for button
 * @returns render of button component
 */
const Button = (props) => {
  const type = props.type;

  return (
    <button className={`${styles.button} ${styles[type]}`}>
      {props.children}
    </button>
  );
};

export default Button;
