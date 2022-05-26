import React, { useState } from "react";
import { getBookingsbyDay } from "../../../services/api";

import Calendar from "react-calendar";

import { Container, Row, Col, Spinner, Alert, Table } from "react-bootstrap";
import styles from "./BookingAdmin.module.css";

const BookingAdmin = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleOnChange = async (e) => {
    setShowAlert(false);
    setBookings([]);
    setIsLoading(true);
    const date = new Date(e).setUTCHours(3);
    try {
      const FetchBookings = await getBookingsbyDay(new Date(date));
      const bookingArry = FetchBookings.data;
      if (bookingArry.length === 0) {
        setErrorMsg("Não existem reservas para este dia");
        setIsLoading(false);
        setShowAlert(true);
        return;
      }
      setBookings(FetchBookings.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setErrorMsg("Erro ao carregar reservas");
      setIsLoading(false);
      setShowAlert(true);
    }
  };

  const showHour = (booking) => {   // função responsavel de pegar os horários e converter corretamente para mostrar na tabela
    const startTime = new Date(booking.startDate);
    const finalTime = new Date(booking.finalDate);
    return `${String(startTime.getHours()).padStart(2, "0")}:${String(startTime.getMinutes()).padStart(2,"0")}
     até ${String(finalTime.getHours()).padStart(2, "0")}:${String(finalTime.getMinutes()).padStart(2, "0")}`;
  };

  return (
    <Container>
      <Row>
        <Col>
          <p>Selecione o dia para verificar as reservas</p>
          <Calendar onChange={(e) => handleOnChange(e)} />
        </Col>
        <Col>
          {isLoading && (
            <div className={styles.spinner_area}>
              <Spinner animation="border" />
            </div>
          )}
          {showAlert && <Alert variant="danger">{errorMsg}</Alert>}
          {bookings.length > 0 && (
            <Table striped bordered hover style={{ marginTop: "20px" }}>
              <thead>
                <tr>
                  <th>Maca</th>
                  <th>Tatuador</th>
                  <th>Horário</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => {
                  return (
                    <tr key={booking._id}>
                      <td>{booking.stationName}</td>
                      <td>{booking.username}</td>
                      <td>{showHour(booking)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BookingAdmin;
