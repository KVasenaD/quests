import React, { FC } from 'react';
import styles from '../AboutQuest/AboutQuest.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain } from '@fortawesome/free-solid-svg-icons';

type LevelProps = {
  level: number;
};
const Level: FC<LevelProps> = ({ level }) => {
  let levelNum;
  if (level == 3) {
    levelNum = (
      <div className={styles.icons}>
        <FontAwesomeIcon icon={faBrain} color="white" />
        <FontAwesomeIcon icon={faBrain} color="white" />
        <FontAwesomeIcon icon={faBrain} color="white" />
      </div>
    );
  } else if (level == 2) {
    levelNum = (
      <div className={styles.icons}>
        <FontAwesomeIcon icon={faBrain} color="white" />
        <FontAwesomeIcon icon={faBrain} color="white" />
      </div>
    );
  } else if (level == 1) {
    levelNum = <FontAwesomeIcon icon={faBrain} color="white" />;
  }

  return <>{levelNum}</>;
};
export default Level;
