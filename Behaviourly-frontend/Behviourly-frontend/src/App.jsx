import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./UserContext";
import SiteLayout from "./components/SiteLayout";
import InfoPage from "./pages/InfoPage";
import HomePage from "./pages/HomePage";
import CameraPage from "./pages/CameraPage";
import CameraSummaryPage from "./pages/CameraSummaryPage";
import ProfilePage from "./pages/ProfilePage";
import InterviewContextPage from "./pages/InterviewContextPage";
import Interview from "./Interveiw";
import "./App.css";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SiteLayout />}>
        <Route index element={<InfoPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="interview-context" element={<InterviewContextPage />} />
        <Route path="camera" element={<CameraPage />} />
        <Route path="camera/summary" element={<CameraSummaryPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="interview" element={<Interview />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;