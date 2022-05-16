import React, { useState } from "react";

//import { getStations } from "../../../services/api";

import NavBar from "../../navbar/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import { FormButton } from "../../buttons/Buttons";
import styles from "./index.module.css";
import { InputEffect } from "../../inputs/Inputs";

import { submit, startTime, finalTime } from "./NewReservation";

const Newreservation = () => {
  const [newReservation, setNewReservation] = useState({});
  const [showFinalPickTime, setFinalShowPickTime] = useState(false);
  const [stations, setStations] = useState([]);
  const recoveryUser = localStorage.getItem("user");
  const user = JSON.parse(recoveryUser); // transformar user em objeto pois ele vem como string do local storage

  const handleSubmit = e => {
    submit(e, setNewReservation, setStations, newReservation, user);
    console.log(newReservation);
  };

  const handleStartTime = e => {
    startTime(e, setNewReservation, newReservation, setFinalShowPickTime);
  };

  const handleFinalTime = e => {
    finalTime(newReservation, e, setNewReservation);
  };

  return (
    <form onSubmit={handleSubmit}>
      <NavBar />
      <Container>
        <Row>
          <Col sm={6}>
            <div className={styles.date_time_zone}>
              <p>Selecione um dia e o horário inicial da sua reserva: </p>
              <InputEffect
                textLabel="Selecione o dia e a hora:"
                type="datetime-local"
                name="StartDate"
                handleOnChange={handleStartTime}
              />
            </div>
            {showFinalPickTime ? (
              <div className={styles.date_time_zone}>
                <p>Selecione o horário final da sua reserva:</p>
                <InputEffect
                  textLabel="horário final"
                  type="time"
                  name="finalDate"
                  handleOnChange={handleFinalTime}
                />
                <FormButton text="Verificar Disponibilidade" />
              </div>
            ) : null}
          </Col>
          <Col sm={6}>
            <p>{JSON.stringify(newReservation)}</p>{" "}
            {/*Visualizaççao do objeto -debbug*/}
            <ul>
              {stations.map(station => {
                return <li key={station.name}>{station.name}</li>;
              })}
            </ul>
          </Col>
        </Row>
      </Container>
    </form>
  );
};

export default Newreservation;
