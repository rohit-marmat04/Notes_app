import React from 'react'
import Navbar from '../components/Navbar'
import LearningPathCard from '../components/LearningPathCard.jsx'
import LearningPathSection from '../components/LearningPathSection'
import HeroBanner from '../components/HeroBanner.jsx'
import banner from '../assets/banner.jpeg'

function Home() {
  return (
    <div>
      <Navbar/>
      <HeroBanner /> 
    </div>
  )
}

export default Home
