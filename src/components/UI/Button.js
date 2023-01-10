import styles from "./Button.module.scss";

const Button = (props) => {
  const color = props.type;
  return (
    <button className={`${styles.button} ${styles[color]}`}>
      {props.children}
    </button>
  );
};

export default Button;
