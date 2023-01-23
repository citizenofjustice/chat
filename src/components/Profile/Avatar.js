import { useCallback, useEffect, useState, useRef } from "react";
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

/**
 * Component responsable for displyaing and uploading image
 * @param {string} props.page - contains info about future css className for RoundImage
 * @returns avatar choosing component
 */
const Avatar = (props) => {
  const dispatch = useDispatch();
  const { uploadProfilePic } = useFirebase();

  const imageInputField = useRef();

  // getting data form redux
  const { token } = useSelector((state) => state.auth);
  const { userData, status, error } = useSelector((state) => state.userInfo);
  const { localId, photoUrl } = userData;

  // defining state for file input field value
  const [imageUpload, setImageUpload] = useState(null);
  // defining state for current profile picture
  const [profilePic, setProfilePic] = useState(null);

  // folder ref for firebase storage, where user avatar is stored
  const profilePicFolderRef = ref(storage, `${localId}/profile-picture/`);

  // function for upatating profile picture
  const updateProfilePic = useCallback(async () => {
    dispatch(getUserInfo(token));
    if (photoUrl === undefined) {
      setProfilePic(defaultAvatar);
    } else setProfilePic(photoUrl);
  }, [photoUrl, dispatch, token]);

  /**
   * Async function for uploading chosen image into storage with certian path
   * @returns {void}
   */
  const uploadImageHandler = async () => {
    // if file input field is empty stop execution
    if (imageUpload === null) return;

    // defining path in which file will be placed in storage
    const imageRef = ref(
      storage,
      `${localId}/profile-picture/${imageUpload.name}`
    );

    // calling function for uploading file and
    // setting return value with url into const
    const imageUrl = await uploadProfilePic(
      imageRef,
      imageUpload,
      profilePicFolderRef
    );

    // resetting input field after upload
    setImageUpload(null);
    imageInputField.current.value = null;

    // setting profile picture with recived url
    setProfilePic(imageUrl);

    // sending url data to database
    await setUserInfoToDb(localId, imageUrl, "profilePicture");

    // updating redux states
    dispatch(
      updateProfile({ type: "profilePicture", token, newValue: imageUrl })
    );
  };

  /**
   * Function for canceling upload
   * triggers with onClick on a button
   */
  const canelUploadHandler = () => {
    setImageUpload(null);
    imageInputField.current.value = null;
  };

  // useEffect for updating picture
  useEffect(() => {
    updateProfilePic();
  }, [updateProfilePic]);

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
                {!imageUpload ? "Выбрать изображение" : "Изображение выбрано"}
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
              ref={imageInputField}
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
            />
            <button className={styles.button} onClick={uploadImageHandler}>
              Загрузить
            </button>
          </div>
        </div>
      )}
    </ErrorModal>
  );
};

export default Avatar;
