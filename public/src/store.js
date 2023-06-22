import { getStorageItem, setStorageItem } from './util.js';
let store = getStorageItem('store');
const setupStore = (products) => {
    store = products.map((product) => {
        const {_id:id, category, company, description, featured, freeShipping, image, inventory, name, price, user: userId, numOfReviews, averageRating,colors} = product;
       
        return { name, id, category, company, description, featured, freeShipping, image, inventory, price, userId, numOfReviews, averageRating, colors }
    })
    setStorageItem('store',store)
    };

  

const findProduct = (id) => {
    let product = store.find((product) =>  product.id === id)
    return product 
};

export { store, setupStore, findProduct };
