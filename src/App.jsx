import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainNav from './layout/MainNav'
import Home from './pages/Home'
import SingUp from './pages/SingUp'
import SingIn from './pages/SingIn'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MainNav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/SingUp' element={<SingUp />} />
        <Route path='/SingIn' element={<SingIn />} />
      </Routes>
    </>
  )
}

export default App
