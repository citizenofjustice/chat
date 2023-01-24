import {
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
  ref,
} from "firebase/storage";
import { storage } from "../firebase";

/**
 * Custom react hook containing functions for firebase storage manipulations
 * @returns {object} with links to the functions
 */
const useFirebase = () => {
  /**
   * Function that handles file upload in firebase storage
   * @param {object} filePath - firebase ref with path will be put
   * @param {File} profilePic - file being uploaded
   * @param {object} oldImagesFolder - firebase ref for a path with previously uploadaed files
   * @returns {string} fileUrl so we could set said url into <img> tag to src='' attribute
   */
  const uploadProfilePic = async (filePath, profilePic, oldImagesFolder) => {
    try {
      // delete old file if there was any
      await deleteOldProfilePics(oldImagesFolder);

      // set constant with path in firebase storage where file is stored
      const snapshot = await uploadBytes(filePath, profilePic);

      // getting the url to a file and settinig it to a const
      const fileUrl = await getDownloadURL(snapshot.ref);
      return fileUrl;
    } catch (error) {
      throw new Error("upload failed. ", error);
    }
  };

  /**
   * Function that deletes all previously uploaded images by a current user
   * @param {object} folderRef - firebase ref object with a path to images folder
   * @returns {void}
   */
  const deleteOldProfilePics = async (folderRef) => {
    try {
      // getting object with arrays of data about folder content
      const fileList = await listAll(folderRef);

      // if items array of obj is not empty proceed, otherwise stop execution
      if (fileList.items.length > 0) {
        // for each elemet of items array delete said element from storage
        fileList.items.forEach((item) => {
          deleteObject(item);
        });
      }
    } catch (error) {
      throw new Error("delete failed. ", error);
    }
  };

  /**
   * Function that gets url of last picture uploaded by user
   * @param {string} userId - user identificatior
   * @returns {string | null} if picture exist return it, otherwise return null
   */
  const getUserPictureUrl = async (userId) => {
    try {
      // defining firebase folder ref for user profile picture folder
      const folderRef = ref(storage, `${userId}/profile-picture`);

      // getting the contents of folder
      const fileList = await listAll(folderRef);

      // extracting the last element from array of files in the folder
      const latestProfilePic = fileList.items.pop();

      // if file exists proceed, otherwise return null
      if (latestProfilePic) {
        // get the url of found file in storage
        const url = await getDownloadURL(latestProfilePic);
        return url;
      } else return null;
    } catch (error) {
      throw new Error("url fetchig has failed", error);
    }
  };

  return {
    uploadProfilePic,
    deleteOldProfilePics,
    getUserPictureUrl,
  };
};

export default useFirebase;
