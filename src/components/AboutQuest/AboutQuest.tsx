import React from 'react';
import {  useParams } from 'react-router-dom';
import { getDatabase, ref, child, get,onValue } from 'firebase/database';
import styles from './AboutQuest.module.css';
import Level from '../Level/Level';
import Horror from '../Horror/Horror';
import Slider from '../Slider/Slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import Timetable from '../Timetable/Timetable';
import Comments from '../Comments/Comments';
import { initializeApp } from 'firebase/app';
import config from '../config';
import { useSelector } from 'react-redux';
import { getAuth } from 'firebase/auth';
import ModalError from '../ModalError/ModalError';
import Feedback from '../Feedback/Feedback';
import ClassConvert from '../helper/ClassConvert';

type AboutQuestState = {
  isModal: boolean;
  quests;
  success: boolean;
  comments;
};
type AboutQuestProps = {
  id: number;
  user;
};
interface RootState {
  auth;
}
export function withRouter(Children) {
  return (props) => {
    const user = useSelector((state: RootState) => state.auth);
    const { id } = useParams();
    const match = { params: useParams() };
    return <Children {...props} id={id} match={match} user={user} />;
  };
}

class AboutQuest extends React.Component<AboutQuestProps, AboutQuestState> {
  constructor(props) {
    super(props);
    initializeApp(config);
    const auth = getAuth();

    this.state = {
      quests: [],
      isModal: false,
      success: false,
      comments: []
    };
  }

  useSelector = (state: RootState) => state.auth;
  componentDidMount() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `quests`)).then((snapshot) => {
      let result = snapshot.val().filter((quest) => quest.id == this.props.id);
      this.setState({ quests: result });
    });
    const db = getDatabase();
    const starCountRef = ref(db, `quests/` + (this.props.id-1) + '/comments');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      this.setState({comments : data});
    });
  }
  getButtonPrice() {
    let buttons = new Array();
    this.state.quests[0].priceButton.map((item) => {
      buttons.push(<ClassConvert price={item} />);
    });
    return buttons;
  }

  render() {
    const onClose = () => this.setState({ isModal: false, success: false });
    const successButton = () => this.setState({ success: true });
    return (
      <>
        {this.state.quests.map((quest) => (
          <main className={styles.about}>
            <header className={styles.head}>
              <h1>?????????? "{quest.name}"</h1>
              <span className={styles.characters}>
                <span className={styles.character}>
                  <h4>??????????????</h4>
                  <p>
                    {quest.minCount}-{quest.maxCount}
                  </p>
                </span>
                <span className={styles.character}>
                  <h4>??????????</h4>
                  <p>{quest.time}</p>
                </span>
                <span className={styles.character}>
                  <h4>??????????????????</h4>
                  <p>
                    <Level level={quest.level} />
                  </p>
                </span>
                <span className={styles.character}>
                  <h4>??????????</h4>
                  <p>
                    <Horror horror={quest.horror} />
                  </p>
                </span>
                <span className={styles.character}>
                  <h4>??????????????</h4>
                  <p>{quest.age}+</p>
                </span>
              </span>
            </header>
            <section className={styles.buttons}>
              <a href="#booking">??????????????????????</a>
              <a href="#feedback">????????????</a>
            </section>
            <section>
              <h2>????????????????</h2>
              <p>{quest.legend}</p>
              <h2>??????????????????????</h2>
              <p>{quest.features}</p>
              <p>{quest.discount}</p>
              <p>
                <span>???????????????????? ??????????????????????: </span>
                {quest.age}+
              </p>
            </section>
            <section className={styles.contacts}>
              <span className={styles.adress}>
                <p>
                  <FontAwesomeIcon icon={faMapMarkerAlt} color="red" />
                </p>
                <p>
                  ??.
                  {quest.metro}, {quest.adress}
                </p>
              </span>
              <span className={styles.phone}>
                <p>
                  <FontAwesomeIcon icon={faPhone} color="lightsalmon" />
                </p>
                <span>{quest.number}</span>
              </span>
            </section>
            <section>
              <Slider img={quest.img} id={quest.id} />
            </section>
            <section id="booking">
              <h2>???????????? ????????????????????????</h2>
              <span className={styles.price}>
                <p>?????????????????? ????????:</p>
                <span className={styles.btnPrice}>{this.getButtonPrice()}</span>
              </span>
              <p>{quest.aboutPrice}</p>
              <Timetable name={quest.name} apiId={quest.apiId} />
            </section>
            <section>
              <span className={styles.feedback} id="feedback">
                <h2>????????????</h2>

                <button
                  className={styles.feedbackBtn}
                  onClick={() => this.setState({ isModal: true })}
                >
                  {this.props.user.uid !== undefined ? (
                    <Comments
                      userId={this.props.user.uid}
                      questId={this.props.id}
                      questName={quest.name}
                      name={quest.name}
                      visible={this.state.isModal}
                      onClose={onClose}
                      successButton={successButton}
                      success={this.state.success}

                    />
                  ) : (
                    <ModalError
                      visible={this.state.isModal}
                      onClose={onClose}
                    />
                  )}
                  ???????????????? ??????????
                </button>
              </span>
              <Feedback id={quest.id - 1} comments={this.state.comments}/>
            </section>
          </main>
        ))}
      </>
    );
  }
}
export default withRouter(AboutQuest);
