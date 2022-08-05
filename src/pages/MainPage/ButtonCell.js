import { Button } from 'components';
import { Context } from 'context';
import { useContext } from 'react';
import { getProduct, getStocks, getSupplier } from 'helpers';

const ButtonCell = ({
  data,
  row: { index },
  column: { Header, productInfoModal },
}) => {
  const {
    main: {
      setNotifications,
      orderedData,
      setOrderedData,
      absentData,
      setAbsentData,
    },
    product: {
      setName,
      setArticle,
      setCode,
      setSupplier,
      setBuyPrice,
      setMinimumBalance,
      setStocks,
      setBarcodes,
      setProductHref,
      setType,
    },
  } = useContext(Context);

  const openProductInfo = () => {
    activeRow();

    const product = data[index];

    getProduct(product.productHref, product.name).then((data) => {
      setName(data.name);
      setArticle(data.article);
      setCode(data.code);
      setBuyPrice(data.buyPrice);
      setMinimumBalance(data.minimumBalance);
      setBarcodes(data.barcodes);
      setProductHref(data.trueProductHref);
      setType(data.type);

      getStocks(data.trueProductHref, data.type).then((data2) => {
        setStocks(data2.stockByStore);
        productInfoModal.setIsShowing(true);
      });

      getSupplier(data.supplierHref).then((data3) => {
        setSupplier(data3.supplier);
      });
    });
  };

  const orderedToggle = () => {
    const name = data[index].name;
    const isOrdered = data[index].isOrdered;

    setNotifications((prevState) =>
      prevState.map((state) =>
        state.name === name ? { ...state, isOrdered: !state.isOrdered } : state
      )
    );

    if (isOrdered) {
      setOrderedData((prevState) =>
        prevState.filter((state) => state.name !== name)
      );
    } else {
      setOrderedData((prevState) => [...prevState, { name }]);
    }
  };

  const absentToggle = () => {
    const name = data[index].name;
    const isAbsent = data[index].isAbsent;

    setNotifications((prevState) =>
      prevState.map((state) =>
        state.name === name ? { ...state, isAbsent: !state.isAbsent } : state
      )
    );

    if (isAbsent) {
      setAbsentData((prevState) =>
        prevState.filter((state) => state.name !== name)
      );
    } else {
      setAbsentData((prevState) => [...prevState, { name }]);
    }
  };

  const activeRow = () => {
    const id = data[index].id;
    setNotifications((prevState) =>
      prevState.map((state) =>
        state.isActive ? { ...state, isActive: false } : state
      )
    );

    setNotifications((prevState) =>
      prevState.map((state) =>
        state.id === id ? { ...state, isActive: true } : state
      )
    );
  };

  if (Header === 'Заказано') {
    const name = data[index].name;
    const isOrdered =
      orderedData.findIndex((data) => data.name === name) === -1 ? false : true;
    if (isOrdered) {
      return (
        <Button appearance="primary-deemphasized" onClick={orderedToggle}>
          Да
        </Button>
      );
    } else {
      return <Button onClick={orderedToggle}>Нет</Button>;
    }
  } else if (Header === 'Отсутствует') {
    const name = data[index].name;
    const isAbsent =
      absentData.findIndex((data) => data.name === name) === -1 ? false : true;
    if (isAbsent) {
      return (
        <Button appearance="primary-deemphasized" onClick={absentToggle}>
          Да
        </Button>
      );
    } else {
      return <Button onClick={absentToggle}>Нет</Button>;
    }
  } else {
    return <Button onClick={openProductInfo}>Открыть</Button>;
  }
};

export default ButtonCell;
