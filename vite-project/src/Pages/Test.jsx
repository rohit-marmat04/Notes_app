import React from 'react'
import AptitudeTest from '../components/AptitudeTest'
import Navbar from '../components/Navbar'

function Test() {
  return (
    <div>
      <section className="h-screen overflow-hidden bg-[#171a1f] text-black">
        <Navbar/>
      <AptitudeTest testTitle="Ratio"/>
      </section>
      
    </div>
  )
}

export default Test
