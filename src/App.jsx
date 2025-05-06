import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import NationsUniesPointForm from "./components/Forms/NationsUniesPointForm";
import NationsUniesPointTable from "./components/Tables/NationsUniesPointTable";
import SapeurPompierPointForm from "./components/Forms/SapeurPompierPointForm";
import SapeurPompierPointTable from "./components/Tables/SapeurPompierPointTable";
import LaveriesPointTable from "./components/Tables/LaveriesFontPointTable";
import LaveriesPointForm from "./components/Forms/LaveriesFontPointForm";
import GendarmeriesPointForm from "./components/Forms/GendarmeriesPointForm";
import GendarmeriesPointTable from "./components/Tables/GendarmeriesPointTable";
import CommissariatsYdePointForm from "./components/Forms/CommissariatsYdePointForm";
import CommissariatsYdePointTable from "./components/Tables/CommissariatsYdePointTable";
import StationsServiceFontPointForm from "./components/Forms/StationsServiceFontPointForm";
import StationsServiceFontPointTable from "./components/Tables/StationsServiceFontPointTable";
import BanquesEtMicrofinancesCustomPointForm from "./components/Forms/BanquesEtMicrofinancesCustomPointForm";
import BanquesEtMicrofinancesCustomPointTable from "./components/Tables/BanquesEtMicrofinancesCustomPointTable";
import ComplexSportifCustomPointForm from "./components/Forms/ComplexSportifCustomPointForm";
import ComplexSportifCustomPointTable from "./components/Tables/ComplexSportifCustomPointTable";
import EcolesMatPrimairePointTable from "./components/Tables/EcolesMatPrimairePointTable";
import EcolesMatPrimairePointForm from "./components/Forms/EcolesMatPrimairePointForm";
import EnseignementSuperieurCustomPointForm from "./components/Forms/EnseignementSuperieurCustomPointForm";
import EnseignementSuperieurCustomPointTable from "./components/Tables/EnseignementSuperieurCustomPointTable";
import EnseignementSecondaireFinalPointForm from "./components/Forms/EnseignementSecondaireFinalPointForm";
import EnseignementSecondaireFinalPointTable from "./components/Tables/EnseignementSecondaireFinalPointTable";
import RestaurantsYaoundeFontPointForm from "./components/Forms/RestaurantsYaoundeFontPointForm";
import RestaurantsYaoundeFontPointTable from "./components/Tables/RestaurantsYaoundeFontPointTable";
import BoulangeriesCustomPointForm from "./components/Forms/BoulangeriesCustomPointForm";
import BoulangeriesCustomPointTable from "./components/Tables/BoulangeriesCustomPointTable";
import CentresCulturelsCustomPointForm from "./components/Forms/CentresCulturelsCustomPointForm";
import CentresCulturelsCustomPointTable from "./components/Tables/CentresCulturelsCustomPointTable";
import PharmaciesPointForm from "./components/Forms/PharmaciesPointForm";
import PharmaciesPointTable from "./components/Tables/PharmaciesPointTable";
import HotelsPointForm from "./components/Forms/HotelsPointForm";
import HotelsPointTable from "./components/Tables/HotelsPointTable";
import CitesMunicipalesPointForm from "./components/Forms/CitesMunicipalesPointForm";
import CitesMunicipalesPointTable from "./components/Tables/CitesMunicipalesPointTable";
import LieuxRemarquablesPointForm from "./components/Forms/LieuxRemarquablesPointForm";

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
            <Route path="/admin/forms/nations-unies" element={<NationsUniesPointForm />} />
            <Route path="/admin/forms/gendarmeries" element={<GendarmeriesPointForm />} />
            <Route path="/admin/forms/sapeurpompier" element={<SapeurPompierPointForm />} />
            <Route path="/admin/forms/laveries" element={<LaveriesPointForm />} />
            <Route path="/admin/forms/gendarmeries" element={<GendarmeriesPointForm />} />
            <Route path="/admin/forms/commissariats" element={<CommissariatsYdePointForm />} />
            <Route path="/admin/forms/stations-services" element={<StationsServiceFontPointForm />} />
            <Route path="/admin/forms/banques-microfinances" element={<BanquesEtMicrofinancesCustomPointForm />} />
            <Route path="/admin/forms/complex-sportif" element={<ComplexSportifCustomPointForm />} />
            <Route path="/admin/forms/ecoles-mat-prim" element={<EcolesMatPrimairePointForm />} />
            <Route path="/admin/forms/ens-sup" element={<EnseignementSuperieurCustomPointForm />} />
            <Route path="/admin/forms/ens-sec" element={<EnseignementSecondaireFinalPointForm />} />
            <Route path="/admin/forms/restaurants" element={<RestaurantsYaoundeFontPointForm />} />
            <Route path="/admin/forms/boulangeries" element={<BoulangeriesCustomPointForm />} />
            <Route path="/admin/forms/centres-culturels" element={<CentresCulturelsCustomPointForm />} />
            <Route path="/admin/forms/cites-municipales" element={<CitesMunicipalesPointForm />} />
            <Route path="/admin/forms/pharmacies" element={<PharmaciesPointForm />} />
            <Route path="/admin/forms/hotels" element={<HotelsPointForm />} />
            <Route path="/admin/forms/lieux-remarquables" element={<LieuxRemarquablesPointForm />} />
            <Route path="/admin/forms" element={<Navigate  to="/admin/forms/mosquee" />} />
          </Route>

          {/*  Sub Layouts for admin data tables */}
          <Route path="/admin/tables" element={<Tables />}>
              <Route path="/admin/tables/mosquee" element={<MosqueeFontPointTable />} />
              <Route path="/admin/tables/nations-unies" element={<NationsUniesPointTable />} />
              <Route path="/admin/tables/sapeurpompier" element={<SapeurPompierPointTable />} />
              <Route path="/admin/tables/laveries" element={<LaveriesPointTable />} />
              <Route path="/admin/tables/gendarmeries" element={<GendarmeriesPointTable />} />
              <Route path="/admin/tables/commissariats" element={<CommissariatsYdePointTable />} />
              <Route path="/admin/tables/stations-services" element={<StationsServiceFontPointTable />} />
              <Route path="/admin/tables/banques-microfinances" element={<BanquesEtMicrofinancesCustomPointTable />} />
              <Route path="/admin/tables/complex-sportif" element={<ComplexSportifCustomPointTable />} />
              <Route path="/admin/tables/ecoles-mat-prim" element={<EcolesMatPrimairePointTable />} />
              <Route path="/admin/tables/ens-sup" element={<EnseignementSuperieurCustomPointTable />} />
              <Route path="/admin/tables/ens-sec" element={<EnseignementSecondaireFinalPointTable />} />
              <Route path="/admin/tables/restaurants" element={<RestaurantsYaoundeFontPointTable />} />
              <Route path="/admin/tables/boulangeries" element={<BoulangeriesCustomPointTable />} />
              <Route path="/admin/tables/centres-culturels" element={<CentresCulturelsCustomPointTable />} />
              <Route path="/admin/tables/cites-municipales" element={<CitesMunicipalesPointTable />} />
              <Route path="/admin/tables/pharmacies" element={<PharmaciesPointTable />} />
              <Route path="/admin/tables/hotels" element={<HotelsPointTable />} />
              <Route path="/admin/tables/lieux-remarquables" element={<LieuxRemarquablesPointForm />} />
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
      {/* <Route path="*" element={<Navigate  to="/" />} /> */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
