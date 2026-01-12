import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast"
import { SidebarProvider} from "./context/SidebarContext.jsx";
import { UserProvider } from './context/userContext.jsx';
import { ThemeProvider } from "./context/ThemeContext.jsx";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <UserProvider>
        <SidebarProvider>
          <ThemeProvider>
            <App />
            <Toaster
              position="top-center"
              reverseOrder={false}
            />
          </ThemeProvider>
        </SidebarProvider>
      </UserProvider>
  </BrowserRouter>,
)
