import styles from "./HomePage.module.scss";
import appImageAuth from "../../assets/tabletHQ.png";
import appImageInitial from "../../assets/initialHQ.png";
import appImageChat from "../../assets/monitorHQ.png";

const HomePage = () => {
  return (
    <section className={styles.homepage}>
      <div className={styles.container}>
        <div className={styles["css-figures"]}>
          <div className={styles.images}>
            <div className={`${styles.tablet} ${styles.left}`}>
              <div className={styles.content}>
                <img src={appImageAuth} alt="app-promo" />
              </div>
            </div>
            <div className={`${styles.stand} ${styles.middle}`}>
              <div className={styles.monitor}>
                <img src={appImageChat} alt="app-promo" />
              </div>
            </div>
            <div className={`${styles.smartphone} ${styles.right}`}>
              <div className={styles.content}>
                <img src={appImageInitial} alt="app-promo" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul className={styles.description}>
        <li className={styles.items}>
          <div>Title</div>
          <div>description description description</div>
        </li>
        <li>
          <div>Title</div>
          <div>description description description</div>
        </li>
        <li>
          <div>Title</div>
          <div>description description description</div>
        </li>
      </ul>
    </section>
  );
};

export default HomePage;
