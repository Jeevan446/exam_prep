import React from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import ContactForm from '../components/ContactForm';

const ContactPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      {/* Navbar */}
      <NavBar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <SideBar />

        {/* Main Content */}
        <main className="flex-1 flex justify-center ">
        
          <div className="w-full max-w-lg md:max-w-md">
            <ContactForm />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ContactPage;
