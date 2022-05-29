import React from 'react';
import styles from './Form.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {
  faCalendarDays,
  faMoneyBill1Wave,
  faClock,
  faPhone,
  faAt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

type FormProps = {
  success?: boolean;
  time: string;
  date: string;
  price: number;
  successButton: () => void;
  onClose: () => void;
  apiId: string;
};
export default class Form extends React.Component<FormProps, any> {
  constructor(props) {
    super(props);

    this.state = {};
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    let array = {
      first_name: this.state.first_name,
      family_name: this.state.family_name,
      email: this.state.email,
      phone: this.state.phone,
      time: this.props.time,
      date: this.props.date,
    };
    let response = await fetch(`../booking/${this.props.apiId}.php`, {
      method: 'POST',
      body: JSON.stringify(array),
    });

    this.props.successButton();
  };
  getWeekDay(date) {
    let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

    return days[date.getDay()];
  }
  getMonths(month) {
    let months = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ];
    return months[month.getMonth()];
  }
  render() {
    return (
      <>
        <section>
          <span>
            <FontAwesomeIcon icon={faCalendarDays} color="rgb(228, 126, 86)" />
            <h4>
              {new Date(this.props.date).getDate()}{' '}
              {this.getMonths(new Date(this.props.date))}
            </h4>
          </span>
          <span>
            <FontAwesomeIcon
              icon={faMoneyBill1Wave}
              color="rgb(228, 126, 86)"
            />
            <h4>{this.props.price} р.</h4>
          </span>
          <span>
            <FontAwesomeIcon icon={faClock} color="rgb(228, 126, 86)" />
            <h4>{this.props.time}</h4>
          </span>
        </section>
        <section id={styles.form}>
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
                <span>
                  <FontAwesomeIcon icon={faUser} color="#606468" />
                </span>
                <input
                  type="text"
                  value={this.state.family_name}
                  placeholder="Фамилия"
                  onChange={(e) =>
                    this.setState({ family_name: e.target.value })
                  }
                  required
                />
              </p>
              <p>
                <span>
                  <FontAwesomeIcon icon={faPhone} color="#606468" />
                </span>
                <input
                  type="text"
                  value={this.state.phone}
                  placeholder="Телефон"
                  onChange={(e) => this.setState({ phone: e.target.value })}
                  required
                />
              </p>
              <p>
                <span>
                  <FontAwesomeIcon icon={faAt} color="#606468" />
                </span>
                <input
                  type="text"
                  value={this.state.email}
                  placeholder="Email"
                  onChange={(e) => this.setState({ email: e.target.value })}
                  required
                />
              </p>
              <input type="submit" value="ЗАБРОНИРОВАТЬ" />
            </fieldset>
          </form>
        </section>
      </>
    );
  }
}
