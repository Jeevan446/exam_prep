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
import NotFoundPage from "./pages/NotFoundPage";

//check

function App() {

  return (
    <div data-theme="forest">

      <Routes>
        <Route
          path="/"
          element={<Homepage />}
        />
        <Route
          path="/examtype"
          element={<ExamTypePage />}
        />
        <Route
          path="/subjects"
          element={<SubjectPage />}
        />
        <Route
          path="/chapters"
          element={<ChaptersPage />}
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/examtype/chapter/questionpage"
          element={<QuestionPage />}
        />
        <Route
          path="/admin"
          element={<AdminPage />}
        />
        <Route
          path="/admin/addquestion"
          element={<AddquestionPage />}
        />
        <Route
          path="/admin/addsubjects"
          element={<AddSubject />}
        />
        <Route
          path="/admin/addchapters"
          element={<AddChapterPage />}
        />
        <Route                           //Not yet designed
          path="/admin/editquestion"
          element={<EditQuestionPage />}
        />
        <Route
          path="/notice"
          element={<NoticePage  />}
        />
        <Route
          path="/admin/addexamtype"
          element={<AddExamType />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
