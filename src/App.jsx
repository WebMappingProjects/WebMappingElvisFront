import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";
import Landing from "./views/Landing";
import Profile from "./views/Profile";
import Index from "./views/Index";

import ProtectedRoute from "./views/ProtectedRoute";
import AdminPage from "./views/AdminPage";
import IsAdminProtectedRoute from "./views/IsAdminProtectedRoute";
import StatsPage from "./views/StatsPage";
import IsTechnicianProtectedRoute from "./views/IsTechnicianProtectedRoute";
import IsForbidden from "./views/IsForbidden";
import IsDeciderProtectedRoute from "./views/IsDeciderProtectedRoute";
import Dashboard from "./views/admin/Dashboard";
import Forms from "./views/admin/Forms";
import CentresDeSanteForm from "./components/Forms/CentresDeSanteForm";
import EglisesForm from "./components/Forms/EglisesForm";
import EnseignementsForm from "./components/Forms/EnseignementsForm";
import HebergementsForm from "./components/Forms/HebergementsForm";
import PharmaciesForm from "./components/Forms/PharmaciesForm";
import SecuritesForm from "./components/Forms/SecuritesForm";
import ServicesPubliquesForm from "./components/Forms/ServicesPubliquesForm";
import Tables from "./views/admin/Tables";
import CentresDeSanteTable from "./components/Tables/CentresDeSanteTable";
import EglisesTable from "./components/Tables/EglisesTable";
import EnseignementsTable from "./components/Tables/EnseignementsTable";
import HebergementsTable from "./components/Tables/HebergementsTable";
import PharmaciesTable from "./components/Tables/PharmaciesTable";
import SecuritesTable from "./components/Tables/SecuritesTable";
import ServicesPubliquesTable from "./components/Tables/ServicesPubliquesTable";
import Maps from "./views/admin/Maps";
import Login from "./views/auth/Login";
import EntityCommuneTable from "./components/Tables/EntityCommuneTable";
import EntityDepartmentTable from "./components/Tables/EntityDepartmentTable";
import EntityRegionTable from "./components/Tables/EntityRegionTable";
import EntityCommuneForm from "./components/Forms/EntityCommuneForm";
import EntityDepartmentForm from "./components/Forms/EntityDepartmentForm";
import EntityRegionForm from "./components/Forms/EntityRegionForm";
import EntityHydrographyForm from "./components/Forms/EntityHydrographyForm";
import EntityRoadForm from "./components/Forms/EntityRoadForm";
import EntityProjectForm from "./components/Forms/EntityProjectForm";
import EntityHydrographyTable from "./components/Tables/EntityHydrographyTable";
import EntityRoadTable from "./components/Tables/EntityRoadTable";
import EntityProjectTable from "./components/Tables/EntityProjectTable";
import EntityConseillerTable from "./components/Tables/EntityConseillerTable";
import EntityConseillerForm from "./components/Forms/EntityConseillerForm";
import ServiceForm from "./views/admin/ServiceForm";
import EntityForm from "./views/admin/EntityForm";

