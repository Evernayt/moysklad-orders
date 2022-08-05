import { SERVER_API_URL } from 'constants/app';
import { fetchProductAPI } from 'http/productAPI';

const getVariantParent = (productHref) => {
  const url = productHref.replace(SERVER_API_URL, '');

  return new Promise((resolve) => {
    fetchProductAPI(url)
      .then(async (data) => {
        resolve(data.product.meta);
      })
      .catch((e) => {
        console.error(e);
      });
  });
};

export default getVariantParent;
