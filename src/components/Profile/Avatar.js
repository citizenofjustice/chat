import RoundImage from "../UI/RoundImage";

import Button from "../UI/Button";
import styles from "./Avatar.module.scss";

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
