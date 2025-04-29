import { BrowserRouter, Form, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";
import Landing from "./views/Landing";
import Profile from "./views/Profile";
import Index from "./views/Index";

import Dashboard from "./views/admin/Dashboard";
import Maps from "./views/admin/Maps";
import Tables from "./views/admin/Tables";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import MosqueeFontPointTable from "./components/Tables/MosqueeFontPointTable";
import MosqueeFontPointForm from "./components/Forms/MosqueeFontPointForm";
import Forms from "./views/admin/Forms";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      {/* add routes with layouts */}

      <Route path="/admin" element={<Admin />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/maps" element={<Maps />} />
          {/* <Route path="/admin/settings" element={<Settings />} /> */}
          
          {/*  Sub layouts for admin data forms */}
          <Route path="/admin/forms" element={<Forms />}>
            <Route path="/admin/forms/mosquee" element={<MosqueeFontPointForm />} />
            <Route path="/admin/forms" element={<Navigate  to="/admin/forms/mosquee" />} />
          </Route>

          {/*  Sub Layouts for admin data tables */}
          <Route path="/admin/tables" element={<Tables />}>
              <Route path="/admin/tables/mosquee" element={<MosqueeFontPointTable />} />
              <Route path="/admin/tables" element={<Navigate  to="/admin/tables/mosquee" />} />
          </Route>

          <Route path="/admin" element={<Navigate  to="/admin/dashboard" />} />
      </Route>
      <Route path="/auth" element={<Auth />}>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
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
