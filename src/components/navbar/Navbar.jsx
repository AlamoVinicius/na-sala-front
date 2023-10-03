import React from "react";
import { useAuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";

import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import styles from "./Navbar.module.css";

const NavBar = () => {
  const { logout, user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Link to={"/"} className={styles.navbar_target}>
          <Navbar.Brand>
            {/* <img src={logo} alt="logo Smart INk" style={{ width: 100, height: 45, padding: 10 }} /> */}
            {user.studioName ?? "Nome do estúdio"}
          </Navbar.Brand>
        </Link>

        <Navbar.Text>
          <span style={{ fontWeight: "bold", marginRight: 2 }}>{user.username}</span>
        </Navbar.Text>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" />
        <Navbar.Offcanvas id="offcanvasNavbar-expand-sm" aria-labelledby={`offcanvasNavbarLabel-expand-lg`}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title style={{ fontWeight: 400 }} id={`offcanvasNavbarLabel-expand-lg`}>
              <span style={{ fontWeight: "bold" }}>{user.username}</span>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body style={{ background: "#212529" }}>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {user.nivelUser > 0 ? (
                <Link to={"/admin"} className={styles.navbar_target}>
                  Admin
                </Link>
              ) : null}
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
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBar;
