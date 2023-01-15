import {
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import storage from "../firebase";

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

  const getCurrentPicPath = async (folderRef) => {
    const fileList = await listAll(folderRef);
    const newestProfilePic = fileList.items.pop();
    if (newestProfilePic) {
      // const url = await getDownloadURL(newestProfilePic);
      console.log(newestProfilePic);
      return newestProfilePic;
    } else return null;
    // await deleteOldProfilePics(folderRef);
  };

  /**
   * Moves a file in firebase storage from its current location to the destination
   * returns the status object for the moved file.
   * @param {String} currentPath The path to the existing file from storage root
   * @param {String} destinationPath The desired pathe for the existing file after storage
   */
  function moveFirebaseFile(oldRef, destinationPath) {
    // let oldRef = storage.ref().child(currentPath);
    console.log("oldRef", oldRef);

    getDownloadURL(oldRef).then((url) => {
      fetch(url).then((htmlReturn) => {
        let fileArray = new Uint8Array();
        const reader = htmlReturn.body.getReader();
        console.log("reader", reader);

        //get the reader that reads the readable stream of data
        reader
          .read()
          .then(function appendStreamChunk({ done, value }) {
            //If the reader doesn't return "done = true" append the chunk that was returned to us
            // rinse and repeat until it is done.
            if (value) {
              fileArray = new Int8Array(fileArray.length + value.length);
              fileArray.set(fileArray);
              fileArray.set(value, fileArray.length);
            }
            if (done) {
              console.log(fileArray);
              return fileArray;
            } else {
              // "Readout not complete, reading next chunk"
              return reader.read().then(appendStreamChunk);
            }
          })
          .then((file) => {
            //Write the file to the new storage place
            let status = storage.ref().child(destinationPath).put(file);
            //Remove the old reference
            oldRef.delete();

            return status;
          });
      });
    });
  }

  return {
    uploadProfilePic,
    deleteOldProfilePics,
    getCurrentPicPath,
    moveFirebaseFile,
  };
};
export default useFirebase;
