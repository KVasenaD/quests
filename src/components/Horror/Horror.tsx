import React, { FC } from 'react';
import styles from '../AboutQuest/AboutQuest.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkull } from '@fortawesome/free-solid-svg-icons';

type HorrorProps = {
  horror: string;
};
const Horror: FC<HorrorProps> = ({ horror }) => {
  let horrorNum;

  switch (horror) {
    case '0':
      horrorNum = <>Не страшный</>;
      break;
    case '1':
      horrorNum = <FontAwesomeIcon icon={faSkull} color="white" />;
      break;
    case '2':
      horrorNum = (
        <div className={styles.icons}>
          <FontAwesomeIcon icon={faSkull} color="white" />
          <FontAwesomeIcon icon={faSkull} color="white" />
        </div>
      );
      break;
    case '3':
      horrorNum = (
        <div className={styles.icons}>
          <FontAwesomeIcon icon={faSkull} color="white" />
          <FontAwesomeIcon icon={faSkull} color="white" />
          <FontAwesomeIcon icon={faSkull} color="white" />
        </div>
      );
      break;
  }

  return <>{horrorNum}</>;
};
export default Horror;
