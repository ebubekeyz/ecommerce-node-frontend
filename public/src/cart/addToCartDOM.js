import { formatPrice, getElement } from '../util.js';

const addToCartDOM = ({ id, name, amount, price, image }) => {
  console.log(id);
  const cartItemsDOM = getElement('.cart-items');
  const article = document.createElement('article');
  article.classList.add('cart-item');
  article.setAttribute('data-id', id);
  article.innerHTML = `
    <img src="${image}" class="cart-item-img" alt="${name}">
        <div>
          <h4 class="cart-item-name">${name}</h4>
          <p class="cart-item-price">${formatPrice(price)}</p>
          <buton class="cart-item-remove-btn" data-id="${id}">remove</buton>
        </div>
        <div>
          <button class="cart-item-increase-btn" data-id="${id}">
            <i class="fas fa-chevron-up"></i>
          </button>
          <p class="cart-item-amount" data-id="${id}">${amount}</p>
          <button class="cart-item-decrease-btn" data-id="${id}">
            <i class="fas fa-chevron-down"></i>
          </button>
        </div>
    `;
  cartItemsDOM.appendChild(article);
  console.log(amount);
  console.log(name);

  // buy now

  const buyNowBtn = getElement('.buy-now');
  buyNowBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const tax = 0;
    const shippingFee = 1000
    const product = id
    const order = {items: [{name, price, amount, image, tax, shippingFee, product}]};

    try {
      buyNowBtn.innerHTML = `<div class="loading"></div>`;
      const response = await fetch(
        `http://localhost:4300/ecommerce-node-6onb/api/v1/orders`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(order),
          withCredentials: true,
        }
      );

      const data = await response.json();

      if (response.status === 201) {
        buyNowBtn.innerHTML = 'success'
      } else {
        console.log(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  });
};

export default addToCartDOM;
