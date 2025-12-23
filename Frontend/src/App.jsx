import { useState } from "react";
import { Route, Routes} from "react-router-dom";
import Homepage from "./pages/HomePage";
import ExamTypePage from "./pages/ExamTypePage"
import SubjectPage from "./pages/SubjectPage";

function App() {
    const [isOpen, setIsOpen] = useState(false);
  return (
      <>
        <Routes>
            <Route path="/" element={<Homepage isOpen={isOpen} setIsOpen={setIsOpen} />} />
            <Route path="/examtype" element={<ExamTypePage isOpen={isOpen} setIsOpen={setIsOpen} />} />
            <Route path="/subjects" element={<SubjectPage isOpen={isOpen} setIsOpen={setIsOpen} />} />
        </Routes>
      </>
  );
}

export default App;
