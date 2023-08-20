import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import { getStations } from "../../../services/api";
import { macasImg } from "../../../utils/constants";

import NavBar from "../../navbar/Navbar";
import { Container, Row, Col, ListGroup, Card, Spinner } from "react-bootstrap";
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
  ShowDateReservation,
} from "./NewReservation";
import { BackdropLoading } from "../../feedbacks/LoadingBackDrop";

const Newreservation = () => {
  const [newReservation, setNewReservation] = useState({});
  const [showFinalPickTime, setFinalShowPickTime] = useState(false);
  const [showPickStationAvailable, setShowPickStationAvailable] = useState(false);
  const [stationSelected, setStationSelected] = useState();
  const [stationsAvailable, setStationsAvailable] = useState([]);
  const [showErrorMsg, setShowErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingConfirmReservation, setLoadingConfirmReservation] = useState(false);

  const recoveryUser = localStorage.getItem("user");
  const user = JSON.parse(recoveryUser);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    submit(
      e,
      newReservation,
      user,
      stationSelected,
      setShowErrorMsg,
      setFinalShowPickTime,
      navigate,
      setLoadingConfirmReservation
    );
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
                handleOnChange={(e) =>
                  startTime(
                    e,
                    setNewReservation,
                    newReservation,
                    setFinalShowPickTime,
                    setStationSelected,
                    setShowErrorMsg
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
                  handleOnChange={(e) => finalTime(newReservation, e, setNewReservation)}
                />
                <FormButton
                  text="Verificar Disponibilidade"
                  width={210}
                  disabled={loading}
                  handleClick={(e) =>
                    verifyAvailable(
                      e,
                      newReservation,
                      setStationsAvailable,
                      setShowPickStationAvailable,
                      setStationSelected,
                      setLoading
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
                {stationsAvailable.map((station) => {
                  return (
                    <ListGroup.Item className={styles.list_area} key={station._id}>
                      <img src={macasImg[station.name]} alt="Equipamento" />
                      <span>{station.name}</span>
                      <FormButton
                        text="Selecionar"
                        handleClick={(e) =>
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
                <Card.Img variant="top" src={macasImg[stationSelected.name]} />
                <Card.Body>
                  <Card.Title>{stationSelected.name}</Card.Title>
                  <Card.Text>
                    <strong>Reserva dia: </strong>
                    <ShowDateReservation reservation={newReservation} />
                  </Card.Text>
                  <Card.Text>
                    <strong>Tatuador: </strong> {user.username}
                  </Card.Text>
                  <FormButton
                    text="Confirmar"
                    handleClick={(e) => handleSubmit(e)}
                    disabled={loadingConfirmReservation}
                  />
                  <FormButton
                    text="Cancelar"
                    handleClick={(e) => {
                      e.preventDefault();
                      setStationSelected(false);
                      setShowErrorMsg(false);
                    }}
                  />
                  {showErrorMsg ? <Alert severity="error" msg={showErrorMsg} /> : null}
                </Card.Body>
              </Card>
            </Col>
          ) : null}
        </Row>
      </Container>
      {(loading || loadingConfirmReservation) && <BackdropLoading />}
    </form>
  );
};

export default Newreservation;
