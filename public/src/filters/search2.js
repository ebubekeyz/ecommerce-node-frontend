import { getElement } from '../util.js';
import display from '../displayProducts.js';

const setupSearch = (store) => {
    const inputForm = getElement('.input-form')
    const searchInput = getElement('.search-input')
  

  inputForm.addEventListener('keyup',function(){
    const value = searchInput.value

    if(value){
        const newStore = store.filter((product) => {
            let {name} = product
            name = name.toLowerCase()
            if(name.startsWith(value)){
                return product
            }
        })
        display(newStore, getElement('.products-container'),true)
        if(newStore.length < 1){
            const products = getElement('.products-container')
            products.innerHTML = `<h3 class="filter-error">Sorry, No product match your search</h3>`
        }
    }
    else{
        display(store, getElement('.products-container'), true)
    }
  })
};


export default setupSearch;
