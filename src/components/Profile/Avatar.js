import { useCallback, useEffect, useState } from "react";
import storage from "../../firebase";
import { ref } from "firebase/storage";

import RoundImage from "../UI/RoundImage";
import styles from "./Avatar.module.scss";
import defaultAvatar from "../../assets/placeholderAvatar.png";
import { useSelector } from "react-redux";
import useFirebase from "../../hooks/use-firebase";
import useAuth from "../../hooks/use-auth";

const Avatar = (props) => {
  const { changeProfilePicUrl, getUserInfo } = useAuth();
  const { uploadProfilePic } = useFirebase();
  const user = useSelector((state) => state.auth.user);
  const idToken = useSelector((state) => state.auth.token);
  const [imageUpload, setImageUpload] = useState(null);
  const [profilePic, setProfilePic] = useState();
  const profilePicFolderRef = ref(storage, `${user}/profile-picture/`);

  const fetchProfilePic = useCallback(async () => {
    const userInfo = await getUserInfo(idToken);
    const pic = userInfo.users[0].photoUrl;
    if (pic === undefined) {
      setProfilePic(defaultAvatar);
    } else setProfilePic(pic);
  }, [getUserInfo, idToken]);

  const uploadImageHandler = async () => {
    if (imageUpload === null) return;
    const imageRef = ref(
      storage,
      `${user}/profile-picture/${imageUpload.name}`
    );
    const imageUrl = await uploadProfilePic(
      imageRef,
      imageUpload,
      profilePicFolderRef
    );
    await changeProfilePicUrl(idToken, imageUrl);
    setProfilePic(imageUrl);
    setImageUpload(null);
  };

  const canelUploadHandler = () => {
    setImageUpload(null);
  };

  useEffect(() => {
    fetchProfilePic();
  }, [fetchProfilePic]);

  return (
    <>
      <div className={styles.avatar}>
        <RoundImage
          size={props.page}
          profilePic={profilePic}
          alt="profile image"
        />
        <div className={styles.file}>
          <div className={styles.upload}>
            <label
              className={`${styles.button} ${
                !!imageUpload && styles.highlight
              }`}
              htmlFor="image-upload"
            >
              {!imageUpload ? "Загрузить" : "Загружено"}
            </label>
            {!!imageUpload && (
              <span
                className={`${styles.cancel} ${styles.button}`}
                onClick={canelUploadHandler}
              >
                x
              </span>
            )}
          </div>
          <input
            id="image-upload"
            type="file"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          />
          <span className={styles.button} onClick={uploadImageHandler}>
            Отправить
          </span>
        </div>
      </div>
    </>
  );
};

export default Avatar;
