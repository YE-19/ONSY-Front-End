import React from 'react'
import Hero1 from '../components/Home/Hero1'
import Hero2 from '../components/Home/Hero2'
import Hero3 from '../components/Home/Hero3'
import Hero5 from '../components/Home/Hero5'
import FooterH from '../components/Home/FooterH'
import Hero4 from '../components/Home/Hero4'
import ProtectedRoute from '../routes/ProtectedRoute'
import Cookies from 'js-cookie';
import { getToken } from '../utils/cookieUtils'

const Home = () => {

  const token = getToken("onsy_auth_token")

  return (
    <>
      <Hero1 />
      <Hero2 />
      <Hero3 />
      <Hero4 />
      <div className={`${token ? ' hidden' : ''}`}>
      <Hero5 />
      </div>
      <FooterH />
    </>
  )
}

export default Home