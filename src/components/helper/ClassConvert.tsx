import React, { FC } from 'react';
import styles from '../AboutQuest/AboutQuest.module.css';

type ClassConvertProps = {
  price: number;
};
const ClassConvert: FC<ClassConvertProps> = ({ price }) => {
  let btnColor;

  if (price <= 3000) {
    btnColor = <button className={styles.darkBlue}>{price}</button>;
  } else if (price <= 3500) {
    btnColor = <button className={styles.blue}>{price}</button>;
  } else if (price <= 4000) {
    btnColor = <button className={styles.green}>{price}</button>;
  } else if (price <= 4500) {
    btnColor = <button className={styles.orange}>{price}</button>;
  } else if (price <= 5000) {
    btnColor = <button className={styles.red}>{price}</button>;
  } else if (price <= 5500) {
    btnColor = <button className={styles.purple}>{price}</button>;
  }

  return <>{btnColor}</>;
};
export default ClassConvert;
