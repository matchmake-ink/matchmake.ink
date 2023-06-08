import "./index.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import TeamJoin from "./pages/TeamJoin";
import TeamDashboard from "./pages/TeamDashboard";

import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="pb-15">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<TeamJoin />} />
          <Route path="/dashboard" element={<TeamDashboard />} />
          <Route path="/profile" element={<p>profile</p>} />
          <Route path="/settings" element={<p>settings</p>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}
