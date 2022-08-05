import { NOT_INDICATED, SERVER_API_URL } from 'constants/app';
import { fetchProductAPI, searchProductsAPI } from 'http/productAPI';

const getProduct = (productHref, productName) => {
  const url = productHref.replace(SERVER_API_URL, '');

  return new Promise((resolve) => {
    fetchProductAPI(url)
      .then(async (data) => {
        let name;
        let code;
        let barcodes;
        let trueProductHref;
        let type = data.meta.type;

        if (data.variantsCount > 0) {
          await searchProductsAPI(productName).then((data2) => {
            const variant = data2.rows[0];

            name = variant.name;
            code = variant.code ? variant.code : NOT_INDICATED;
            barcodes = variant.barcodes;
            trueProductHref = variant.meta.href;
            type = variant.meta.type;
          });
        } else {
          name = data.name;
          code = data.code ? data.code : NOT_INDICATED;
          barcodes = data.barcodes;
          trueProductHref = data.meta.href;
        }

        const article = data.article ? data.article : NOT_INDICATED;
        const buyPrice = data.buyPrice.value / 100;
        const minimumBalance = data.minimumBalance;
        const supplierHref = data.supplier.meta.href;

        resolve({
          name,
          article,
          code,
          buyPrice,
          minimumBalance,
          barcodes,
          supplierHref,
          trueProductHref,
          type,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  });
};

export default getProduct;
