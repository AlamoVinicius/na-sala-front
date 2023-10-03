import React from "react";

import { Col, Container, Row } from "react-bootstrap";
import styles from "./HomePage.module.css";
import "react-calendar/dist/Calendar.css";
import NavBar from "../navbar/Navbar";
import { LinkButton } from "../buttons/Buttons";

const HomePage = () => {
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
