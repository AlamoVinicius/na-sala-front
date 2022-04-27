import { useContext } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import HomePage from "./components/pages/HomePage";
import Login from "./components/pages/Login";
import Container from "./components/layout/Container";

import { Authprovider, AuthContext } from "./contexts/auth";

const AppRoutes = () => {
  //privando rota home page
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
    // sinal !!user => cast for boolean == boolean()
    <Router>
      <Container>
        <Authprovider>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route
              exact
              path="/"
              element={
                <Private>
                  <HomePage />
                </Private>
              }
            />
          </Routes>
        </Authprovider>
      </Container>
    </Router>
  );
};

export default AppRoutes;
