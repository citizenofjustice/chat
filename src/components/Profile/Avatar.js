import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ref } from "firebase/storage";
import { storage } from "../../firebase";

import {
  getUserInfo,
  updateProfile,
  setUserInfoToDb,
} from "../../store/userInfo-slice";
import useFirebase from "../../hooks/use-firebase";

import defaultAvatar from "../../assets/placeholderAvatar.png";
import RoundImage from "../UI/RoundImage";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorModal from "../UI/ErrorModal";
import styles from "./Avatar.module.scss";

const Avatar = (props) => {
  const dispatch = useDispatch();
  const { uploadProfilePic } = useFirebase();

  const { token } = useSelector((state) => state.auth);
  const { userData, status, error } = useSelector((state) => state.userInfo);
  const { localId, photoUrl } = userData;

  const [imageUpload, setImageUpload] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const profilePicFolderRef = ref(storage, `${localId}/profile-picture/`);

  const fetchProfilePic = useCallback(async () => {
    dispatch(getUserInfo(token));
    if (photoUrl === undefined) {
      setProfilePic(defaultAvatar);
    } else setProfilePic(photoUrl);
  }, [photoUrl, dispatch, token]);

  const uploadImageHandler = async () => {
    if (imageUpload === null) return;
    const imageRef = ref(
      storage,
      `${localId}/profile-picture/${imageUpload.name}`
    );
    const imageUrl = await uploadProfilePic(
      imageRef,
      imageUpload,
      profilePicFolderRef
    );
    setImageUpload(null);
    setProfilePic(imageUrl);
    await setUserInfoToDb(localId, imageUrl, "profilePicture");
    dispatch(
      updateProfile({ type: "profilePicture", token, newValue: imageUrl })
    );
  };

  const canelUploadHandler = () => {
    setImageUpload(null);
  };

  useEffect(() => {
    fetchProfilePic();
  }, [fetchProfilePic]);

  return (
    <ErrorModal isActive={status === "rejected"} errorMessage={error}>
      {status === "pending" ? (
        <LoadingSpinner />
      ) : (
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
                {!imageUpload ? "Выбрать файл" : "Файл другой файл"}
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
              Загрузить
            </span>
          </div>
        </div>
      )}
    </ErrorModal>
  );
};

export default Avatar;
