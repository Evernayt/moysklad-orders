import { AuthPage, MainPage } from 'pages';
import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Context } from 'context';
import { MAIN_ROUTE } from 'constants/routes';
import './App.css';

const App = () => {
  const [notifications, setNotifications] = useState([]);
  const [orderedData, setOrderedData] = useState([]);
  const [absentData, setAbsentData] = useState([]);
  const [name, setName] = useState('');
  const [article, setArticle] = useState('');
  const [code, setCode] = useState('');
  const [supplier, setSupplier] = useState('');
  const [buyPrice, setBuyPrice] = useState(0);
  const [minimumBalance, setMinimumBalance] = useState(0);
  const [productHref, setProductHref] = useState('');
  const [stocks, setStocks] = useState([]);
  const [barcodes, setBarcodes] = useState([]);
  const [type, setType] = useState('');

  useEffect(() => {
    const localOrderedData = localStorage.getItem('orderedData');
    if (localOrderedData !== null) setOrderedData(JSON.parse(localOrderedData));

    const localAbsentData = localStorage.getItem('absentData');
    if (localAbsentData !== null) setAbsentData(JSON.parse(localAbsentData));
  }, []);

  useEffect(() => {
    localStorage.setItem('orderedData', JSON.stringify(orderedData));
  }, [orderedData]);

  useEffect(() => {
    localStorage.setItem('absentData', JSON.stringify(absentData));
  }, [absentData]);

  return (
    <Context.Provider
      value={{
        main: {
          notifications,
          setNotifications,
          orderedData,
          setOrderedData,
          absentData,
          setAbsentData,
        },
        product: {
          name,
          setName,
          article,
          setArticle,
          code,
          setCode,
          supplier,
          setSupplier,
          buyPrice,
          setBuyPrice,
          minimumBalance,
          setMinimumBalance,
          productHref,
          setProductHref,
          stocks,
          setStocks,
          barcodes,
          setBarcodes,
          type,
          setType,
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path={MAIN_ROUTE} element={<MainPage />} />
        </Routes>
      </Router>
    </Context.Provider>
  );
};

export default App;
