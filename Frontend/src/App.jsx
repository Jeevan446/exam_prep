import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Homepage = lazy(() => import("./pages/HomePage"));
const NoticePage = lazy(() => import("./pages/NoticePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Admin:
const AdminPage = lazy(() => import("./pages/admin/AdminPage"));
const AddChapterPage = lazy(() => import("./pages/admin/AddChapterPage"));
const AddExamType = lazy(() => import("./pages/admin/AddExamType"));
const AddquestionPage = lazy(() => import("./pages/admin/AddquestionPage"));
const EditQuestionPage = lazy(() => import("./pages/admin/EditQuestionPage"));
const AddSubject = lazy(() => import("./pages/admin/AddSubject"));
const AddSetPage = lazy(() => import("./pages/admin/AddSetPage"));
const AddNoticePage = lazy(() => import("./pages/admin/AddNoticePage"));
const AnalyticsPage = lazy(() => import("./pages/admin/AnalyticsPage"));
const PromoteUserPage = lazy(() => import("./pages/admin/PromoteUserPage"));

// auth:
const SignUpPage = lazy(() => import("./pages/auth/SignUpPage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));

// FOR DEMO MODE:
const ExamTypePage = lazy(() => import("./pages/demo_mode/ExamTypePage"));
const SubjectPage = lazy(() => import("./pages/demo_mode/SubjectPage"));
const ChaptersPage = lazy(() => import("./pages/demo_mode/ChaptersPage"));
const QuestionPage = lazy(() => import("./pages/demo_mode/QuestionPage"));

// FOR PRACTICE MODE:
const PracticeExamTypePage = lazy(() => import("./pages/practice_mode/PracticeExamTypePage"));
const SetPage = lazy(() => import("./pages/practice_mode/SetPage"));
const SetPaperpage = lazy(() => import("./pages/practice_mode/SetPaperpage"));

// For Profile Related Page:
const Profilepage = lazy(() => import("./pages/profile/Profilepage"));

//Weekly live mode
const WeeklyExamTypePage = lazy(() => import("./pages/weekly_mode/WeeklyExamTypePage"));
const WeeklySetNamePage = lazy(() => import("./pages/weekly_mode/WeeklySetNamePage"));

//protected route;
import LoggedinuserRoute from "../routes/LoggedInuser";
import ProtectedRoute from "../routes/ProtectedRoute";
import SubscriptionRoute from "../routes/SubscriptionRoute";

// contace page route;
const ContactPage = lazy(() => import("./pages/ContactPage"));

//Subscription page routes;
const SubscriptionExamTypePage = lazy(() => import("./pages/subscription/SubscriptionExamTypePage"));
const SubscriptionSetNamePage = lazy(() => import("./pages/subscription/SubscriptionSetNamePage"));
const SubscriptionSetPage = lazy(() => import("./pages/subscription/SubscriptionSetPage"));
const SubscriptionPage = lazy(() => import("./pages/subscription/SubscriptionPage"));

//hooks
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useNetworkStatus from "./hooks/useNetworkStatus";

function App() {
  useNetworkStatus();
  return (
    <div>
      <ToastContainer
  position="top-right"
  autoClose={2500} 
  closeOnClick
  pauseOnHover
  draggable
  theme="colored"
/>
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </div>
  );
}

export default App;
