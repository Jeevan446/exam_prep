import { Route, Routes } from "react-router-dom";

import Homepage from "./pages/HomePage";
import NoticePage from "./pages/NoticePage";
import NotFoundPage from "./pages/NotFoundPage";

// Admin:
import AdminPage from "./pages/admin/AdminPage";
import AddChapterPage from "./pages/admin/AddChapterPage";
import AddExamType from "./pages/admin/AddExamType";
import AddquestionPage from "./pages/admin/AddquestionPage";
import EditQuestionPage from "./pages/admin/EditQuestionPage";
import AddSubject from "./pages/admin/AddSubject";
import AddSetPage from "./pages/admin/AddSetPage";

// auth:
import SignUpPage from "./pages/auth/SignUpPage";
import LoginPage from "./pages/auth/LoginPage";

// FOR DEMO MODE:
import ExamTypePage from "./pages/demo_mode/ExamTypePage";
import SubjectPage from "./pages/demo_mode/SubjectPage";
import ChaptersPage from "./pages/demo_mode/ChaptersPage";
import QuestionPage from "./pages/demo_mode/QuestionPage";

// FOR PRACTICE MODE:
import PracticeExamTypePage from "./pages/practice_mode/PracticeExamTypePage";
import SetPage from "./pages/practice_mode/SetPage";
import SetPaperpage from "./pages/practice_mode/SetPaperpage";

// For Profile Related Page:
import Profilepage from './pages/profile/Profilepage'
import { useUser } from "./context/userContext";

//protected route;
import ProtectedRoute from "../routes/protectedRoute";


function App() {


  return (
    <div id="themeElement">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/examtype" element={<ExamTypePage />} />
        <Route path="/subjects" element={<SubjectPage />} />
        <Route path="/chapters" element={<ChaptersPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/examtype/chapter/questionpage"
          element={<QuestionPage />}
        />
       
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/addquestion"
          element={
            <ProtectedRoute adminOnly={true}>
              <AddquestionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/addsubjects"
          element={
            <ProtectedRoute adminOnly={true}>
              <AddSubject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/addchapters"
          element={
            <ProtectedRoute adminOnly={true}>
              <AddChapterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/addset"
          element={
            <ProtectedRoute adminOnly={true}>
              <AddSetPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/editquestion"
          element={
            <ProtectedRoute adminOnly={true}>
              <EditQuestionPage />
            </ProtectedRoute>
          }
        />




        <Route path="/notice" element={<NoticePage />} />
        <Route path="/admin/addexamtype" element={<AddExamType />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* FOR PRACTICE MODE */}
        <Route path="/practice/examtype" element={<PracticeExamTypePage />} />
        <Route path="/practice/examtype/:examtype" element={<SetPage />} />
        <Route path="/practice/:examtype/set/:id" element={<SetPaperpage />} />

        {/* For Profile Page */}
        <Route path="/profile" element={< Profilepage />} />
      </Routes>
    </div>
  );
}

export default App;
