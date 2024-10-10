import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import HeroSection from '../components/HeroSection/HeroSection'
import NFTItems from '../components/NFTCard/NFTItems'
import NFTStep from '../components/NFTStep/NFTStep'
import Slider from '../components/Slider/Slider'
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
const Home: NextPage = () => {
  return (
    <div className='bg-[#03045e]'>
      <Navbar/>
      <HeroSection />
      <Slider />
      {/* <NFTStep /> */}
      <NFTItems />
      <Footer/>
   </div>
  )
}

export default Home
