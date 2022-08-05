import { Button, Modal, Textbox } from 'components';
import { NOT_INDICATED, SERVER_API_URL } from 'constants/app';
import { Context } from 'context';
import { enterPressHandler, getVariantParent } from 'helpers';
import { updateProductAPI } from 'http/productAPI';
import React, { useContext, useEffect, useState } from 'react';
import './EditModal.css';

const EditModal = ({ isShowing, setIsShowing }) => {
  const [newArticle, setNewArticle] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newMinimumBalance, setNewMinimumBalance] = useState(0);

  const {
    product: {
      productHref,
      article,
      setArticle,
      code,
      setCode,
      minimumBalance,
      setMinimumBalance,
      type,
    },
  } = useContext(Context);

  useEffect(() => {
    if (isShowing) {
      setNewArticle(article === NOT_INDICATED ? '' : article);
      setNewCode(code === NOT_INDICATED ? '' : code);
      setNewMinimumBalance(minimumBalance);
    }
  }, [isShowing]);

  const close = () => {
    setNewArticle('');
    setNewCode('');
    setNewMinimumBalance(0);
    setIsShowing(false);
  };

  const edit = () => {
    let url = productHref.replace(SERVER_API_URL, '');

    const updatedData = {
      article: newArticle,
      code: newCode,
      minimumBalance: Number(newMinimumBalance),
    };

    if (type === 'variant') {
      getVariantParent(productHref).then((data) => {
        url = data.href.replace(SERVER_API_URL, '');
        
        updateProductAPI(url, updatedData).then((data) => {
          setArticle(data.article);
          setCode(data.code);
          setMinimumBalance(data.minimumBalance);
          close();
        });
      });
    } else {
      updateProductAPI(url, updatedData).then((data) => {
        setArticle(data.article);
        setCode(data.code);
        setMinimumBalance(data.minimumBalance);
        close();
      });
    }
  };

  const onEnterPress = (event) => {
    enterPressHandler(event, edit);
  };

  return (
    <Modal title="Изменение товара" isShowing={isShowing}>
      {type === 'product' && (
        <Textbox
          label="Артикул"
          value={newArticle}
          onChange={(e) => setNewArticle(e.target.value)}
          onKeyUp={onEnterPress}
        />
      )}
      <Textbox
        label="Код"
        containerStyle={{ margin: '12px 0' }}
        value={newCode}
        onChange={(e) => setNewCode(e.target.value)}
        onKeyUp={onEnterPress}
      />
      <Textbox
        label="Неснижаемый остаток"
        containerStyle={{ margin: '12px 0' }}
        value={newMinimumBalance}
        onChange={(e) => setNewMinimumBalance(e.target.value)}
        onKeyUp={onEnterPress}
      />
      <div className="edit-modal-controls">
        <Button style={{ marginRight: '8px' }} onClick={close}>
          Отменить
        </Button>
        <Button appearance="primary" onClick={edit}>
          Сохранить
        </Button>
      </div>
    </Modal>
  );
};

export default EditModal;
