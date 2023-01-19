import {
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
  ref,
} from "firebase/storage";
import { storage } from "../firebase";

const useFirebase = () => {
  const uploadProfilePic = async (filePath, profilePic, oldImagesFolder) => {
    try {
      await deleteOldProfilePics(oldImagesFolder);
      const snapshot = await uploadBytes(filePath, profilePic);
      const fileUrl = await getDownloadURL(snapshot.ref);
      return fileUrl;
    } catch (err) {
      throw new Error("upload failed. ", err);
    }
  };

  const deleteOldProfilePics = async (folderRef) => {
    try {
      const fileList = await listAll(folderRef);
      if (fileList.items.length > 0) {
        fileList.items.forEach((item) => {
          deleteObject(item);
        });
      }
    } catch (err) {
      throw new Error("delete failed. ", err);
    }
  };

  const getUserPictureUrl = async (userId) => {
    const folderRef = ref(storage, `${userId}/profile-picture`);
    const fileList = await listAll(folderRef);
    const latestProfilePic = fileList.items.pop();
    if (latestProfilePic) {
      const url = await getDownloadURL(latestProfilePic);
      return url;
    } else return null;
  };

  return {
    uploadProfilePic,
    deleteOldProfilePics,
    getUserPictureUrl,
  };
};
export default useFirebase;
