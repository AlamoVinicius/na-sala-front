import React from "react";

import { Navbar, Container } from "react-bootstrap";

import styles from "./HomePage.module.css";

import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

const HomePage = () => {
  const { logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home"><spam>Bem vindo: {user.username}</spam></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a href="#login" onClick={handleLogout}>Sair</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HomePage;
