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
import  Profilepage from  './pages/profile/Profilepage'


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
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/addquestion" element={<AddquestionPage />} />
        <Route path="/admin/addsubjects" element={<AddSubject />} />
        <Route path="/admin/addchapters" element={<AddChapterPage />} />
          <Route path="/admin/addset" element={<AddSetPage />} />
        <Route //Not yet designed
          path="/admin/editquestion"
          element={<EditQuestionPage />}
        />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/admin/addexamtype" element={<AddExamType />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* FOR PRACTICE MODE */}
        <Route path="/practice/examtype" element={<PracticeExamTypePage />} />
        <Route path="/practice/set" element={<SetPage />} />
        <Route path="/practice/set/setpaper" element={<SetPaperpage />} />

      {/* For Profile Page */}
        <Route path="/profile" element={< Profilepage/>} />
      </Routes>
    </div>
  );
}

export default App;
