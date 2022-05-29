import React, { FC } from 'react';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import config from '../config';
import styles from './PersonalAccount.module.css';
import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, ref, child, get,onValue } from 'firebase/database';
import Comment from './Comment';

export function withRouter(Children) {
  return (props) => {
    const { id } = useParams();
    const match = { params: useParams() };
    return <Children {...props} id={id} match={match} />;
  };
}
class PersonalAccount extends React.Component<any, any> {
  constructor(props) {
    super(props);
    const app = initializeApp(config);
    this.state = {
      comments: [],
      update: false,
      newComment: '',
    };
  }
  componentDidMount() {
    const db = getDatabase();
    const starCountRef = ref(db, 'comments/' + this.props.id);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      this.setState({comments : data});
    });
  }

  getComments() {
    let content = new Array();
    for (let comment in this.state.comments) {
      const item = this.state.comments[comment];
      content.push(
        <Comment userId={this.props.id} questId={comment} item={item} />,
      );
    }
    return content;
  }
  render() {
    const auth = getAuth();
    return (
      <main>
        <h1>Личный кабинет</h1>
        <section className={styles.commentsBox}>
          <span className={styles.head}>
            <h2>Мои отзывы {this.props.user}</h2>
            <Link
              to="/"
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    console.log('user signed out');
                  })
                  .catch((error) => {
                    console.log('error', error);
                  });
              }}
            >
              <button className={styles.exit}>Выход</button>
            </Link>
          </span>
          {this.state.comments == null ? (
            <h3>Нет отзывов</h3>
          ) : (
            <div className={styles.result}>
              <div className={cn(styles.grid_init, styles.grid)}>
                {this.getComments()}
              </div>
            </div>
          )}
        </section>
      </main>
    );
  }
}
export default withRouter(PersonalAccount);
