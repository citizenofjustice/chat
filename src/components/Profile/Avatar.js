import { useEffect, useState } from "react";
import storage from "../../firebase";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import RoundImage from "../UI/RoundImage";
import styles from "./Avatar.module.scss";
import { useSelector } from "react-redux";

const Avatar = () => {
  const user = useSelector((state) => state.auth.user);
  const [imageUpload, setImageUpload] = useState(null);
  const [profilePic, setProfilePic] = useState();
  const profilePicFolderRef = ref(storage, `${user}/profile-picture/`);

  const uploadImageHandler = () => {
    if (imageUpload === null) return;
    const imageRef = ref(
      storage,
      `${user}/profile-picture/${imageUpload.name}`
    );
    deleteOldProfilePics();
    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => setProfilePic(url));
      })
      .catch((err) => console.log("upload failed. ", err));
  };

  const deleteOldProfilePics = () => {
    listAll(profilePicFolderRef).then((response) =>
      response.items.forEach((item) => {
        deleteObject(item)
          .then()
          .catch((err) => console.log("delete failed. ", err));
      })
    );
  };

  useEffect(() => {
    listAll(profilePicFolderRef).then((response) => {
      const latestProfilePic = response.items.pop();
      if (latestProfilePic) {
        getDownloadURL(latestProfilePic).then((url) => setProfilePic(url));
      } else {
        setProfilePic(
          "https://firebasestorage.googleapis.com/v0/b/chat-app-1e2f6.appspot.com/o/placeholderAvatar.png?alt=media&token=64b3db7b-0f9a-4a53-8ce8-45d77839f1cf"
        );
      }
    });
  }, [profilePicFolderRef, setProfilePic]);

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
