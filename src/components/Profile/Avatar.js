import RoundImage from "../UI/RoundImage";
import styles from "./Avatar.module.scss";
import Button from "../UI/Button";

const Avatar = () => {
  return (
    <>
      <div className={styles.avatar}>
        <RoundImage alt="profile image" />
        <div className={styles.replace}>
          <Button type="green">replace image</Button>
        </div>
      </div>
    </>
  );
};

export default Avatar;
