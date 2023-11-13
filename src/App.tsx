import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomeTemplate from './template/home.template'
import { Outlet } from 'react-router-dom'
import Header from './template/layout/header'
import Footer from './template/layout/footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
