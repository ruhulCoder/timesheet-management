import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Toaster } from 'react-hot-toast';
import Dashboard from "./components/Dashboard";
import WeekTimeSheet from "./components/WeekTimeSheet";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/timesheet/:weekId" element={<WeekTimeSheet />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
