// global imports
import '../toggleSidebar.js';
import '../cart/toggleCarts.js';
import '../cart/setupCarts.js';

//  filter imports
import setupSearch from '../filters/search2.js';
import setupCompanies from '../filters/companies2.js';
import setupPrice from '../filters/price2.js';

// specific imports
import { setupStore, store } from '../store.js';
import display from '../displayProducts.js';
import { getElement } from '../util.js';
import { addToCart } from '../cart/setupCarts.js';
import fetchProducts from '../fetchProducts.js'



const init = async() => {
const loading = getElement('.page-loading')


if(store.length < 1){
    const products = await fetchProducts();
    setupStore(products)
}

display(store, getElement('.products-container'))
setupSearch(store)
setupCompanies(store)
setupPrice(store)


loading.style.display = 'none'
    
}

init()

const logout = getElement('.logout');

logout.addEventListener('click', async () => {
    try{
      const response = await fetch('http://localhost:4300/ecommerce-node-6onb/api/v1/auth/logout',{
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await response.json()
      if(response.status === 200){
        window.location = '/'
      } else {
        console.log(data.msg)
      }
    } catch(error){
      console.log(error)
    }
  })