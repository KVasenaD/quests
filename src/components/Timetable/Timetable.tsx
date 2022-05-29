import React from 'react';
import cn from 'classnames';
import ButtonTime from '../ButtonTime/ButtonTime';
import styles from './Timetable.module.css';

class Timetable extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { data: [], isFetching: true, error: null };
  }
  componentDidMount() {
    this.fetchData();
    this.timer = setInterval(() => this.fetchData(), 1000 * 60);
  }

  componentWillUnmount() {
    this.timer = null;
  }
  timer;
  fetchData = async () => {
    let data = fetch(`../timetable/${this.props.apiId}.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((result) => this.setState({ data: result, isFetching: false }));
  };
  getWeekDay(date) {
    let days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

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
    let map = {};
    this.state.data.map((date) => {
      let key = String(date.date);
      if (date.date in map == false) {
        map[date.date] = [];
        map[key].push([date.time, date.is_free, date.price]);
      } else {
        map[key].push([date.time, date.is_free, date.price]);
      }
    });
    return (
      <section className={styles.timetable}>
        {Object.keys(map).map((date) => {
          return (
            <div className={styles.rows}>
              <span className={styles.date}>
                <p>{new Date(date).getDate()}</p>
                <p> {this.getMonths(new Date(date))}</p>
                <p className={styles.weekDay}>
                  ({this.getWeekDay(new Date(date))})
                </p>
              </span>
              <span className={styles.time}>
                {map[date].map((time) => (
                  <>
                    <ButtonTime
                      name={this.props.name}
                      time={time[0]}
                      free={time[1]}
                      price={time[2]}
                      date={date}
                      apiId={this.props.apiId}
                    />
                  </>
                ))}
              </span>
            </div>
          );
        })}
      </section>
    );
  }
}
export default Timetable;
