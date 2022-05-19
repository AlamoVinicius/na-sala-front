import React, { useState } from "react";

//import { getStations } from "../../../services/api";

import NavBar from "../../navbar/Navbar";
import { Container, Row, Col, ListGroup, Card } from "react-bootstrap";
import { FormButton } from "../../buttons/Buttons";
import styles from "./index.module.css";
import { InputEffect } from "../../inputs/Inputs";

import {
  submit,
  startTime,
  finalTime,
  verifyAvailable,
  handlePickSelected
} from "./NewReservation";

const Newreservation = () => {
  const [newReservation, setNewReservation] = useState({});
  const [showFinalPickTime, setFinalShowPickTime] = useState(false);
  const [showPickStationAvailable, setShowPickStationAvailable] = useState(
    false
  );
  const [stationSelected, setStationSelected] = useState();
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
                      <FormButton
                        text="Selecionar"
                        handleClick={e =>
                          handlePickSelected(
                            e,
                            station,
                            setStationSelected,
                            setShowPickStationAvailable
                          )
                        }
                      />
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Col>
          ) : null}
          {stationSelected ? (
            <Col sm={6} className={styles.card}>
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src="https://images.tcdn.com.br/img/img_prod/899714/maca_para_tatuagem_pt_03_pontual_estetica_preta_385_1_20201217175550.jpg"
                />
                <Card.Body>
                  <Card.Title>{stationSelected.name}</Card.Title>
                  <Card.Text>
                    <strong>reserva dia: </strong>
                    {JSON.stringify(newReservation.startDate)} /{" "}
                    {JSON.stringify(newReservation.finalDate)}
                  </Card.Text>
                  <Card.Text>
                    <strong>Usuário: </strong> {user.username}
                  </Card.Text>
                  <FormButton
                    text="Confirmar"
                    handleClick={e => handleSubmit(e)}
                  />
                  <FormButton
                    text="Cancelar"
                    handleClick={e => {
                      e.preventDefault();
                      setStationSelected(false);
                    }}
                  />
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
