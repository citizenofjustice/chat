import { useDispatch } from "react-redux";

import { uiActions } from "../../store/ui-slice";

import styles from "./MenuButton.module.scss";

/**
 * Component for small screens that renders menu toggle button
 * @returns menu button
 */
const MenuButton = () => {
  const dispatch = useDispatch();

  /**
   * Function that opens or closes side menu for smaller screens
   * @param {*} event - onClick event triggered by a button click
   */
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
