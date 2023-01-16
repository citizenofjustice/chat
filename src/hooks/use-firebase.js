import {
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

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

  return {
    uploadProfilePic,
    deleteOldProfilePics,
  };
};
export default useFirebase;
