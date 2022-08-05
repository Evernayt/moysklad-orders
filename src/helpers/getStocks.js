import { fetchStocksAPI } from 'http/stockAPI';

const getStocks = async (href, type) => {
  return new Promise((resolve) => {
    fetchStocksAPI(href, type)
      .then((data) => {
        const stockByStore = data.rows[0].stockByStore;

        resolve({ stockByStore });
      })
      .catch((e) => {
        console.error(e);
      });
  });
};

export default getStocks;
