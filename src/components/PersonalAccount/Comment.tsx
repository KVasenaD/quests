import React from 'react';
import cn from 'classnames';
import styles from './PersonalAccount.module.css';
import { initializeApp } from 'firebase/app';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';
import config from '../config';
import { getDatabase, ref, remove, update } from 'firebase/database';

class Comment extends React.Component<any, any> {
  constructor(props) {
    super(props);
    const app = initializeApp(config);
    this.state = {
      comments: [],
      update: false,
      newComment: '',
      item: this.props.item.comment,
    };
  }
  handleSubmit = () => {
    this.setState({ update: false, item: this.state.item });
    this.writeCommentsUser(
      this.props.userId,
      this.props.questId,
      this.props.item.quest,
      this.state.item,
    );
    this.writeQuestComments(
      this.props.userId,
      this.props.questId - 1,
      this.state.item,
    );
  };

  writeCommentsUser(userId, questId, questName, comment) {
    const db = getDatabase();
    update(ref(db, 'comments/' + userId + '/' + questId), {
      comment: comment,
    });
  }
  writeQuestComments(userId, questId, comment) {
    const db = getDatabase();
    update(ref(db, 'quests/' + questId + '/' + 'comments/' + userId), {
      comment: comment,
    });
  }
  changeComments = () => {
    this.setState({ update: true });
  };
  removeComments = () => {
    const db = getDatabase();
    remove(
      ref(
        db,
        'quests/' +
          (this.props.questId - 1) +
          '/' +
          'comments/' +
          this.props.userId,
      ),
    );
    remove(ref(db, 'comments/' + this.props.userId + '/' + this.props.questId));
  };
  render() {
    const item = this.props.item;
    return (
      <div className={cn(styles.box_init, styles.box)}>
        <span className={styles.questName}>
          <Link to={`/quest/${this.props.questId}`}>
            <h3>"{item.quest}"</h3>
          </Link>
        </span>

        {this.state.update ? (
          <>
            <span key={item.quest} className={styles.comment}>
              <textarea
                name="comment"
                placeholder="Отзыв"
                value={this.state.item}
                onChange={(e) => this.setState({ item: e.target.value })}
              ></textarea>
            </span>
            <button className={styles.change} onClick={this.handleSubmit}>
              Отправить
            </button>
          </>
        ) : (
          <>
            <span key={item.quest} className={styles.comment}>
              <FontAwesomeIcon
                icon={faAngleDoubleLeft}
                className={styles.left}
                color="rgb(65, 160, 220)"
              />
              <p>{this.state.item}</p>
              <FontAwesomeIcon
                icon={faAngleDoubleRight}
                className={styles.right}
                color="rgb(65, 160, 220)"
              />
            </span>
            <button className={styles.change} onClick={this.changeComments}>
              Изменить
            </button>
            <button className={styles.remove} onClick={this.removeComments}>
              Удалить
            </button>
          </>
        )}
      </div>
    );
  }
}
export default Comment;
