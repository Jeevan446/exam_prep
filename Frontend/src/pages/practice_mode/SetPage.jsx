import React from 'react'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom'

const SetPage = () => {
  const navigate =useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      
  
      <NavBar />

    
      <div className="flex  flex-1">

        <SideBar />

    
        <main className="flex-1 p-4 flex justify-center">
          <div className="w-full max-w-2xl space-y-3">
            {[0,1,2,3,4,6,7,8,9,10].map((index) => (
              <div onClick={()=> navigate(`/practice/set/${index}`)}
                key={index}
                className="border border-primary p-3 rounded cursor-pointer
                           hover:bg-primary/40 transition-all"
              >
                <span className="font-medium">Set {index}</span>
              </div>
            ))}
          </div>
        </main>

      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default SetPage
