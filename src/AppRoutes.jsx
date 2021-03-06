import React, { useContext } from "react";

import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import HomePage from "./components/pages/HomePage";
import Login from "./components/pages/Login";
import NewReservationPage from "./components/pages/newReservation/";
import Myreservations from "./components/pages/my-reservations";
import NotFound from "./components/pages/NotFound";
import AdminPage from "./components/pages/admin";

import { Authprovider, AuthContext } from "./contexts/auth";
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
                <AdminPage />
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
