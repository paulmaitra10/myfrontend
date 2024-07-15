import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Product from './components/Product.jsx'
import PRoductDetails from './components/PRoductDetails.jsx'
import SearchItems from './components/SearchItems.jsx'
import Cart from './components/Cart.jsx'
import { items } from './ProductData.js'
import { useState } from 'react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)

