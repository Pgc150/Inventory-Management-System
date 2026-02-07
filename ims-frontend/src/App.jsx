import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, Router } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import { AddProduct } from './components/sidebarcomponents/AddProduct';
import StockDisplay from './components/sidebarcomponents/StockDisplay';
import Home from './pages/Home';
import { DashBoardPage } from './components/sidebarcomponents/DashBoardPage';
import { useThemeStore } from './store/useThemeStore';
import DemoLayout from './pages/DemoLayout';
import { Display } from './components/Display';
import DashboardLayout from './layout/DashboardLayout';
import ProductList from './components/ProductTable';

function App() {
  const initTheme = useThemeStore((state) => state.initTheme)

  useEffect(()=> {
    initTheme()
  },[])

  return (
    <>
      <Toaster position='top-right' reverseOrder={false}/>

      <BrowserRouter>
        <Routes>
          <Route  element={<DashboardLayout/>}>
             <Route path='/dashboard' element={<Display/>}/>
             <Route path='/add' element={<AddProduct/>}/>
             <Route path='/table' element={<ProductList/>}/>
            
          </Route>
           <Route path='/login' element={<Login/>}/>
           <Route path='/signup' element={<SignUp/>}/>
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
