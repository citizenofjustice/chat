import {
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const useFirebase = () => {
  const changeProfilePic = async (filePath, profilePic, oldImagesFolder) => {
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

  const getNewestProfilePicUrl = async (folderRef) => {
    const fileList = await listAll(folderRef);
    const newestProfilePic = fileList.items.pop();
    if (newestProfilePic) {
      const url = await getDownloadURL(newestProfilePic);
      return url;
    } else {
      const defaultProfilePicUrl =
        "https://firebasestorage.googleapis.com/v0/b/chat-app-1e2f6.appspot.com/o/placeholderAvatar.png?alt=media&token=64b3db7b-0f9a-4a53-8ce8-45d77839f1cf";
      return defaultProfilePicUrl;
    }
  };

  return {
    changeProfilePic,
    deleteOldProfilePics,
    getNewestProfilePicUrl,
  };
};
export default useFirebase;
