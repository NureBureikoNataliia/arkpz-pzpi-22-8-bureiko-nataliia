
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { CreateProduct } from './pages/CreateProduct'
import { EditProduct } from './pages/EditProduct'
import { Landing } from './pages/Landing'
import { Catalog } from './pages/Catalog'
import { useEffect } from 'react'
import axios from 'axios'

function App() {

  useEffect(() => {
    let token = sessionStorage.getItem("Admin")
    if (token) {
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`
    }
  })

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/createproduct" element={<CreateProduct/>}/>
          <Route path="/editproduct/:id" element={<EditProduct/>}/>
          <Route path="/catalog" element={<Catalog/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
