import styles from "./Button.module.scss";

const Button = (props) => {
  const type = props.type;
  return (
    <button className={`${styles.button} ${styles[type]}`}>
      {props.children}
    </button>
  );
};

export default Button;
