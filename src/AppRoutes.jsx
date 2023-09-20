import React, { useContext } from "react";

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import HomePage from "./components/pages/HomePage";
import Login from "./components/pages/Login";
import NewReservationPage from "./components/pages/newReservation/";
import Myreservations from "./components/pages/my-reservations";
import NotFound from "./components/pages/NotFound";
import AdminPage from "./components/pages/admin";
import ItemsManagent from "./components/pages/ItemManagement";

import { Authprovider, AuthContext, useAuthContext } from "./contexts/auth";
import NavBar from "./components/navbar/Navbar";
const AppRoutes = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);
    if (loading) {
      return <div className="loading">Carregando...</div>;
    }

    if (!authenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const AdminRoutes = ({ children }) => {
    const { user } = useAuthContext();
    if (user.nivelUser > 0) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  };

  return (
    <Router>
      <Authprovider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            exact
            path="/"
            element={
              <Private>
                <HomePage />
              </Private>
            }
          />
          <Route
            path="/newreservationpage"
            element={
              <Private>
                <NewReservationPage />
              </Private>
            }
          />
          <Route
            path="/myreservations"
            element={
              <Private>
                <Myreservations />
              </Private>
            }
          />
          <Route
            path="/admin"
            element={
              <Private>
                <AdminRoutes>
                  <AdminPage />
                </AdminRoutes>
              </Private>
            }
          />
          <Route
            path="/itemsManagement"
            element={
              <Private>
                <AdminRoutes>
                  <NavBar />

                  <ItemsManagent />
                </AdminRoutes>
              </Private>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Authprovider>
    </Router>
  );
};

export default AppRoutes;
