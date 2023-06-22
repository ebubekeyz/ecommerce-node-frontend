require('dotenv').config()

const express = require('express');
const app = express();
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

// configuration
const PORT = process.env.PORT || 4300;
const HOST = 'localhost';
const API_SERVICE_URL = 'https://ecommerce-node-6onb.onrender.com';

app.use(
  '/ecommerce-node-6onb',
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/ecommerce-node-6onb`]: '',
    },
  })
);

app.use(express.static('./public'));
app.use(express.json());

app.get('/info', (req, res) => {
    res.send('This is a proxy service')

})

app.get('/products', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/products.html'));
});
app.get('/order', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/order.html'));
});

app.get('/product', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/product.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Starting proxy at ${HOST}:${PORT}`);
});
