import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast"
import { SidebarProvider } from "./context/SidebarContext.jsx";
import { UserProvider } from './context/userContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <UserProvider>
        <SidebarProvider>
          <App />
          <Toaster
            position="bottom-right"
            reverseOrder={false}
          />
        </SidebarProvider>
      </UserProvider>

    </StrictMode>
  </BrowserRouter>,
)
