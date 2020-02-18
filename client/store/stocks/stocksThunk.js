import axios from 'axios'
// import { APIToken } from "../../../secrets";
// const APIToken = require('../../../secrets');

export const loadStocksThunk = () => {
  return async dispatch => {
    try {
      console.log('inside loadStocksThunk')
    } catch (error) {
      console.error(error)
    }
  }
}

// export const loadModelsThunk = () => {
//   return async dispatch => {
//     try {
//       // console.log('inside loadModelsThunk')
//       const wayfairUrls = [
//         "https://api.wayfair.com/v1/3dapi/models?page=1",
//         "https://api.wayfair.com/v1/3dapi/models?page=2",
//         "https://api.wayfair.com/v1/3dapi/models?page=3"
//       ];
//       const getProducts = async () => {
//         try {
//           const allProducts = await Promise.all(
//             wayfairUrls.map(url =>
//               axios.get(url, {
//                 headers: {
//                   Authorization: wayfairAuth
//                 }
//               })
//             )
//           );
//           return allProducts;
//         } catch (error) {
//           console.error(error);
//         }
//       };
//       const productData = await getProducts(); //[{}, {}, {}]

//       dispatch(loadModels(sortByClassName(productData)));
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };
