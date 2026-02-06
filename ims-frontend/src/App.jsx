import { useState } from 'react'
import { Routes, Route, Navigate, Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login';

import './App.css'
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import { AddProduct } from './components/sidebarcomponents/AddProduct';
import StockDisplay from './components/sidebarcomponents/StockDisplay';
import Home from './pages/Home';
import { DashBoardPage } from './components/sidebarcomponents/DashBoardPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Toaster position='top-right' reverseOrder={false}/>
        {/* <Home/> */}
        <Routes>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/add' element={<AddProduct/>}/>
        <Route path='/display' element={<StockDisplay/>}/>
        <Route path='/statics' element={<DashBoardPage/>}/>
      </Routes>  
    </>
  )
}

export default App
