import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import styles from "./MenuButton.module.scss";

const MenuButton = () => {
  const dispatch = useDispatch();

  const menuToggleHandler = (event) => {
    event.preventDefault();
    dispatch(uiActions.toggleMenu());
  };

  return (
    <button className={styles["menu-button"]} onClick={menuToggleHandler}>
      <span className={styles.bar} />
      <span className={styles.bar} />
      <span className={styles.bar} />
    </button>
  );
};

export default MenuButton;
