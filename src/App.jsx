import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainNav from './layout/MainNav'
import Home from './pages/Home'
import SignUp from './pages/SingUp'
import SingIn from './pages/SingIn'
import { HeroUIProvider } from "@heroui/system";
import Verification from './pages/Verification'
import ProtectedRoute from './routes/ProtectedRoute'
import PublicRoute from './routes/PublicRoute'
import SingOut from './pages/SingOut'

function App() {

  return (
    <>
    <HeroUIProvider>
      <MainNav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/SignUp' element={<PublicRoute> <SignUp /> </PublicRoute>} />
        <Route path='/SignIn' element={ <PublicRoute> <SingIn /> </PublicRoute>} />
        <Route path='/verification' element={<PublicRoute> <Verification /> </PublicRoute>} />
        <Route path='/r' element={<PublicRoute /> } />
        <Route path='/f' element={<ProtectedRoute/> } />
        <Route path='/SignOut' element={<SingOut /> } />

      </Routes>
      </HeroUIProvider>
    </>
  )
}

export default App
