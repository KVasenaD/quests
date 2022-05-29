import React from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Feedback.module.css';
import { initializeApp } from 'firebase/app';
import config from '../config';
import { getDatabase, ref, child, get } from 'firebase/database';

export default class Feedback extends React.Component<any, any> {
  constructor(props) {
    super(props);
    const app = initializeApp(config);
    this.state = {
      comments: [],
    };
  }
  getComments() {
    let content = new Array();
    for (let comment in this.props.comments) {
      const item = this.props.comments[comment];
      content.push(
        <div className={cn(styles.box_init, styles.box)}>
          <span className={styles.username}>
            <h3>{item.username}</h3>
          </span>
          <span className={styles.comment}>
            <FontAwesomeIcon
              icon={faAngleDoubleLeft}
              className={styles.left}
              color="rgb(65, 160, 220)"
            />
            <p>{item.comment}</p>
            <FontAwesomeIcon
              icon={faAngleDoubleRight}
              className={styles.right}
              color="rgb(65, 160, 220)"
            />
          </span>
        </div>,
      );
    }
    return content;
  }
  render() {
    return (
      <div className={styles.result}>
        {this.props.comments !== null ? (
          <div className={cn(styles.grid_init, styles.grid)}>
            {this.getComments()}
          </div>
        ) : (
          <h2>Отзывов пока нет</h2>
        )}
      </div>
    );
  }
}
