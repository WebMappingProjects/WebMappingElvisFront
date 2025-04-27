import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from './pages/Login';
import './App.css';
import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";
import Landing from "./views/Landing";
import Profile from "./views/Profile";
import Index from "./views/Index";

import Dashboard from "./views/admin/Dashboard";
import Maps from "./views/admin/Maps";
import Settings from "./views/admin/Settings";
import Tables from "./views/admin/Tables";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      {/* add routes with layouts */}
      <Route path="/admin" element={<Admin />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/maps" element={<Maps />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/tables" element={<Tables />} />
          {/* <Navigate from="/admin" to="/admin/dashboard" /> */}
          <Route path="/admin" element={<Navigate  to="/admin/dashboard" />} />
      </Route>
      <Route path="/auth" element={<Auth />}>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            {/* <Navigate from="/auth" to="/auth/login" /> */}
            <Route path="/auth" element={<Navigate  to="/auth/login" />} />
      </Route>
      {/* add routes without layouts */}
      <Route path="/landing" element={<Landing />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/" element={<Index />} />
      {/* add redirect for first page */}
      <Route path="*" element={<Navigate  to="/" />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
