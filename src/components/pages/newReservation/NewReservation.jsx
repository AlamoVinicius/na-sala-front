import { availableStations, createBooking } from "../../../services/api";

export const submit = async (
  e,
  newReservation,
  user,
  stationSelected,
  setShowErrorMsg,
  setFinalShowPickTime,
  navigate
) => {
  e.preventDefault();
  const today = Date.now();
  const dateSelected = new Date(newReservation.startDate).getTime();
  if (dateSelected < today) {
    setShowErrorMsg("não é possivel realizar a reserva, data inválida");
    setFinalShowPickTime(false);
    return;
  }
  const reservation = {
    stationName: stationSelected.name,
    ...newReservation,
    username: user.username,
  };
  try {
    await createBooking(reservation);
    navigate("/myreservations", { state: { message: "Reserva criada com sucesso!" } });
  } catch (err) {
    console.log(err);
    setShowErrorMsg("Ocorreu algum erro ao realizar a reserva");
  }
};

export const startTime = (
  e,
  setNewReservation,
  newReservation,
  setFinalShowPickTime,
  setStationSelected,
  setShowErrorMsg
) => {
  const startDate = new Date(e.target.value);
  setShowErrorMsg(false);
  setStationSelected(false);
  setNewReservation({ ...newReservation, [e.target.name]: startDate });
  startDate !== null ? setFinalShowPickTime(true) : setFinalShowPickTime(false);
};

export const finalTime = (newReservation, e, setNewReservation) => {
  const initialDate = new Date(newReservation.startDate);
  const finalDate = new Date( //  format yyyy/mm/dd hh:mm is ok
    `${initialDate.getFullYear()}/${initialDate.getMonth() + 1}/${initialDate.getDate()} ${e.target.value}`
  );
  setNewReservation({ ...newReservation, [e.target.name]: finalDate });
};

export const verifyAvailable = async (e, newReservation, setStationsAvailable, setShowPickStationAvailable) => {
  e.preventDefault();
  const initialDate = new Date(newReservation.startDate);
  const endDate = new Date(newReservation.finalDate);
  const stations = await availableStations({
    startDate: initialDate,
    finalDate: endDate,
  });
  setStationsAvailable(stations.data);
  setShowPickStationAvailable(true);
};

export const handlePickSelected = (event, station, setStationSelected, setShowPickStationAvailable) => {
  event.preventDefault();
  setStationSelected(station);
  setShowPickStationAvailable(false);
};

export const ShowDateReservation = ({ reservation }) => {
  const initialDate = new Date(reservation.startDate).toLocaleDateString();
  const startHour = new Date(reservation.startDate).getHours().toString().padStart(2, "0");
  const startMinutes = new Date(reservation.startDate).getMinutes().toString().padStart(2, "0");

  const endHours = new Date(reservation.finalDate).getHours().toString().padStart(2, "0");
  const endMinutes = new Date(reservation.finalDate).getMinutes().toString().padStart(2, "0");

  return `${initialDate} das ${startHour}:${startMinutes} ás ${endHours}:${endMinutes}`;
};
