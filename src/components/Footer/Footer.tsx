import styles from './Footer.module.css';

const Footer = () => {
  let date = new Date().getFullYear();
  return (
    <footer>
      Quests &copy; 2020 - {date}
      <div className={styles.developer}>
        Разработка: <a href="https://t.me/lisa41014">FoxNet</a>
      </div>
    </footer>
  );
};
export default Footer;
