import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//import { getStations } from "../../../services/api";

import NavBar from "../../navbar/Navbar";
import { Container, Row, Col, ListGroup, Card } from "react-bootstrap";
import { FormButton } from "../../buttons/Buttons";
import styles from "./index.module.css";
import { InputEffect } from "../../inputs/Inputs";
import Alert from "../../layout/Alert";

import {
  submit,
  startTime,
  finalTime,
  verifyAvailable,
  handlePickSelected,
  ShowDateReservation
} from "./NewReservation";

const Newreservation = () => {
  const [newReservation, setNewReservation] = useState({});
  const [showFinalPickTime, setFinalShowPickTime] = useState(false);
  const [showPickStationAvailable, setShowPickStationAvailable] = useState(false);
  const [stationSelected, setStationSelected] = useState();
  const [stationsAvailable, setStationsAvailable] = useState([]);
  const [showErrorMsg, setShowErrorMsg] = useState(null);

  const recoveryUser = localStorage.getItem("user");
  const user = JSON.parse(recoveryUser); // transformar user em objeto pois ele vem como string do local storage
  const navigate = useNavigate();
  const handleSubmit = e => {
    submit(e, newReservation, user, stationSelected, setShowErrorMsg, setFinalShowPickTime, navigate);
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
                handleOnChange={e => startTime(e, setNewReservation, newReservation, setFinalShowPickTime, setStationSelected, setShowErrorMsg)}
              />
            </div>
            {showFinalPickTime ? (
              <div className={styles.date_time_zone}>
                <p>Selecione o horário final da sua reserva:</p>
                <InputEffect
                  textLabel="horário final"
                  type="time"
                  name="finalDate"
                  handleOnChange={e => finalTime(newReservation, e, setNewReservation)}
                />
                <FormButton
                  text="Verificar Disponibilidade"
                  handleClick={e =>
                    verifyAvailable(e, newReservation, setStationsAvailable, setShowPickStationAvailable)
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
                    <ListGroup.Item className={styles.list_area} key={station._id}>
                      <img src={station.image} alt="Equipamento" />
                      <span>{station.name}</span>
                      <FormButton
                        text="Selecionar"
                        handleClick={e =>
                          handlePickSelected(e, station, setStationSelected, setShowPickStationAvailable)
                        }
                      />
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Col>
          ) : null}
          {stationSelected ? (
            <Col sm={6}>
              <Card style={{ width: "18rem" }} className={styles.card}>
                <Card.Img variant="top" src={stationSelected.image} />
                <Card.Body>
                  <Card.Title>{stationSelected.name}</Card.Title>
                  <Card.Text>
                    <strong>Reserva dia: </strong>
                    <ShowDateReservation reservation={newReservation} />
                  </Card.Text>
                  <Card.Text>
                    <strong>Tatuador: </strong> {user.username}
                  </Card.Text>
                  <FormButton text="Confirmar" handleClick={e => handleSubmit(e)} />
                  <FormButton
                    text="Cancelar"
                    handleClick={e => {
                      e.preventDefault();
                      setStationSelected(false);
                      setShowErrorMsg(false)
                    }}
                  />
                  {showErrorMsg ? <Alert severity="error" msg={showErrorMsg} /> : null}
                </Card.Body>
              </Card>
            </Col>
          ) : null}
        </Row>
      </Container>
    </form>
  );
};

export default Newreservation;
