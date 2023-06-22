//   ATTENTION!!!!!!!!!!!
//   I SWITCHED TO PERMANENT DOMAIN
//   DATA IS THE SAME JUST A DIFFERENT URL,
//   DOES NOT AFFECT PROJECT FUNCTIONALITY

const allProductsUrl = 'https://ecommerce-node-frontend.onrender.com/ecommerce-node-6onb/api/v1/products'

const singleProductUrl = 'https://ecommerce-node-frontend.onrender.com/ecommerce-node-6onb/api/v1/products'

const getElement = (selection) => {
  const element = document.querySelector(selection)
  if (element) return element
  throw new Error(`Please check "${selection}" selector, no such element exist`)
}

const formatPrice = (price) => {
    const formattedPrice = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
    }).format((price).toFixed(2))
    return formattedPrice
}

const getStorageItem = (item) => {
    let storageItem = localStorage.getItem(item)
    if(storageItem){
        storageItem = JSON.parse(localStorage.getItem(item))
    }
    else{
        storageItem = []
    }
    return storageItem
}
const setStorageItem = (name, item) => {
    localStorage.setItem(name, JSON.stringify(item))
}

const removeStorage = (item) => {
    localStorage.removeItem(item)
}

export {
  allProductsUrl,
  singleProductUrl,
  getElement,
  formatPrice,
  getStorageItem,
  setStorageItem,
  removeStorage
}
