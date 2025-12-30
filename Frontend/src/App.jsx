import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage";
import ExamTypePage from "./pages/ExamTypePage";
import SubjectPage from "./pages/SubjectPage";
import ChaptersPage from "./pages/ChaptersPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import QuestionPage from "./pages/QuestionPage";
import { Formik, Form, Field, ErrorMessage } from "formik";
import AdminPage from "./pages/AdminPage";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Homepage isOpen={isOpen} setIsOpen={setIsOpen} />}
        />
        <Route
          path="/examtype"
          element={<ExamTypePage isOpen={isOpen} setIsOpen={setIsOpen} />}
        />
        <Route
          path="/subjects"
          element={<SubjectPage isOpen={isOpen} setIsOpen={setIsOpen} />}
        />
        <Route
          path="/chapters"
          element={<ChaptersPage isOpen={isOpen} setIsOpen={setIsOpen} />}
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="examtype/chapter/questionpage"
          element={<QuestionPage />}
        />
         <Route
          path="admin"
          element={<AdminPage />}
        />
      </Routes>
    </>
  );
}

export default App;
