import React from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMale,
  faMapMarkerAlt,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Home.module.css';
import Search from '../Search/Search';
import Level from '../Level/Level';
import { Link } from 'react-router-dom';
import { getDatabase, ref, child, get } from 'firebase/database';
import load from '../../icons/search.svg';

export default class Home extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      quests: [],
      selectValueLevel: '',
      selectValueAge: '',
      selectValueCount: '',
      load: true,
    };
  }
  componentDidMount() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `quests`)).then((snapshot) => {
      let result = snapshot.val();

      this.setState({ quests: result });
    });
  }
  searchQuest = () => {
    const dbRef = ref(getDatabase());
    this.setState({ load: true });
    get(child(dbRef, `quests`)).then((snapshot) => {
      let result = snapshot.val();
      if (this.state.selectValueLevel == 4) {
        result = result.filter(
          (res) =>
            res.level <= this.state.selectValueLevel &&
            res.age <= this.state.selectValueAge &&
            res.minCount <= this.state.selectValueCount &&
            res.maxCount >= this.state.selectValueCount,
        );
      } else {
        result = result.filter(
          (res) =>
            res.level == this.state.selectValueLevel &&
            res.age <= this.state.selectValueAge &&
            res.minCount <= this.state.selectValueCount &&
            res.maxCount >= this.state.selectValueCount,
        );
      }
      this.setState({ quests: result, load: false });
    });
  };
  onChange = (level, age, count) => {
    this.setState({
      selectValueLevel: Number(level),
      selectValueAge: Number(age),
      selectValueCount: Number(count),
    });

    this.searchQuest();
  };
  render() {
    return (
      <main>
        <Search onChange={this.onChange} />
        <section className={styles.result}>
          {this.state.quests.length == 0 ? (
            <>
              {this.state.load ? <h2>Загрузка</h2> : <h2>Ничего не найдено</h2>}
            </>
          ) : (
            <div className={cn(styles.grid_init, styles.grid)}>
              {this.state.quests.map((quest) => (
                <div key={quest.id} className={cn(styles.box_init, styles.box)}>
                  <div className={styles.image_text}>
                    <Link to={`/quest/${quest.id}`}>
                      <img
                        src={require(`../../img/${quest.id}/1.jpg`).default}
                      />
                    </Link>
                    <div className={styles.label}>{quest.age}+</div>
                    <div className={styles.text}>
                      <h2>{quest.name}</h2>
                      <div className={styles.image_text_metro}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} color="red" />
                        <h3>{quest.metro}</h3>
                      </div>
                    </div>
                  </div>
                  <div className={styles.btn_group}>
                    <div className={styles.level_count}>
                      <div className={styles.level}>
                        <Level level={quest.level} />
                      </div>
                      <div className={styles.count}>
                        <p>
                          {quest.minCount}-{quest.maxCount}
                        </p>
                        <FontAwesomeIcon icon={faMale} color="white" />
                      </div>
                    </div>
                    <Link to={`/quest/${quest.id}`} className={styles.btn}>
                      <p>Бронировать</p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    );
  }
}
