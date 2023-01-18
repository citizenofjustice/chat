import styles from "./RoundImage.module.scss";

const RoundImage = (props) => {
  const pageAndSize = props.size;
  return (
    <div className={styles[pageAndSize]}>
      <img className={styles.image} src={props.profilePic} alt={props.alt} />
    </div>
  );
};

export default RoundImage;
