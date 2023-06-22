// import
import {
    getStorageItem,
    setStorageItem,
    formatPrice,
    getElement,
    allProductsUrl,
  } from '../util.js';
  import { openCart } from './toggleCarts.js';
  import { findProduct } from '../store.js';
  import addToCartDOM from './addToCartDOM.js';
  
  
  // set items
  const cartItemCountDOM = getElement('.cart-item-count')
  const cartItemDOM = getElement('.cart-items')
  const cartTotalDOM = getElement('.cart-total')


  let cart = getStorageItem('cart')

  export const addToCart = (id) => {
   let item = cart.find((cartItem) =>  cartItem.id === id)
   if(!item){
    let product = findProduct(id)
    product = {...product, amount:1}
    cart = [...cart, product]
    addToCartDOM(product)

   }
   else{
    const amount = increaseAmount(id)
    const items = [...cartItemDOM.querySelectorAll('.cart-item-amount')]
    const newAmount = items.find((value) => value.dataset.id === id)
    newAmount.textContent = amount;
    console.log(newAmount)

   }
  
   setStorageItem('cart', cart)


   displayCartItemCount()

   displayCartTotal()

   
    openCart()
  };



  function displayCartItemCount(){
    let amount = cart.reduce((total, cartItem) => {
      return total += cartItem.amount
    },0)
    if(amount > 0){
      cartItemCountDOM.style.backgroundColor = 'green';
    }
    if(amount === 0){
      cartItemCountDOM.style.backgroundColor = 'hsl(21, 62%, 45%)';
    }
    cartItemCountDOM.textContent = amount
  }

  function displayCartTotal(){
    let total = cart.reduce((total, cartItem) => {
      return total += cartItem.price * cartItem.amount
    },0)

    cartTotalDOM.textContent = `Total: ${formatPrice(total)}`

  }
  function displayCartItemsDOM(){
    cart.forEach((cartItem) => {
      addToCartDOM(cartItem)
    })

  }


  function removeItem(id){
    cart = cart.filter((cartItem) => cartItem.id !== id)

  }

  function increaseAmount(id){
    let newAmount;
    cart = cart.map((cartItem) => {
      if(cartItem.id === id){
        newAmount = cartItem.amount + 1
        cartItem = {...cartItem, amount: newAmount}
      }
      return cartItem
    })
    return newAmount
  }
  function decreaseAmount(id){
    let newAmount;
    cart = cart.map((cartItem) => {
      if(cartItem.id === id){
        newAmount = cartItem.amount - 1
        cartItem = {...cartItem, amount: newAmount}
      }
      return cartItem
    })
    return newAmount
  }


function setupCartFunctionality(){
  cartItemDOM.addEventListener('click',(e) => {
    const element = e.target;
    console.log(element)
    const parent = e.target.parentElement;
    const id = e.target.dataset.id;
    const parentID = e.target.parentElement.dataset.id;

    if(element.classList.contains('cart-item-remove-btn')){
      removeItem(id)
      // parent.parentElement.remove()
      element.parentElement.parentElement.remove()
    }
    if(parent.classList.contains('cart-item-increase-btn')){
      const newAmount = increaseAmount(parentID)
      parent.nextElementSibling.textContent = newAmount
    }
    if(parent.classList.contains('cart-item-decrease-btn')){
      const newAmount = decreaseAmount(parentID)
      if(newAmount === 0){
        removeItem(parentID);
        parent.parentElement.parentElement.remove()
      } 
      else {
        parent.previousElementSibling.textContent = newAmount
      }
      
    }
    displayCartItemCount();
    displayCartTotal();
    setStorageItem('cart',cart)
  })

}

  const init = () => {
    displayCartItemCount()

    displayCartTotal()

    displayCartItemsDOM()

    setupCartFunctionality()
  
  }

  init()