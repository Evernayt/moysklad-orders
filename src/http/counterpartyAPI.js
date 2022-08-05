import { $authHost } from 'http';

const fetchCounterpartyAPI = async (url) => {
  const { data } = await $authHost.get(url);
  return data;
};

export { fetchCounterpartyAPI };
