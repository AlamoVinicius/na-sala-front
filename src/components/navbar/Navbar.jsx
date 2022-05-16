import React, { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";

import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import styles from "./Navbar.module.css";


const NavBar = () => {
  const { logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };


  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className={styles.navbar}>
      <Container>
       <Link to={"/"}> <Navbar.Brand>NaSala reservas</Navbar.Brand></Link>
        <Navbar.Text className="justify-items-center">
          Bem vindo: "{user.username}"
        </Navbar.Text>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {user.nivelUser === 1 ? (
              <NavDropdown title="Admin" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Novo usuário
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Deletar um usuário
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Todas as reservas
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Ver todos os usuários
                </NavDropdown.Item>
              </NavDropdown>
            ) : null}
          </Nav>
          <Nav>
            <Link className={styles.navbar_target} to={"/myreservations"}>
              Minhas reservas
            </Link>
            <Nav.Link onClick={handleLogout}>sair</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
