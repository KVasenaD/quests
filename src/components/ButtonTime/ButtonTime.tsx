import React from 'react';
import './ButtonTime.css';
import Modal from '../Modal/Modal';

type ButtonTimeProps = {
  time: string;
  free: boolean;
  price: number;
  name: string;
  date: string;
  apiId: string;
};
type ButtonTimeState = {
  isModal: boolean;
  success: boolean;
};
class ButtonTime extends React.Component<ButtonTimeProps, ButtonTimeState> {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false,
      success: false,
    };
  }

  render() {
    const onClose = () => this.setState({ isModal: false, success: false });
    const successButton = () => this.setState({ success: true });
    let color;
    if (this.props.price <= 3000) {
      color = 'darkBlue';
    } else if (this.props.price <= 3500) {
      color = 'blue';
    } else if (this.props.price <= 4000) {
      color = 'green';
    } else if (this.props.price <= 4500) {
      color = 'orange';
    } else if (this.props.price <= 5000) {
      color = 'red';
    } else if (this.props.price <= 5500) {
      color = 'purple';
    }
    return (
      <>
        {this.props.free ? (
          <button
            className={color}
            onClick={() => this.setState({ isModal: true })}
          >
            <Modal
              time={this.props.time}
              price={this.props.price}
              date={this.props.date}
              visible={this.state.isModal}
              success={this.state.success}
              title={`Забронировать квест "${this.props.name}"`}
              footer={<button onClick={onClose}>Забронировать</button>}
              onClose={onClose}
              free={this.props.free}
              successButton={successButton}
              apiId={this.props.apiId}
            />
            {this.props.time}
          </button>
        ) : (
          <button disabled>
            <Modal
              time={this.props.time}
              price={this.props.price}
              date={this.props.date}
              visible={this.state.isModal}
              success={this.state.success}
              title={`Забронировать квест "${this.props.name}"`}
              footer={<button onClick={onClose}>Забронировать</button>}
              onClose={onClose}
              free={this.props.free}
              successButton={successButton}
              apiId={this.props.apiId}
            />
            {this.props.time}
          </button>
        )}
      </>
    );
  }
}
export default ButtonTime;
