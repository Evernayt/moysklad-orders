import { Button, Tooltip } from 'components';
import { LOADING_PLACEHOLDER, NOT_INDICATED } from 'constants/app';
import { Context } from 'context';
import { useOnClickOutside } from 'hooks';
import React, { useContext, useRef, useState } from 'react';
import './ProductInfo.css';

const ProductInfo = ({ isShowing, setIsShowing, editModal }) => {
  const [tooltipIsShowing, setTooltipIsShowing] = useState(false);

  const {
    product: {
      name,
      article,
      code,
      supplier,
      buyPrice,
      minimumBalance,
      stocks,
      barcodes,
      type,
      setName,
      setArticle,
      setCode,
      setSupplier,
      setBuyPrice,
      setMinimumBalance,
      setStocks,
      setBarcodes,
      setType,
    },
  } = useContext(Context);

  const productInfoRef = useRef();
  const tooltipRef = useRef();

  const close = () => {
    if (!editModal.isShowing) {
      setIsShowing(false);
      setName(LOADING_PLACEHOLDER);
      setArticle(LOADING_PLACEHOLDER);
      setCode(LOADING_PLACEHOLDER);
      setSupplier(LOADING_PLACEHOLDER);
      setBuyPrice(LOADING_PLACEHOLDER);
      setMinimumBalance(LOADING_PLACEHOLDER);
      setStocks([]);
      setBarcodes([]);
      setType('');
    }
  };

  useOnClickOutside(productInfoRef, close);

  const openEditModal = () => {
    editModal.setIsShowing(true);
  };

  const copyHandler = (event) => {
    const text = event.target.textContent;
    const clientX = event.clientX;
    const clientY = event.clientY;

    if (text === NOT_INDICATED) return;

    navigator.clipboard.writeText(text).then(() => {
      const rect = productInfoRef.current.getBoundingClientRect();
      tooltipRef.current.style.left = `${clientX - 45 - rect.x}px`;
      tooltipRef.current.style.top = `${clientY + 5 - rect.y}px`;
      setTooltipIsShowing(true);
      setTimeout(() => setTooltipIsShowing(false), 500);
    });
  };

  return (
    <div
      className={isShowing ? 'product-info active' : 'product-info'}
      ref={productInfoRef}
    >
      <Tooltip
        text="Скопировано"
        isShowing={tooltipIsShowing}
        ref={tooltipRef}
      />
      <div className="product-info-header">
        <span className="product-info-name">{name}</span>
        <Button
          appearance="primary-deemphasized"
          style={{ width: 'max-content' }}
          onClick={openEditModal}
        >
          Изменить
        </Button>
      </div>
      <div className="divider" />
      <div className="product-info-container">
        <div className="product-barcodes-column">
          <span className="product-param">Штрихкоды</span>
          <div className="product-barcodes-container">
            {barcodes ? (
              barcodes.map((barcode, index) => (
                <span
                  key={index}
                  className="product-value-default"
                  onClick={copyHandler}
                >
                  {barcode.ean13}
                </span>
              ))
            ) : (
              <span className="product-value-default">{NOT_INDICATED}</span>
            )}
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div className="product-info-column">
            {type === 'product' && (
              <span className="product-param">Артикул</span>
            )}
            <span className="product-param">Код</span>
            <span className="product-param">Поставщик</span>
            <span className="product-param">Закупочная цена</span>
            <span className="product-param">Неснижаемый остаток</span>
            {stocks.map((stock, index) => (
              <span key={index} className="product-param">
                {stock.name}
              </span>
            ))}
          </div>
          <div className="product-info-column">
            {type === 'product' && (
              <span className="product-value-default" onClick={copyHandler}>
                {article ? article : NOT_INDICATED}
              </span>
            )}
            <span className="product-value-default" onClick={copyHandler}>
              {code ? code : NOT_INDICATED}
            </span>
            <span className="product-value-default" onClick={copyHandler}>
              {supplier ? supplier : NOT_INDICATED}
            </span>
            <span className="product-value-default" onClick={copyHandler}>
              {buyPrice}
            </span>
            <span className="product-value-default" onClick={copyHandler}>
              {minimumBalance ? minimumBalance : NOT_INDICATED}
            </span>
            {stocks.map((stock, index) => (
              <span
                key={index}
                className={
                  stock.stock < minimumBalance
                    ? 'product-value-danger'
                    : 'product-value-default'
                }
                onClick={copyHandler}
              >
                {stock.stock}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
