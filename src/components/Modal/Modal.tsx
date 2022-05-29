import React, { FC, ReactElement } from 'react';
import './Modal.css';
import Form from '../Form/Form';

// интерфейс для пропсов
type ModalProps = {
  visible: boolean;
  title: string;
  footer: ReactElement | string;
  time: string;
  price: number;
  date: string;
  success: boolean;
  successButton: () => void;
  onClose: () => void;
  free: boolean;
  apiId: string;
};
type ModalState = {
  success: boolean;
};
class Modal extends React.Component<ModalProps, ModalState> {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
    };
  }
  // создаем обработчик нажатия клавиши Esc
  onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        this.props.onClose();
        break;
    }
  };

  useEffect = () => {
    document.addEventListener('keydown', this.onKeydown);
    return () => document.removeEventListener('keydown', this.onKeydown);
  };

  // или возвращаем верстку модального окна

  render() {
    if (this.props.visible == false) return null;
    return (
      <div className="modal" onClick={this.props.onClose}>
        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
          {this.props.success ? (
            <div className="modal-header">
              <h2 className="modal-title">Квест забронирован!</h2>
              <span className="modal-close" onClick={this.props.onClose}>
                &times;
              </span>
            </div>
          ) : (
            <>
              {this.props.free ? (
                <>
                  <div className="modal-header">
                    <h2 className="modal-title">{this.props.title}</h2>
                    <span className="modal-close" onClick={this.props.onClose}>
                      &times;
                    </span>
                  </div>
                  <div className="modal-body">
                    <div className="modal-content">
                      <Form
                        time={this.props.time}
                        date={this.props.date}
                        price={this.props.price}
                        success={this.state.success}
                        successButton={this.props.successButton}
                        onClose={this.props.onClose}
                        apiId={this.props.apiId}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="modal-header">
                  <h2 className="modal-title">
                    Выбранное вами время заняли! :(
                  </h2>
                  <span className="modal-close" onClick={this.props.onClose}>
                    &times;
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}
export default Modal;
