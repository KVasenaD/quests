import React, { FC, ReactElement } from 'react';
import styles from './Comments.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { getDatabase, get,child,ref, set } from 'firebase/database';

type CommentsProps = {
  visible: boolean;
  onClose: () => void;
  name: string;
  successButton: () => void;
  success: boolean;
  userId: string;
  questId: number;
  questName: string;
};
export default class Comments extends React.Component<CommentsProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      first_name: '',
      comments: []
    };
  }
  // создаем обработчик нажатия клавиши Esc
  onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        this.props.onClose();
        break;
    }
  };
  handleSubmit = () => {
    this.props.successButton();
    this.writeCommentsUser(
      this.props.userId,
      this.props.questId,
      this.props.questName,
      this.state.comment,
    );
    this.writeQuestComments(
      this.props.userId,
      this.props.questId - 1,
      this.state.first_name,
      this.state.comment,
    );
    const dbRef = ref(getDatabase());
    get(child(dbRef, `quests/`+ this.props.questId + `/comments`)).then(
      (snapshot) => {
        let result = snapshot.val();
        this.setState({ comments: result });
      },
    );
  };
  useEffect = () => {
    document.addEventListener('keydown', this.onKeydown);
    return () => document.removeEventListener('keydown', this.onKeydown);
  };
  writeCommentsUser(userId, questId, questName, comment) {
    const db = getDatabase();
    const dbRef = ref(getDatabase());
    set(ref(db, 'comments/' + userId + '/' + questId), {
      quest: questName,
      comment: comment,
    });

  }
  writeQuestComments(userId, questId, name, comment) {
    const db = getDatabase();
    set(ref(db, 'quests/' + questId + '/' + 'comments/' + userId), {
      username: name,
      comment: comment,
    });
  }
  render() {
    if (this.props.visible == false) return null;

    return (
      <div className="modal" onClick={this.props.onClose}>
        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
          {this.props.success ? (
            <div className="modal-header">
              <h2 className="modal-title">Спасибо за отзыв!</h2>
              <span className="modal-close" onClick={this.props.onClose}>
                &times;
              </span>
            </div>
          ) : (
            <>
              <div className="modal-header">
                <h2 className="modal-title">Отзыв</h2>
                <span className="modal-close" onClick={this.props.onClose}>
                  &times;
                </span>
              </div>
              <div className="modal-body">
                <div className="modal-content">
                  <section id="form">
                    <div id={styles.form}>
                      <form onSubmit={this.handleSubmit}>
                        <fieldset className={styles.clearfix}>
                          <h2>{this.state.success}</h2>
                          <h3>{this.state.alarm}</h3>
                          <p>
                            <span>
                              <FontAwesomeIcon icon={faUser} color="#606468" />
                            </span>
                            <input
                              type="text"
                              value={this.state.first_name}
                              placeholder="Имя"
                              onChange={(e) =>
                                this.setState({ first_name: e.target.value })
                              }
                              required
                            />
                          </p>
                          <p>
                            <textarea
                              name="comment"
                              placeholder="Отзыв"
                              value={this.state.comment}
                              onChange={(e) =>
                                this.setState({ comment: e.target.value })
                              }
                            ></textarea>
                          </p>

                          <input type="submit" value="ОТПРАВИТЬ" />
                        </fieldset>
                      </form>
                    </div>
                  </section>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}
