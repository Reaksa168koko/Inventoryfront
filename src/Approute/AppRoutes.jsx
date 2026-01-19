import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import MainLayout from './MainLayout'
import Product from '../Fearture/Products/Product'
import Category from '../Fearture/Categories/Category'
import Order from '../Fearture/Orders/Order'
import Stock from '../Fearture/Stock/Stock'
import Supplier from '../Fearture/Surpplier/Supplier'
import Login from '../Fearture/Auth/Login'
import Dashboard from '../Fearture/Dashboard/Dashboard'
import Register from '../Fearture/Auth/Register'

const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Login/>}/>
             <Route path="/register" element={<Register />} />
            <Route element={<MainLayout/>}>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/product' element={<Product/>}/>
                <Route path='/category' element={<Category/>}/>
                <Route path='/order' element={<Order/>}/>
                <Route path='/stock' element={<Stock/>}/>
                <Route path='/supplier' element={<Supplier/>}/>
            </Route>
        </Routes>
    </Router>
  )
}

export default AppRoutes
