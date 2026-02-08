import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, Router } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { AddProduct } from './components/sidebarcomponents/AddProduct';
import { useThemeStore } from './store/useThemeStore';
import { Display } from './components/Display';
import DashboardLayout from './layout/DashboardLayout';
import ProductList from './components/ProductTable';
import ProductPieChart from './components/ProductPieChart';

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
             <Route path='/productpiechart' element={<ProductPieChart/>}/>
          </Route>
           <Route path='/login' element={<Login/>}/>
           <Route path='/signup' element={<SignUp/>}/>
          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
