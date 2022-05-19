import React, { useState } from "react";

//import { getStations } from "../../../services/api";

import NavBar from "../../navbar/Navbar";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { FormButton } from "../../buttons/Buttons";
import styles from "./index.module.css";
import { InputEffect } from "../../inputs/Inputs";

import {
  submit,
  startTime,
  finalTime,
  verifyAvailable
} from "./NewReservation";

const Newreservation = () => {
  const [newReservation, setNewReservation] = useState({});
  const [showFinalPickTime, setFinalShowPickTime] = useState(false);
  const [showPickStationAvailable, setShowPickStationAvailable] = useState(
    false
  );

  const [stationsAvailable, setStationsAvailable] = useState([]);
  const recoveryUser = localStorage.getItem("user");
  const user = JSON.parse(recoveryUser); // transformar user em objeto pois ele vem como string do local storage

  const handleSubmit = e => {
    submit(e, setNewReservation, newReservation, user);
    //console.log(newReservation);
  };

  return (
    <form className={styles.newReservation_area}>
      <NavBar />
      <Container>
        <Row>
          <Col sm={6}>
            <div className={styles.date_time_zone}>
              <p>Selecione um dia e o horário inicial da sua reserva: </p>
              <InputEffect
                textLabel="Selecione o dia e a hora:"
                type="datetime-local"
                name="startDate"
                handleOnChange={e =>
                  startTime(
                    e,
                    setNewReservation,
                    newReservation,
                    setFinalShowPickTime
                  )
                }
              />
            </div>
            {showFinalPickTime ? (
              <div className={styles.date_time_zone}>
                <p>Selecione o horário final da sua reserva:</p>
                <InputEffect
                  textLabel="horário final"
                  type="time"
                  name="finalDate"
                  handleOnChange={e =>
                    finalTime(newReservation, e, setNewReservation)
                  }
                />
                <FormButton
                  text="Verificar Disponibilidade"
                  handleClick={e =>
                    verifyAvailable(
                      e,
                      newReservation,
                      setStationsAvailable,
                      setShowPickStationAvailable
                    )
                  }
                />
              </div>
            ) : null}
          </Col>
          {showPickStationAvailable ? (
            <Col sm={6}>
              <h2>Macas disponíveis</h2>
              <ListGroup>
                {stationsAvailable.map(station => {
                  return (
                    <ListGroup.Item
                      className={styles.list_area}
                      key={station._id}
                    >
                      <img src="https://via.placeholder.com/75x75" alt="" />
                      <span className={styles.list_span}>{station.name}</span>
                      <FormButton text="Selecionar" />
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Col>
          ) : null}
        </Row>
      </Container>
    </form>
  );
};

export default Newreservation;
