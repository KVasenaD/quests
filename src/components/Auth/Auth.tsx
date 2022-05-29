import React from 'react';
import { Navigate } from 'react-router';
import styles from '../Auth/Auth.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { initializeApp } from 'firebase/app';
import config from '../config';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

type RegState = {
  alarm: string;
  success: string;
  email: string;
  password: string;
  redirect: boolean;
  user;
  reg: boolean;
};
type RegProps = {};
export default class Reg extends React.Component<RegProps, RegState> {
  constructor(props) {
    super(props);
    this.state = {
      alarm: '',
      success: '',
      email: '',
      password: '',
      redirect: false,
      user: '',
      reg: true,
    };
  }

  handleRegister = () => {
    initializeApp(config);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Registered user: ', user);
        this.setState({
          success: 'Добро пожаловать!',
          redirect: true,
          user: user,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == 'auth/invalid-email') {
          this.setState({ alarm: 'Ошибка в email' });
        }
        if (errorCode == 'auth/weak-password') {
          this.setState({ alarm: 'Пароль должен состоять из 6 символов' });
        }
        console.log('Error ocured: ', errorCode, errorMessage);
      });
  };
  handleLogin = () => {
    initializeApp(config);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Singed in user: ', user);
        this.setState({
          success: 'Добро пожаловать!',
          redirect: true,
          user: user,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode == 'auth/user-not-found');
        if (errorCode == 'auth/user-not-found') {
          this.setState({ alarm: 'Пользователь не найден!' });
        }
        if (errorCode == 'auth/wrong-password') {
          this.setState({ alarm: 'Неверный пароль!' });
        }
        if (errorCode == 'auth/invalid-email') {
          this.setState({ alarm: 'Некорректный email!' });
        }
        console.log('An error occured: ', errorCode);
      });
  };
  changeModalAuth = () => {
    this.setState({ reg: false });
  };
  changeModalReg = () => {
    this.setState({ reg: true });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Navigate to={`/account/${this.state.user.uid}`} />;
    }
  };
  render() {
    return (
      <main id={styles.login}>
        <form action="javascript:void(0);" method="get">
          <fieldset className={styles.clearfix}>
            <h2>{this.state.success}</h2>
            <h3>{this.state.alarm}</h3>
            <p>
              <span>
                <FontAwesomeIcon icon={faUser} color="#606468" />
              </span>
              <input
                type="text"
                value={this.state.email}
                placeholder="Логин"
                onChange={(e) => this.setState({ email: e.target.value })}
                required
              />
            </p>
            <p>
              <span>
                <FontAwesomeIcon icon={faLock} color="#606468" />
              </span>
              <input
                type="password"
                value={this.state.password}
                placeholder="Пароль"
                onChange={(e) => this.setState({ password: e.target.value })}
                required
              />
            </p>
            {this.state.reg ? (
              <p>
                {this.renderRedirect()}
                <input
                  type="submit"
                  value="РЕГИСТРАЦИЯ"
                  onClick={this.handleRegister}
                />
              </p>
            ) : (
              <p>
                {this.renderRedirect()}
                <input type="submit" value="ВОЙТИ" onClick={this.handleLogin} />
              </p>
            )}
          </fieldset>
        </form>

        {this.state.reg ? (
          <p>
            Есть аккаунт? <a onClick={this.changeModalAuth}>Войти</a>
          </p>
        ) : (
          <p>
            Нет аккаунта? <a onClick={this.changeModalReg}>Регистрация</a>
          </p>
        )}
      </main>
    );
  }
}
