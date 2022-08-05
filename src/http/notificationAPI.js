import { $authHost } from 'http';

const fetchNotificationsAPI = async (limit, offset) => {
  const { data } = await $authHost.get(
    `notification/?limit=${limit}&offset=${offset}`
  );
  return data;
};

export { fetchNotificationsAPI };
