import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WritingEditor from "./pages/WritingEditor";
import ProtectedRoute from "./components/ProtectedRoute";
import SessionsList from "./pages/SessionsList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sessions" element={<SessionsList />} />
        <Route path="/editor/:id" element={<WritingEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;