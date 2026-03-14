import { HomePage } from './pages/home/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { TrackingPage } from './pages/TrackingPage';
import { OrdersPage } from './pages/orders/OrdersPage';
import { NotFound } from './pages/NotFound';
import { Routes, Route } from 'react-router'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [cart, setCart] = useState([]);

   const loadCart=async()=>{
      const response=await axios.get('/api/cart-items?expand=product');
       setCart(response.data);
 
    } //outside useEffect so that we can reuse it as a prop to home Page
  useEffect(() => {
    loadCart();
     }
    , [])
  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart}/>} />
      <Route path='checkout' element={<CheckoutPage cart={cart} loadCart={loadCart}/>} />
      <Route path='orders' element={<OrdersPage cart={cart} loadCart={loadCart}/>} />
      <Route path='tracking/:orderId/:productId' element={<TrackingPage cart={cart}/>} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
