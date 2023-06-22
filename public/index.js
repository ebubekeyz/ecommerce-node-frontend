// global imports
import './src/toggleSidebar.js';
import './src/cart/toggleCarts.js';
import './src/cart/setupCarts.js';
// specific imports
import fetchProducts from './src/fetchProducts.js';
import { setupStore, store } from './src/store.js';
import display from './src/displayProducts.js';
import { getElement } from './src/util.js';


const init = async () => {
  const data = await fetchProducts();
  console.log(data)
  
  const products = data.products
  setupStore(products)
  
 

  

  // const featured = store.filter((product) => product.featured === true)

  // display(featured, getElement('.featured-center'))
 
}

window.addEventListener('DOMContentLoaded', init)

const container = getElement('.container');
const authLog = document.querySelectorAll('.auth-log');
const authReg = document.querySelectorAll('.auth-reg');
const logSec = getElement('.login-section');
const regSec = getElement('.register-section');
const navReg = getElement('.nav-reg');



authLog.forEach((log) => {
  log.addEventListener('click', (e) => {
    logSec.classList.add('show-form');
    regSec.classList.remove('show-form');
  });
});

authReg.forEach((reg) => {
  reg.addEventListener('click', (e) => {
    regSec.classList.add('show-form');
    logSec.classList.remove('show-form');
  });
});

logSec.addEventListener('click', (e) => {
  const elem = e.target.classList;
  if (elem.contains('login-section')) {
    logSec.classList.remove('show-form');
  } else if (elem.contains('login-center')) {
    logSec.classList.add('show-form');
  }
});

regSec.addEventListener('click', (e) => {
  const elem = e.target.classList;
  if (elem.contains('register-section')) {
    regSec.classList.remove('show-form');
  } else if (elem.contains('login-center')) {
    regSec.classList.add('show-form');
  }
});

const emailInput = getElement('#email');
const passwordInput = getElement('#password');
const loginSubmit = getElement('#login-submit');

const nameInput = getElement('#name');
const regEmailInput = getElement('#reg-email');
const regPasswordInput = getElement('#reg-password');
const registerSubmit = getElement('#register-submit');
const alert = getElement('.alert');
const url = 'api/v1/auth';

registerSubmit.addEventListener('click', async (e) => {
    e.preventDefault();
  
    const name = nameInput.value;
    const email = regEmailInput.value;
    const password = regPasswordInput.value;
  
    try {
      registerSubmit.innerHTML = `<div class="loading"></div>`;
      const response = await fetch(
        `https://ecommerce-node-frontend.onrender.com/ecommerce-node-6onb/api/v1/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
          withCredentials: true
        }
      );
  
      const data = await response.json();
  
      if (response.status === 201) {
        alert.classList.add('show-alert');
        alert.textContent = 'registration Successful';
        setInterval(() => {
          alert.classList.remove('show-alert');
        }, 10000);
  
        nameInput.value = '';
        regEmailInput.value = '';
        regPasswordInput.value = '';
  
        registerSubmit.textContent = 'success';
        window.location = '/products'
      } else {
        console.log(data.msg);
        alert.classList.add('show-alert');
        alert.textContent = data.msg;
        setInterval(() => {
          alert.classList.remove('show-alert');
        }, 10000);
  
        regSec.classList.add('show-form');
  
        registerSubmit.textContent = 'register';
      }
    } catch (error) {
      console.log(error);
    }
  });
  
  loginSubmit.addEventListener('click', async (e) => {
    e.preventDefault();
  
    const email = emailInput.value;
    const password = passwordInput.value;
  
    try {
      loginSubmit.innerHTML = `<div class="loading"></div>`;
      const response = await fetch(
        `https://ecommerce-node-frontend.onrender.com/ecommerce-node-6onb/api/v1/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'accepts': 'application/json'
          },
          body: JSON.stringify({ email, password }),
          withCredentials: true
        },
      );
  
      const data = await response.json();
  
      if (response.status === 200) {
        alert.classList.add('show-alert');
        alert.textContent = 'Login Successful';
        setInterval(() => {
          alert.classList.remove('show-alert');
        }, 10000);
  
        emailInput.value = '';
        passwordInput.value = '';
  
        loginSubmit.textContent = 'success';

        window.location = '/products'
      } else {
        console.log(data.msg);
        alert.classList.add('show-alert');
        alert.textContent = data.msg;
        setInterval(() => {
          alert.classList.remove('show-alert');
        }, 10000);
  
        logSec.classList.add('show-form');
  
        loginSubmit.textContent = 'login';
      }
    } catch (error) {
      console.log(error);
    }
  });
  
//   set a backend proxy for frontend 

