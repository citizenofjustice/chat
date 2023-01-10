import tmpImg from "../../assets/user.png";
import styles from "./RoundImage.module.scss";

const RoundImage = (props) => {
  return (
    <div className={styles["img-wrapper"]}>
      <img className={styles.image} src={tmpImg} alt={props.alt}></img>
    </div>
  );
};

export default RoundImage;
