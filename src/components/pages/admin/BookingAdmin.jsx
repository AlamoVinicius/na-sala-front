import "./BookingAdmin.css";
import React, { useState, useEffect } from "react";
import { getBookingsbyDay, getAllReservationFromMonth } from "../../../services/api";
import moment from "moment";

import Calendar from "react-calendar";

import { Container, Row, Col, Spinner, Alert, Table } from "react-bootstrap";

const BookingAdmin = () => {
  const [bookings, setBookings] = useState([]);
  const [allBookingsMonth, setAllBookingsMonth] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingFetchApi, setLoadingFetchApi] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // const calendarValues = [new Date("2022/12/06"), new Date("2022/12/18"), new Date("2022/12/23")];

  useEffect(() => {
    (async () => {
      try {
        setLoadingFetchApi(true);
        const monthReservation = await getAllReservationFromMonth();
        // console.log(monthReservation);
        setAllBookingsMonth(monthReservation.data);
      } catch (error) {
        alert("ocorreu um erro ao tentar buscar os dados");
        console.log(error);
      } finally {
        setLoadingFetchApi(false);
      }
    })();
  }, []);

  const handleOnChange = async (e) => {
    // alert(e);
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

  const showHour = (booking) => {
    // função responsavel de pegar os horários e converter corretamente para mostrar na tabela
    const startTime = new Date(booking.startDate);
    const finalTime = new Date(booking.finalDate);
    return `${String(startTime.getHours()).padStart(2, "0")}:${String(startTime.getMinutes()).padStart(2, "0")}
     até ${String(finalTime.getHours()).padStart(2, "0")}:${String(finalTime.getMinutes()).padStart(2, "0")}`;
  };

  const convertDAte = (date) => {
    return moment(date).format("YYYY-MM-DD");
  };

  const newArrayFormat = allBookingsMonth.map((data) => convertDAte(data.finalDate));
  console.log(newArrayFormat[0]);

  const showHighlight = ({ date }) => {
    if (newArrayFormat.includes(convertDAte(date))) return "highlight";
  };

  const ShowLoading = () => (
    <div className="spinner_area">
      <Spinner animation="border" />
    </div>
  );

  return (
    <Container>
      <Row>
        <Col>
          <p>Selecione o dia para verificar as reservas</p>
          {loadingFetchApi ? (
            <ShowLoading />
          ) : (
            <Calendar onChange={(e) => handleOnChange(e)} tileClassName={showHighlight} />
          )}
        </Col>
        <Col>
          {showAlert && <Alert variant="danger">{errorMsg}</Alert>}
          {isLoading ? (
            <ShowLoading />
          ) : (
            bookings.length > 0 && (
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
            )
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BookingAdmin;
