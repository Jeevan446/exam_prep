import React from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import ContactForm from '../components/ContactForm'
const ContactPage = () => {
  return (
    <div>
        <NavBar />
        <SideBar />
        <div>
         <ContactForm />   
        </div>
    </div>
  )
}

export default ContactPage