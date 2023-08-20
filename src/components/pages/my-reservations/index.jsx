import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { deleteBooking, getMyBookings } from "../../../services/api";

import NavBar from "../../navbar/Navbar";
import { Container, Alert, Spinner } from "react-bootstrap";
import { MyReservationList } from "./MyReservation";
import styles from "./MyReservation.module.css";
import { toast } from "react-toastify";

const Myreservations = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const handleDeleteSchedule = useCallback(async (scheduleId) => {
    try {
      await deleteBooking(scheduleId);
      toast.success("Reserva removida com sucesso");
      setBookings((prev) => prev.filter((schedule) => schedule._id !== scheduleId));
    } catch (error) {
      toast.error(error?.response?.data.message ?? "ocorreu um erro ao remover a reserva");
    }
  }, []);

  useEffect(() => {
    try {
      const get = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const bookings = await getMyBookings(user.username);
        if (bookings?.data?.length === 0) {
          setErrorMsg("não existem reservas feita por você");
          setIsLoading(false);
          return;
        }
        setBookings(bookings.data);
        setIsLoading(false);
      };
      get();
    } catch (error) {
      setErrorMsg("ocorreu algum erro ao buscar as informações");
    }
  }, []);

  return (
    <div>
      <NavBar />
      <Container>
        {/* {showMsg && <Alert variant="success">{msg}</Alert>} */}
        <h2>Minhas reservas</h2>
        <p>Reservas a partir do dia atual</p>
        {isLoading && (
          <div className={styles.spinner}>
            <Spinner animation="border" />
          </div>
        )}
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
        {bookings.map((booking) => {
          return <MyReservationList key={booking._id} bookings={booking} handleDeleteSchedule={handleDeleteSchedule} />;
        })}
      </Container>
    </div>
  );
};

export default Myreservations;
