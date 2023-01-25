import styles from "./RoundImage.module.scss";

/**
 * UI component displaing picture in a circle form (with different sizes depending on props)
 * @param {string} props.size - name of the css class for customizing size of component
 * @param {string | object} props.profilePic - path to a image file or its url
 * @param {string} props.alt - alt HTML <img> attribute, alternative text for the image
 * @returns render of round image component
 */
const RoundImage = (props) => {
  const pageAndSize = props.size;

  return (
    <div className={styles[pageAndSize]}>
      <img className={styles.image} src={props.profilePic} alt={props.alt} />
    </div>
  );
};

export default RoundImage;
