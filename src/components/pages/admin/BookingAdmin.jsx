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
  // const [newArrayFormat, setNewArrayFormat] = useState([]);

  const [rangeMonthParam, setRangeMonthParam] = useState([
    moment().startOf("month").format(),
    moment().endOf("month").format(),
  ]);

  // const calendarValues = [new Date("2022/12/06"), new Date("2022/12/18"), new Date("2022/12/23")];

  useEffect(() => {
    (async () => {
      try {
        const monthReservation = await getAllReservationFromMonth(rangeMonthParam);
        console.log(monthReservation.data.length);
        setAllBookingsMonth(monthReservation.data.map((data) => convertDAte(data.finalDate)));
      } catch (error) {
        alert("ocorreu um erro ao tentar buscar os dados");
        console.log(error);
      } finally {
      }
    })();
  }, [rangeMonthParam]);

  const handleParamsMonthBookings = async (props) => {
    const startofMonth = moment(props.activeStartDate).startOf("month").format();
    const finalofMonth = moment(props.activeStartDate).endOf("month").format();
    setRangeMonthParam([startofMonth, finalofMonth]);
  };

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

  const showHour = (booking) => {
    const startTime = new Date(booking.startDate);
    const finalTime = new Date(booking.finalDate);
    return `${String(startTime.getHours()).padStart(2, "0")}:${String(startTime.getMinutes()).padStart(2, "0")}
     até ${String(finalTime.getHours()).padStart(2, "0")}:${String(finalTime.getMinutes()).padStart(2, "0")}`;
  };

  const convertDAte = (date) => {
    return moment(date).format("YYYY-MM-DD");
  };

  const showHighlight = ({ date, view }) => {
    if (view === "month" && allBookingsMonth.includes(convertDAte(date))) return "highlight";
  };

  const ShowLoading = () => (
    <div className="spinner_area">
      <Spinner animation="border" />
    </div>
  );

  return (
    <Container>
      <Row>
        <Col className="background_Col">
          <p>Selecione o dia para verificar as reservas</p>

          <Calendar
            onChange={(e) => handleOnChange(e)}
            tileClassName={showHighlight}
            onActiveStartDateChange={handleParamsMonthBookings}
            className="custom_style"
          />
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
