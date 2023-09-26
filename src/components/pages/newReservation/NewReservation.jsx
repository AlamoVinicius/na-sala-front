import dayjs from "dayjs";
import { availableStations, createBooking } from "../../../services/api";
import { toast } from "react-toastify";

export const submit = async (
  e,
  newReservation,
  user,
  stationSelected,
  setShowErrorMsg,
  setFinalShowPickTime,
  navigate,
  setLoadingConfirmReservation
) => {
  e.preventDefault();
  setLoadingConfirmReservation(true);
  const today = Date.now();
  const dateSelected = new Date(newReservation.startDate).getTime();
  if (dateSelected < today) {
    setShowErrorMsg("não é possivel realizar a reserva, data inválida");
    setFinalShowPickTime(false);
    return;
  }
  const reservation = {
    stationName: stationSelected.name,
    stationId: stationSelected._id,
    userId: user.id,
    ...newReservation,
  };
  try {
    await createBooking(reservation, user.studioId);
    toast.success("Reserva criada com sucesso!");
    navigate("/myreservations");
  } catch (err) {
    console.log(err);
    toast.error("Ocorreu algum erro ao realizar a reserva");
  } finally {
    setLoadingConfirmReservation(false);
  }
};

/**
 * Verify the availability of stations for a new reservation.
 *
 * @param {Event} e - The event object.
 * @param {Object} newReservation - The new reservation object.
 * @param {function} setStationsAvailable - The function to set the available stations.
 * @param {function} setShowPickStationAvailable - The function to set the flag for showing the available stations.
 * @param {function} setStationSelected - The function to set the flag for selecting a station.
 * @param {function} setLoading - The function to set the loading state.
 */
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
  let finalDatewithDayjs = dayjs(finalDate, "YYYY/MM/DD HH:mm").toISOString();

  if (finalDate < initialDate) {
    finalDatewithDayjs = dayjs(finalDate).add(1, "day").toISOString();
  }

  setNewReservation({ ...newReservation, [e.target.name]: finalDatewithDayjs });
};

export const verifyAvailable = async (
  e,
  newReservation,
  setStationsAvailable,
  setShowPickStationAvailable,
  setStationSelected,
  setLoading
) => {
  e.preventDefault();

  try {
    setLoading(true);
    const initialDate = new Date(newReservation.startDate);
    const endDate = new Date(newReservation.finalDate);
    const stations = await availableStations({
      startDate: initialDate,
      finalDate: endDate,
    });
    setStationsAvailable(stations.data);
    setShowPickStationAvailable(true);
    setStationSelected(false);
  } catch (error) {
    console.log(error);
    alert("ocorreu um erro ao verificar as estações disponíveis");
  } finally {
    setLoading(false);
  }
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
