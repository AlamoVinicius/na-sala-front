import React, { useState } from "react";

import NavBar from "../../navbar/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./NewReservation.module.css";
import { InputEffect } from "../../inputs/Inputs";

const Newreservation = () => {
  const [newReservation, setNewReservation] = useState({});
  const [showFinalPickTime, setFinalShowPickTime] = useState(false);

  const handleStartTime = e => {
    const startDate = new Date(e.target.value);
    setNewReservation({ ...newReservation, [e.target.name]: startDate });
    startDate.getDate()
      ? setFinalShowPickTime(true)
      : setFinalShowPickTime(false);
  };

  const handleFinalTime = e => {
    let finalDate = new Date(newReservation.StartDate);
    const day = finalDate
      .getDate()
      .toString()
      .padStart(2, "0");
    const month = (finalDate.getMonth() + 1).toString().padStart(2, "0");
    const year = finalDate
      .getFullYear()
      .toString()
      .padStart(2, "0");
    finalDate = new Date(`${year}-${month}-${day}T${e.target.value}`);
    setNewReservation({ ...newReservation, [e.target.name]: finalDate });
    console.log(newReservation)
  };

  return (
    <div>
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
              </div>
            ) : null}
          </Col>
          <Col sm={6}>
            <p>{JSON.stringify(newReservation)}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Newreservation;
