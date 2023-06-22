// global imports
import '../toggleSidebar.js';
import '../cart/toggleCarts.js';
import '../cart/setupCarts.js';

// specific
import { addToCart } from '../cart/setupCarts.js';
import { singleProductUrl, getElement, formatPrice } from '../util.js';
import addToCartDOM from '../cart/addToCartDOM.js';


// selections
const loading = getElement('.page-loading');
const centerDOM = getElement('.single-product-center');
const pageTitleDOM = getElement('.page-hero-title');
const imgDOM = getElement('.single-product-img');
const titleDOM = getElement('.single-product-title');
const companyDOM = getElement('.single-product-company');
const priceDOM = getElement('.single-product-price');
const colorsDOM = getElement('.single-product-colors');
const descDOM = getElement('.single-product-desc');
const model = getElement('.model');
const quality = getElement('.quality');
const material = getElement('.material');
const boxContent = getElement('.box-content');
const feature = getElement('.feature');
const weight = getElement('.weight');
const size = getElement('.size');
const cartBtn = getElement('.addToCartBtn');

// cart product
let productID;

// show product when page loads
window.addEventListener('DOMContentLoaded', async function(){
   
    const params2 = window.location.search
    const urlID = new URLSearchParams(params2).get('id')

    try {
        const response = await this.fetch(`${singleProductUrl}/${urlID}`,{
            method: 'GET',
            headers: {
              "Content-type":'application/json'
            }
        })
        const data = await response.json()
       

        if(response.status === 200){
            const {_id:id, name, price, description, image, category, company, colors, freeShipping, averageRating} = data.product;
            

            productID = id;

        

            document.title = `${name.toUpperCase()} | comfy`
            pageTitleDOM.textContent = `Home / ${name}`
            imgDOM.src = image
            titleDOM.textContent = `${name}` 
            priceDOM.textContent = formatPrice(price)
            // descDOM.innerHTML = description
            companyDOM.innerHTML = company
            
            console.log(description[0].modelName)
            model.innerHTML = description[0].modelName
            quality.innerHTML = description[0].quality
            material.innerHTML = description[0].material
            feature.innerHTML = description[0].feature
            boxContent.innerHTML = description[0].boxContent
            weight.innerHTML = description[0].weight
            size.innerHTML = description[0].size


            colors.forEach((color) => {
            const span = document.createElement('span')
            span.classList.add('product-color')
            span.style.backgroundColor = `${color}`
            colorsDOM.appendChild(span)
        })
        } else {
            console.log(response.status, response.statusText) 
            centerDOM.innerHTML = `
            <div>
            <h3 class="error">Sorry, Something went wrong</h3>
            <a href="index.html" class="btn">Back Home</a>
            </div>`
        }
    } catch(error){
        console.log(error)
    }
    


    loading.style.display = 'none'
 })


cartBtn.addEventListener('click', function(){
    addToCart(productID)
})



const logout = getElement('.logout');

logout.addEventListener('click', async () => {
    try{
      const response = await fetch('https://ecommerce-node-frontend.onrender.com/ecommerce-node-6onb/api/v1/auth/logout',{
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

