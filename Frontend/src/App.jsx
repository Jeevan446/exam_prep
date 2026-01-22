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
import AddNoticePage from "./pages/admin/AddNoticePage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import PromoteUserPage from "./pages/admin/PromoteUserPage";

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
import Profilepage from "./pages/profile/Profilepage";

//Weekly live mode
import WeeklyExamTypePage from "./pages/weekly_mode/WeeklyExamTypePage";
import WeeklySetNamePage from "./pages/weekly_mode/WeeklySetNamePage";

//protected route;
import LoggedinuserRoute from "../routes/LoggedInuser";
import ProtectedRoute from "../routes/ProtectedRoute";
import SubscriptionRoute from "../routes/SubscriptionRoute";

// contace page route;
import ContactPage from "./pages/ContactPage";

//Subscription page routes;
import SubscriptionExamTypePage from "./pages/subscription/SubscriptionExamTypePage";
import SubscriptionSetNamePage from "./pages/subscription/SubscriptionSetNamePage";
import SubscriptionSetPage from "./pages/subscription/SubscriptionSetPage";
import SubscriptionPage from "./pages/subscription/SubscriptionPage";

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
            <ProtectedRoute requirePrivilege={false}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/addquestion"
          element={
            <ProtectedRoute requirePrivilege={false}>
              <AddquestionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/addsubjects"
          element={
            <ProtectedRoute requirePrivilege={false}>
              <AddSubject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/addchapters"
          element={
            <ProtectedRoute requirePrivilege={false}>
              <AddChapterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/addset"
          element={
            <ProtectedRoute requirePrivilege={false}>
              <AddSetPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/editquestion"
          element={
            <ProtectedRoute requirePrivilege={false}>
              <EditQuestionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/addnotice"
          element={
            <ProtectedRoute requirePrivilege={false}>
              <AddNoticePage />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/analytics" element={<AnalyticsPage />} />
        <Route path="/admin/promoteuser" element={<PromoteUserPage />} />

        <Route path="/notice" element={<NoticePage />} />
        <Route path="/admin/addexamtype" element={<AddExamType />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* FOR PRACTICE MODE */}
        <Route
          path="/practice/examtype"
          element={
            <LoggedinuserRoute>
              <PracticeExamTypePage />
            </LoggedinuserRoute>
          }
        />
        <Route
          path="/practice/examtype/:examtype"
          element={
            <LoggedinuserRoute>
              {" "}
              <SetPage />
            </LoggedinuserRoute>
          }
        />
        <Route
          path="/practice/:examtype/set/:id"
          element={
            <LoggedinuserRoute>
              {" "}
              <SetPaperpage />{" "}
            </LoggedinuserRoute>
          }
        />

        {/* WEEKLY_MODE MPDE */}

        <Route
          path="/weeklymode/examtype"
          element={
            <LoggedinuserRoute>
              <WeeklyExamTypePage />
            </LoggedinuserRoute>
          }
        ></Route>
        <Route
          path="/weeklymode/examtype/:examtype"
          element={
            <LoggedinuserRoute>
              <WeeklySetNamePage />
            </LoggedinuserRoute>
          }
        ></Route>
        <Route
          path="/weeklymode/:examtype/set/:id"
          element={
            <LoggedinuserRoute>
              <SetPaperpage />
            </LoggedinuserRoute>
          }
        />

        {/* For Profile Page */}
        <Route path="/profile" element={<Profilepage />} />
        <Route
          path="/contactus"
          element={
            <LoggedinuserRoute>
              <ContactPage />
            </LoggedinuserRoute>
          }
        />

        {/* SUBSCRIPTION MODE */}
        <Route
          path="/subscription/examtype"
          element={
            <LoggedinuserRoute>
              <SubscriptionPage />
            </LoggedinuserRoute>
          }
        />

        <Route
          path="/subscription/examtype"
          element={
            <LoggedinuserRoute>
              <SubscriptionRoute>
                <SubscriptionExamTypePage />
              </SubscriptionRoute>
            </LoggedinuserRoute>
          }
        ></Route>
        <Route
          path="/subscription/examtype/:examtype"
          element={
            <LoggedinuserRoute>
              <SubscriptionRoute>
                <SubscriptionSetNamePage />
              </SubscriptionRoute>
            </LoggedinuserRoute>
          }
        ></Route>
        <Route
          path="/subscription/:examtype/set/:id"
          element={
            <LoggedinuserRoute>
              <SubscriptionRoute>
                <SubscriptionSetPage />
              </SubscriptionRoute>
            </LoggedinuserRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
