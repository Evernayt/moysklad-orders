import { Button, Modal } from 'components';
import React from 'react';
import './NewOrderModal.css';

const NewOrderModal = ({ isShowing, setIsShowing }) => {
  const newOrder = () => {
    localStorage.removeItem('orderedData');
    localStorage.removeItem('absentData');
    window.location.reload();
  };

  return (
    <Modal title="Новый заказ" isShowing={isShowing}>
      <span className="new-order-modal-message">
        Вы уверены что хотите начать новый заказ?
      </span>
      <div className="new-order-modal-controls">
        <Button
          style={{ marginRight: '8px' }}
          onClick={() => setIsShowing(false)}
        >
          Отмена
        </Button>
        <Button appearance="primary" onClick={newOrder}>
          Новый заказ
        </Button>
      </div>
    </Modal>
  );
};

export default NewOrderModal;
