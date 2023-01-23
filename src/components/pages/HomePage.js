import appImageAuth from "../../assets/tabletHQ.png";
import appImageInitial from "../../assets/initialHQ.png";
import appImageChat from "../../assets/monitorHQ.png";
import styles from "./HomePage.module.scss";

/**
 * Components that renders homepage (with css figures)
 * @returns homepage
 */
const HomePage = () => {
  return (
    <section className={styles.homepage}>
      <div className={styles.headers}>
        <h1 className={styles.title}>SIMPLE Chat</h1>
        <p className={styles.tech}>
          WEB-приложение разарботано на ReactJS, с использованием технологий
          Redux/Redux-Toolkit, Redux-persist, React-Router, Firebase, SASS
        </p>
      </div>
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
    </section>
  );
};

export default HomePage;
