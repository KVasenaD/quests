import React, { FC, ReactElement } from 'react';
import '../Modal/Modal.css';
import Auth from '../Auth/Auth';

// интерфейс для пропсов
type ModalErrorProps = {
  onClose: () => void;
  visible: boolean;
};

const ModalError: FC<ModalErrorProps> = ({ onClose, visible }) => {
  // создаем обработчик нажатия клавиши Esc
  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  });
  if (visible == false) return null;
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Необходимо зарегестрироваться!</h2>
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <div className="modal-content">
            <Auth />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalError;
