import React from 'react'
import { NavLink } from 'react-router-dom'

const MainNav = () => {
  return (
      <>
      <nav className=' w-screen h-28 px-4 gap-4 flex justify-center items-center content-center'>
        <NavLink to="/SingIn">
          SingIn
        </NavLink>
        <NavLink to="/SingUp">
          SingUp
        </NavLink>
      </nav>
      </>
  )
}

export default MainNav