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
import {Auth0Provider} from '@auth0/auth0-react'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
     domain="dev-l2zal8kcfh338p8m.us.auth0.com"
     clientId="u4J3jAUsJxNPUPn7EsTEBBzVH64vmm8v"
     authorizationParams={{
       redirect_uri: window.location.origin
     }}>
    <App/>
    </Auth0Provider>
  </React.StrictMode>,
)

