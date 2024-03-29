import React, { useCallback, useEffect, useState } from "react";

import { deleteBooking, getMyBookings } from "../../../services/api";

import NavBar from "../../navbar/Navbar";
import { Container, Alert } from "react-bootstrap";
import { MyReservationList } from "./MyReservation";
import { toast } from "react-toastify";
import { BackdropLoading } from "../../feedbacks/LoadingBackDrop";
import { useAuthContext } from "../../../contexts/auth";

const Myreservations = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { user } = useAuthContext();

  const handleDeleteSchedule = useCallback(async (scheduleId) => {
    try {
      setIsLoading(true);
      await deleteBooking(scheduleId);
      toast.success("Reserva removida com sucesso");
      setBookings((prev) => prev.filter((schedule) => schedule._id !== scheduleId));
    } catch (error) {
      toast.error(error?.response?.data.message ?? "ocorreu um erro ao remover a reserva");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      setIsLoading(true);
      const get = async () => {
        const bookings = await getMyBookings(user.username, user.studioId);
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
      toast.error(error?.response?.data.message ?? "Ocorreu um erro ao buscar sua reservas");
    } finally {
      setIsLoading(false);
    }
  }, [user.username]);

  return (
    <div>
      <NavBar />
      <Container>
        {/* {showMsg && <Alert variant="success">{msg}</Alert>} */}
        <h2>Minhas reservas</h2>
        <p>Reservas a partir do dia atual</p>
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
        {bookings.map((booking) => {
          return <MyReservationList key={booking._id} bookings={booking} handleDeleteSchedule={handleDeleteSchedule} />;
        })}
      </Container>
      {isLoading && <BackdropLoading />}
    </div>
  );
};

export default Myreservations;
