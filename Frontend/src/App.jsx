import { useState } from "react";
import { Route, Routes} from "react-router-dom";
import Homepage from "./pages/HomePage";

function App() {
    const [isOpen, setIsOpen] = useState(false);
  return (
      <>
        <Routes>
            <Route path="/" element={<Homepage isOpen={isOpen} setIsOpen={setIsOpen} />} />
        </Routes>
      </>
  );
}

export default App;
