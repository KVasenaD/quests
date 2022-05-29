import React from 'react';
import styles from '../Slider/Slider.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default class LazyLoad extends React.Component<any, any> {
  render() {
    const settings = {
      centerPadding: '0px',
      dots: true,
      fade: true,
      infinite: true,
      autoplay: true,
      arrows: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
    };
    return (
      <div className={styles.slick}>
        <Slider {...settings}>
          <div>
            <img src={require(`../../img/${this.props.id}/1.jpg`).default} />
          </div>
          <div>
            <img src={require(`../../img/${this.props.id}/2.jpg`).default} />
          </div>
          <div>
            <img src={require(`../../img/${this.props.id}/3.jpg`).default} />
          </div>
        </Slider>
      </div>
    );
  }
}
