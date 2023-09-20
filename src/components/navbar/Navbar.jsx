import React from "react";
import { useAuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";

import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "./Navbar.module.css";
import logo from "../../assets/imgs/icone-naSala.png";

const NavBar = () => {
  const { logout, user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className={styles.navbar}>
      <Container>
        <Link to={"/"}>
          <Navbar.Brand>
            <img src={logo} alt="logo na Sala" />
            NaSala reservas
          </Navbar.Brand>
        </Link>
        <Navbar.Text className="justify-items-center">Bem vindo: {user.username}</Navbar.Text>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {user.nivelUser > 0 ? (
              <Link to={"/admin"} className={styles.navbar_target}>
                Admin
              </Link>
            ) : null}
          </Nav>
          <Nav>
            <Link className={styles.navbar_target} to={"/"}>
              Home
            </Link>
            <Link className={styles.navbar_target} to={"/myreservations"}>
              Minhas reservas
            </Link>
            <Nav.Link className={styles.navbar_target} onClick={handleLogout}>
              sair
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
