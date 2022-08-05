import { $authHost } from 'http';

const fetchStocksAPI = async (href, type) => {
  const { data } = await $authHost.get(
    `report/stock/bystore/?filter=${type}=${href}&filter=stockMode=all`
  );
  return data;
};

export { fetchStocksAPI };
