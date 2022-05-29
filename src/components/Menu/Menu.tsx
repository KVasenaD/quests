import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../icons/logo.svg';
import styles from './Menu.module.css';
import { initializeApp } from 'firebase/app';
import config from '../config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { saveUser } from '../../redux/slice/authSlice';

const Menu = () => {
  interface RootState {
    auth;
  }
  initializeApp(config);
  const auth = getAuth();
  const user = useSelector((state: RootState) => state.auth);
  console.log('user from state', user);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        dispatch(saveUser(user.uid));
      } else {
        dispatch(saveUser(undefined));
      }
    });
  }, [auth, dispatch]);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="Логотип" />
        Quests
      </Link>
      {console.log(user.uid)}
      {user.uid !== undefined ? (
        <Link to={`/account/${user.uid}`} className={styles.auth}>
          <img
            src={require('../../icons/user.svg').default}
            alt="Личный кабинет"
          />
        </Link>
      ) : (
        <Link to="/auth" className={styles.auth}>
          <img
            src={require('../../icons/user.svg').default}
            alt="Авторизация"
          />
        </Link>
      )}
    </header>
  );
};
export default Menu;