function App() {

  

  return (
    <BrowserRouter>
    <Routes>

      {/* add routes with layouts */}

      <Route path="/admin" element={
          <Admin />
        /*<ProtectedRoute>
        </ProtectedRoute>*/
      }>
          <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
          } />
          {/* <Route path="/admin/settings" element={<Settings />} /> */}
          
          {/*  Sub layouts for admin data forms */}
          <Route path="/admin/forms" element={
            <ProtectedRoute>
              <IsTechnicianProtectedRoute>
                <Forms />
              </IsTechnicianProtectedRoute>
            </ProtectedRoute>
          }>
            <Route path="/admin/forms/services" element={<ServiceForm />} >
              <Route path="/admin/forms/services/centre-sante" element={<CentresDeSanteForm />} />
              <Route path="/admin/forms/services/eglises" element={<EglisesForm />} />
              <Route path="/admin/forms/services/enseignement" element={<EnseignementsForm />} />
              <Route path="/admin/forms/services/hebergement" element={<HebergementsForm />} />
              <Route path="/admin/forms/services/pharmacies" element={<PharmaciesForm />} />
              <Route path="/admin/forms/services/securite" element={<SecuritesForm />} />
              <Route path="/admin/forms/services/services-publiques" element={<ServicesPubliquesForm />} />
              
              <Route path="/admin/forms/services" element={<Navigate  to="/admin/forms/services/centre-sante" />} />
            </Route>
            
            <Route path="/admin/forms/entities" element={<EntityForm />} >
              <Route path="/admin/forms/entities/communes" element={<EntityCommuneForm />} />
              <Route path="/admin/forms/entities/departements" element={<EntityDepartmentForm />} />
              <Route path="/admin/forms/entities/regions" element={<EntityRegionForm />} />
              <Route path="/admin/forms/entities/hydrographie" element={<EntityHydrographyForm />} />
              <Route path="/admin/forms/entities/routes" element={<EntityRoadForm />} />
              
              <Route path="/admin/forms/entities" element={<Navigate  to="/admin/forms/entities/communes" />} />
            </Route>
            
            <Route path="/admin/forms/projets" element={<EntityProjectForm />} />
            <Route path="/admin/forms/conseillers" element={<EntityConseillerForm />} />

            <Route path="/admin/forms" element={<Navigate  to="/admin/forms/services" />} />
          </Route>

          {/*  Sub Layouts for admin data tables */}
          <Route path="/admin/tables" element={
            <ProtectedRoute>
              <IsTechnicianProtectedRoute>
                <Tables />
              </IsTechnicianProtectedRoute>
            </ProtectedRoute>
          }>
              <Route path="/admin/tables/centre-sante" element={<CentresDeSanteTable />} />
              <Route path="/admin/tables/eglises" element={<EglisesTable />} />
              <Route path="/admin/tables/enseignement" element={<EnseignementsTable />} />
              <Route path="/admin/tables/hebergement" element={<HebergementsTable />} />
              <Route path="/admin/tables/pharmacies" element={<PharmaciesTable />} />
              <Route path="/admin/tables/securite" element={<SecuritesTable />} />
              <Route path="/admin/tables/services-publiques" element={<ServicesPubliquesTable />} />
              
              <Route path="/admin/tables/communes" element={<EntityCommuneTable />} />
              <Route path="/admin/tables/departements" element={<EntityDepartmentTable />} />
              <Route path="/admin/tables/regions" element={<EntityRegionTable />} />
              <Route path="/admin/tables/hydrographie" element={<EntityHydrographyTable />} />
              <Route path="/admin/tables/routes" element={<EntityRoadTable />} />
              <Route path="/admin/tables/projets" element={<EntityProjectTable />} />
              <Route path="/admin/tables/conseillers" element={<EntityConseillerTable />} />
              
              <Route path="/admin/tables" element={<Navigate  to="/admin/tables/centre-sante" />} />
          </Route>

          <Route path="/admin" element={<Navigate  to="/admin/dashboard" />} />
      </Route>

      {/* Map Route */}
      <Route path="/map" element={
        <ProtectedRoute>
          <Maps />
        </ProtectedRoute>
      } />

      {/* Auth Routes */}
      <Route path="/auth" element={<Auth />}>
            <Route path="/auth/login" element={<Login />} />
            {/* <Route path="/auth/register" element={<Register />} /> */}
            <Route path="/auth" element={<Navigate  to="/auth/login" />} />
      </Route>

      {/* add routes without layouts */}
      <Route path="/stats" element={
        <ProtectedRoute>
          <IsDeciderProtectedRoute>
            <StatsPage />
          </IsDeciderProtectedRoute>
        </ProtectedRoute>
      } />

      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />

      <Route path="/users-administration" element={
        <ProtectedRoute>
          <IsAdminProtectedRoute>
            <AdminPage />
          </IsAdminProtectedRoute>
        </ProtectedRoute>
      } />

      <Route path="/" element={
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
      } />
0
      <Route path="/403" element={
        <IsForbidden />
      } />

    </Routes>
  </BrowserRouter>
  );
}

export default App;
