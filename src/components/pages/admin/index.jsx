import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../../navbar/Navbar";
import { FormButton } from "../../buttons/Buttons";
import styles from "./index.module.css";

import UsersAdmin from "./UsersAdmin";
import BookingAdmin from "./BookingAdmin";
import NewUserForm from "./NewUserForm";

const AdminPage = () => {
  const userNivel = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [showUserList, setShowUserList] = useState(false);
  const [showBookingControll, setShowBookingControll] = useState(false);
  const [showNewUser, setShowNewUser] = useState(false);

  useEffect(() => {
    if (userNivel.nivelUser !== 1) {
      navigate("/");
      return;
    }
  });

  const handleGetUsers = () => {
    setShowUserList(true);
    setShowBookingControll(false);
    setShowNewUser(false)
  };

  const handleGeBooking = () => {
    setShowUserList(false);
    setShowBookingControll(true);
    setShowNewUser(false)
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Row>
          <Col sm={3}>
            <div className={styles.btn_area}>
              <FormButton text="gerenciar usuarios" handleClick={() => handleGetUsers()} />
            </div>
            <div className={styles.btn_area}>
              <FormButton text="reservas" handleClick={() => handleGeBooking()} />
            </div>
          </Col>
          {showUserList && (
            <Col sm={9}>
              <FormButton
                text="Adicionar novo tatuador"
                handleClick={() => {
                  setShowNewUser(true);
                  setShowUserList(false);
                }}
              />
              <UsersAdmin />
            </Col>
          )}
          {showBookingControll && (
            <Col sm={9}>
              <BookingAdmin />
            </Col>
          )}
          {showNewUser && (
            <Col sm={9}>
              <NewUserForm />
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default AdminPage;
