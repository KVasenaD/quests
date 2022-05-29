import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './Search.module.css';

export default class Search extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.SearchClick = this.SearchClick.bind(this);
    this.state = {
      search: false,
      selectValueLevel: '4',
      selectValueAge: '100',
      selectValueCount: '2.5',
      requirementKey: Math.random(),
    };
  }
  SearchClick() {
    this.setState({ requirementKey: Math.random() });
    this.props.onChange(
      this.state.selectValueLevel,
      this.state.selectValueAge,
      this.state.selectValueCount,
    );
  }
  handleChangeLevel = (event) => {
    this.setState({ selectValueLevel: event.target.value });
  };
  handleChangeAge = (event) => {
    this.setState({ selectValueAge: event.target.value });
  };
  handleChangeCount = (event) => {
    this.setState({ selectValueCount: event.target.value });
  };
  render() {
    return (
      <article className={styles.search}>
        <h1>Подбор квеста</h1>
        <div className={styles.search_box}>
          <label>
            <select
              id="level"
              className={styles.select}
              value={this.state.selectValueLevel}
              onChange={this.handleChangeLevel}
            >
              <option value="4" selected>
                Уровень
              </option>
              <option value="1">Лёгкий</option>
              <option value="2">Средний</option>
              <option value="3">Сложный</option>
            </select>
          </label>
          <label>
            <select
              id="age"
              className={styles.select}
              value={this.state.selectValueAge}
              onChange={this.handleChangeAge}
            >
              <option value="100" selected>
                Возраст
              </option>
              <option value="6">6+</option>
              <option value="12">12+</option>
              <option value="14">14+</option>
              <option value="16">16+</option>
            </select>
          </label>
          <label>
            <select
              id="count"
              className={styles.select}
              value={this.state.selectValueCount}
              onChange={this.handleChangeCount}
            >
              <option value="2.5" selected>
                Игроков
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10+</option>
            </select>
          </label>
          <a href="#" className={styles.button} onClick={this.SearchClick}>
            <FontAwesomeIcon icon={faSearch} color="white" />
            <p>Найти</p>
          </a>
        </div>
      </article>
    );
  }
}
