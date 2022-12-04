import React, { useEffect, useContext } from "react";

import { Col, Container, Row } from "react-bootstrap";
import styles from "./HomePage.module.css";
import "react-calendar/dist/Calendar.css";
import NavBar from "../navbar/Navbar";
import { LinkButton } from "../buttons/Buttons";
import { getInfoUser } from "../../services/api";
import { AuthContext } from "../../contexts/auth";

const HomePage = () => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        const recoveredUser = JSON.parse(localStorage.getItem("user"));
        await getInfoUser(recoveredUser.id);
      } catch (error) {
        if (error.response.status === 401) logout();
      }
    })();
  }, []);

  return (
    <div className={styles.home_page}>
      <NavBar />
      <Container>
        <h1>Bem vindo escolha sua maca</h1>
        <Row>
          <Col className={styles.col} sm={6}>
            <LinkButton to="/newreservationpage" text="Fazer uma reserva"></LinkButton>
          </Col>
          <Col className={styles.col} sm={6}>
            <LinkButton to="/myreservations" text="Minhas reservas"></LinkButton>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
