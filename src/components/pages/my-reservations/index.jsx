import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { getMyBookings } from "../../../services/api";

import NavBar from "../../navbar/Navbar";
import { Container, Alert, Spinner } from "react-bootstrap";
import { MyReservationList } from "./MyReservation";
import styles from "./MyReservation.module.css"

const Myreservations = () => {
  const [showMsg, setShowMsg] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  let msg = null;
  let location = useLocation();
  if (location.state) {
    msg = location.state.message;
  }
  useEffect(() => {
    if (msg) {
      setShowMsg(true);
    }
    
    try {
      const get = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const bookings = await getMyBookings(user.username);
      setBookings(bookings.data);
      setIsLoading(false)
    };
    get();
  
    } catch (error) {
      console.log(error)
      setErrorMsg('ocorreu algum erro ao buscar as informações')
    }
    
    setTimeout(() => {
      setShowMsg(false);
    }, 3000);
  }, [msg]);

  return (
    <div>
      <NavBar />
      <Container>
        {showMsg && <Alert variant="success">{msg}</Alert>}
        <h2>Minhas reservas</h2>
        <p>Reservas a partir do dia atual</p>
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
        {isLoading && (
            <div className={styles.spinner}>
              <Spinner animation="border" />
            </div>
          )}
        {bookings.map(booking => {
          return <MyReservationList key={booking._id} bookings={booking} />;
        })}
      </Container>
    </div>
  );
};

export default Myreservations;
