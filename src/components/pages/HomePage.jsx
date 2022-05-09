import React from "react";

import { Col, Container, Row } from "react-bootstrap";
import styles from "./HomePage.module.css";
import "react-calendar/dist/Calendar.css";
import NavBar from "../navbar/Navbar";
import LinkButton from "../linkbutton/LinkButton";

const HomePage = () => {
  const date = Date.now()
  console.log(date)

  return (
    <div className={styles.home_page}>
      <NavBar/>
      <Container>
        <h1>
          Bem vindo sitema de reservas para macas
        </h1>
        <Row>
          <Col className={styles.col} sm={6}>
          <LinkButton to="/newreservation" text="Fazer uma reserva" ></LinkButton>
          </Col>
          <Col className={styles.col} sm={6}>
          <LinkButton to="/myreservations" text="Minhas reservas" ></LinkButton>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
