import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage";
import ExamTypePage from "./pages/ExamTypePage";
import SubjectPage from "./pages/SubjectPage";
import ChaptersPage from "./pages/ChaptersPage";
import SignUpPage from "./pages/auth/SignUpPage";
import LoginPage from "./pages/auth/LoginPage";
import QuestionPage from "./pages/QuestionPage";
import { Formik, Form, Field, ErrorMessage } from "formik";
import AdminPage from "./pages/admin/AdminPage";
import AddquestionPage from "./pages/admin/AddquestionPage";
import Loading from "./components/Loading";
import AddSubject from "./pages/admin/AddSubject";
import AddChapterPage from "./pages/admin/AddChapterPage";
import EditQuestionPage from "./pages/admin/EditQuestionPage";
import NoticePage from "./pages/NoticePage";
import AddExamType from "./pages/admin/AddExamType";

//check

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div data-theme="forest">

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
          path="/examtype/chapter/questionpage"
          element={<QuestionPage />}
        />
        <Route
          path="/admin"
          element={<AdminPage isOpen={isOpen} setIsOpen={setIsOpen} />}
        />
        <Route
          path="/admin/addquestion"
          element={<AddquestionPage isOpen={isOpen} setIsOpen={setIsOpen} />}
        />
        <Route
          path="/admin/addsubjects"
          element={<AddSubject isOpen={isOpen} setIsOpen={setIsOpen} />}
        />
        <Route
          path="/admin/addchapters"
          element={<AddChapterPage isOpen={isOpen} setIsOpen={setIsOpen} />}
        />
        <Route
          path="/admin/editquestion"
          element={<EditQuestionPage isOpen={isOpen} setIsOpen={setIsOpen} />}
        />
        <Route
          path="/notice"
          element={<NoticePage isOpen={isOpen} setIsOpen={setIsOpen} />}
        />
        <Route
          path="/admin/addexamtype"
          element={<AddExamType isOpen={isOpen} setIsOpen={setIsOpen} />}
        />
      </Routes>
    </div>
  );
}

export default App;
