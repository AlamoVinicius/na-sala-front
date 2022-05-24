import React, { useState } from "react";

import { getStation, deleteBooking } from "../../../services/api";

import { ListGroup, Card } from "react-bootstrap";
import { FormButton } from "../../buttons/Buttons";
import styles from "./MyReservation.module.css";
import ModalCustom from "../../modal/ModalCustom";

export const MyReservationList = ({ bookings }) => {
  const [showList, setShowList] = useState(true);
  const [stationSelected, setStationSelected] = useState();
  const [showModal, setShowModal] = useState(false);

  const date = new Date(bookings.startDate).toLocaleDateString();
  const hour = new Date(bookings.startDate)
    .getHours()
    .toString()
    .padStart(2, "0");
  const minutes = new Date(bookings.startDate)
    .getMinutes()
    .toString()
    .padStart(2, "0");

  const hourFinal = new Date(bookings.finalDate)
    .getHours()
    .toString()
    .padStart(2, "0");
  const minutesFinal = new Date(bookings.finalDate)
    .getMinutes()
    .toString()
    .padStart(2, "0");

  const handleClick = async (e, stationName) => {
    e.preventDefault();
    try {
      const station = await getStation(stationName);
      setStationSelected(station.data[0]);
      setShowList(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmClick = async bookings => {
    try {
      await deleteBooking(bookings._id);
      console.log("reserva deletado com sucesso");
      document.location.reload();
    } catch (error) {
      console.log(error);
    }
    setShowModal(false);
  };

  return (
    <>
      {showList ? (
        <ListGroup className={styles.area_booking}>
          <ListGroup.Item>
            <span>
              <strong>{bookings.stationName}: </strong>
              {date} das {hour}:{minutes} às {hourFinal}:{minutesFinal}
            </span>
            <FormButton text="deletar" handleClick={() => setShowModal(true)} />
            <FormButton text="ver maca" handleClick={e => handleClick(e, bookings.stationName)} />
          </ListGroup.Item>
        </ListGroup>
      ) : (
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={stationSelected.image} />
          <Card.Body>
            <Card.Title>{stationSelected.name}</Card.Title>
            <div className={styles.button}>
              <FormButton text="fechar" handleClick={() => setShowList(true)} />
            </div>
          </Card.Body>
        </Card>
      )}
      <ModalCustom
        showModal={showModal}
        setShowModal={setShowModal}
        title="Tem certeza que deseja exluir a reserva?"
        handleConfirmClick={() => handleConfirmClick(bookings)}
      />
    </>
  );
};
