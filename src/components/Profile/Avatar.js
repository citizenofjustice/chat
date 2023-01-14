import { useCallback, useEffect, useState } from "react";
import storage from "../../firebase";
import { ref } from "firebase/storage";

import RoundImage from "../UI/RoundImage";
import styles from "./Avatar.module.scss";
import { useSelector } from "react-redux";
import useFirebase from "../../hooks/use-firebase";

const Avatar = () => {
  const { changeProfilePic, getNewestProfilePicUrl } = useFirebase();
  const user = useSelector((state) => state.auth.user);
  const [imageUpload, setImageUpload] = useState(null);
  const [profilePic, setProfilePic] = useState();
  const profilePicFolderRef = ref(storage, `${user}/profile-picture/`);

  const fetchProfilePic = useCallback(async () => {
    const currentProfilePic = await getNewestProfilePicUrl(profilePicFolderRef);
    setProfilePic(currentProfilePic);
  }, [getNewestProfilePicUrl, profilePicFolderRef]);

  const uploadImageHandler = async () => {
    if (imageUpload === null) return;
    const imageRef = ref(
      storage,
      `${user}/profile-picture/${imageUpload.name}`
    );
    const imageUrl = await changeProfilePic(
      imageRef,
      imageUpload,
      profilePicFolderRef
    );
    setProfilePic(imageUrl);
  };

  useEffect(() => {
    fetchProfilePic();
  }, [fetchProfilePic]);

  return (
    <>
      <div className={styles.avatar}>
        <RoundImage profilePic={profilePic} alt="profile image" />
        <div className={styles.file}>
          <label
            className={`${styles.button} ${styles["image-upload-custom"]}`}
            htmlFor="image-upload"
          >
            Загрузить файл
          </label>
          <input
            id="image-upload"
            type="file"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          />
          <span className={styles.button} onClick={uploadImageHandler}>
            SEND
          </span>
        </div>
      </div>
    </>
  );
};

export default Avatar;
