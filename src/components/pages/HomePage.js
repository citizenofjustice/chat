import styles from "./HomePage.module.scss";
import appImageAuth from "../../assets/tabletHQ.png";
import appImageInitial from "../../assets/initialHQ.png";
import appImageChat from "../../assets/monitorHQ.png";

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
      {/* <div className={styles.desk} /> */}
      {/* <div>
        <ul className={styles.description}>
          <li className={styles.items}>
            <div>Функционал</div>
            <ul>
              <li>Регистрация/Авторизация пользователя.</li>
              <li>
                Загрузка изображения на сервер, для отображения иконки профиля.
              </li>
              <li>
                Взаимодействие с базой данных, для отправки и получения
                сообщений. Обновление сообщений в реальном времени.
              </li>
              <li>
                Смена электронной почты, пароля, никнейма, изображения профиля.
                С поледующим отражением изменений в чате.
              </li>
              <li>
                Хранение токена для сохранения сессии авторизированного
                пользователя в течении часа. По его истечению принудительное
                удаление токена.
              </li>
              <li>
                Наличие адаптивной верстки для удобного отображения на
                устройствах с разной шириной экрана.
              </li>
            </ul>
          </li>
          <li>
            <div>Для начала работы:</div>
            <div>
              Чтобы воспользоваться приложением, требуется регистрация с помощью
              электронной почты и пароля. Затем нужно инициализировать учетную
              запись, а именно выбрать никнейм, который бутет отображаться у вас
              в чате.
            </div>
          </li>
          <li>
            <div>Title</div>
            <div>description description description</div>
          </li>
        </ul>
      </div> */}
    </section>
  );
};

export default HomePage;
