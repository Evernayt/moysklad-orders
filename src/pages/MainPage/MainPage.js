import { Button, SelectButton, Pagination, Loader } from 'components';
import { Context } from 'context';
import { useModal } from 'hooks';
import { fetchNotificationsAPI } from 'http/notificationAPI';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useTable } from 'react-table';
import AuthModal from './AuthModal/AuthModal';
import ButtonCell from './ButtonCell';
import EditModal from './EditModal/EditModal';
import NewOrderModal from './NewOrderModal/NewOrderModal';
import ProductInfo from './ProductInfo/ProductInfo';
import Table from './Table/Table';
import './MainPage.css';

const MainPage = () => {
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(25);
  const [offset, setOffset] = useState(25);
  const [isLoading, setIsLoading] = useState(false);

  const {
    main: { orderedData, absentData, notifications, setNotifications },
  } = useContext(Context);

  const tableRef = useRef();

  const editModal = useModal();
  const authModal = useModal();
  const newOrderModal = useModal();
  const productInfoModal = useModal();
  const productSearchModal = useModal();

  const columns = useMemo(
    () => [
      {
        Header: 'Заказано',
        accessor: 'ordered',
        Cell: ButtonCell,
      },
      {
        Header: 'Отсутствует',
        accessor: 'absent',
        Cell: ButtonCell,
      },
      {
        Header: 'Наименование',
        accessor: 'name',
        style: { width: '100%' },
      },
      {
        Header: 'Остаток',
        accessor: 'actualBalance',
      },
      {
        Header: 'Товар в МойСклад',
        accessor: 'productInMoySklad',
        Cell: ButtonCell,
        productInfoModal,
      },
    ],
    []
  );

  const limits = useMemo(
    () => [
      {
        id: 1,
        name: '25 товаров',
        value: 25,
      },
      {
        id: 2,
        name: '50 товаров',
        value: 50,
      },
      {
        id: 3,
        name: '100 товаров',
        value: 100,
      },
    ],
    []
  );

  useEffect(() => {
    fetchNotifications(0);
  }, []);

  const fetchNotifications = (offset) => {
    setIsLoading(true);
    fetchNotificationsAPI(limit, offset)
      .then((data) => {
        let notificationsData = [];
        for (let index = 0; index < data.rows.length; index++) {
          const notification = data.rows[index];
          const isOrdered =
            orderedData.findIndex((x) => x.id === notification.id) === -1
              ? false
              : true;

          const isAbsent =
            absentData.findIndex((x) => x.id === notification.id) === -1
              ? false
              : true;

          if (notification.good !== undefined) {
            notificationsData.push({
              id: notification.id,
              name: notification.good.name,
              actualBalance: notification.actualBalance,
              productHref: notification.good.meta.href,
              isOrdered,
              isActive: false,
              isAbsent,
            });
          }
        }

        let notDuplicNotificationsData = notificationsData.filter(
          (value, index, self) =>
            index === self.findIndex((x) => x.name === value.name)
        );

        setNotifications(notDuplicNotificationsData);

        setPageCount(Math.ceil(500 / limit));
      })
      .finally(() => setIsLoading(false));
  };

  const onPageChange = (event) => {
    const page = event.selected;
    const offset = limit * page;
    fetchNotifications(offset);
    tableRef.current.scrollIntoView();
  };

  return (
    <div>
      <EditModal
        isShowing={editModal.isShowing}
        setIsShowing={editModal.setIsShowing}
      />
      <AuthModal
        isShowing={authModal.isShowing}
        setIsShowing={authModal.setIsShowing}
      />
      <NewOrderModal
        isShowing={newOrderModal.isShowing}
        setIsShowing={newOrderModal.setIsShowing}
      />
      <div className="main-page-header">
        <div>
          <Button
            appearance="primary"
            style={{ width: 'max-content', marginRight: '8px' }}
            onClick={() => newOrderModal.setIsShowing(true)}
          >
            Новый заказ
          </Button>
          <Button
            style={{ width: 'max-content' }}
            onClick={() => authModal.setIsShowing(true)}
          >
            Авторизация
          </Button>
        </div>
        <SelectButton
          items={limits}
          defaultSelectedItem={limits[0]}
          placement="bottom-end"
          onChange={(e) => setLimit(e.value)}
        />
      </div>
      <div className="main-page-center">
        <ProductInfo
          isShowing={productInfoModal.isShowing}
          setIsShowing={productInfoModal.setIsShowing}
          editModal={editModal}
        />
        {isLoading ? (
          <div className="main-page-loader-container">
            <Loader />
          </div>
        ) : (
          <div className="main-page-table-container">
            <Table columns={columns} data={notifications} ref={tableRef} />
          </div>
        )}
      </div>
      <div className="main-page-footer">
        <Pagination pageCount={pageCount} onPageChange={onPageChange} />
      </div>
    </div>
  );
};

export default MainPage;
