import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Page from './component/loding/page.jsx';
import Auth from './component/Authentification/Auth.jsx';
import DashboardLayout from './component/Dashboard/DashboardLayout';
import DashboardHome from './component/Dashboard/Pages/DashboardHome';
import Ajouter from './component/Dashboard/Pages/Ajouter';
import Management from './component/Dashboard/Pages/Management';
import Contact from './component/Dashboard/Pages/Contact';
import Compte from './component/Dashboard/Pages/Compte';
import Modifier from './component/Dashboard/Pages/Modifier';
import Details from './component/Dashboard/Pages/Details';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Page />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<DashboardHome />} />
        <Route path="ajouter" element={<Ajouter />} />
        <Route path="management" element={<Management />} />
        <Route path="modifier/:id" element={<Modifier />} />
        <Route path="details/:id" element={<Details />} />
        <Route path="contact" element={<Contact />} />
        <Route path="compte" element={<Compte />} />
      </Route>
    </Routes>
  );
}

export default App;
