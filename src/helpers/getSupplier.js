import { SERVER_API_URL } from 'constants/app';
import { fetchCounterpartyAPI } from 'http/counterpartyAPI';

const getSupplier = (supplierHref) => {
  const url = supplierHref.replace(SERVER_API_URL, '');

  return new Promise((resolve) => {
    fetchCounterpartyAPI(url)
      .then((data) => {
        const supplier = data.name;

        resolve({ supplier });
      })
      .catch((e) => {
        console.error(e);
      });
  });
};

export default getSupplier;
