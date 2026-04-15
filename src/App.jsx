import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainNav from './layout/MainNav'
import Home from './pages/Home'
import SignUp from './pages/SingUp'
import SingIn from './pages/SingIn'
import { HeroUIProvider } from "@heroui/system";
import Verification from './pages/Verification'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <HeroUIProvider>
      <MainNav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/SignIn' element={<SingIn />} />
        <Route path='/verification' element={<Verification />} />
      </Routes>
      </HeroUIProvider>
    </>
  )
}

export default App
