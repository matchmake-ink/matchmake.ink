import "./index.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Team from "./pages/Team";

import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import TeamJoin from "./pages/TeamJoin";
import TeamDashboard from "./pages/TeamDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="pb-15">
        <Routes>
          <Route path="/" element={<p>Landing page</p>} />
          <Route path="/team" element={<Team />} />
          <Route path="/join" element={<TeamJoin />} />
          <Route path="/dashboard" element={<TeamDashboard />} />
          <Route path="/profile" element={<p>profile</p>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}
