import { getStations, availableStations } from "../../../services/api";

export const submit = async (
  e,
  setNewReservation,
  setStations,
  newReservation,
  user
) => {
  e.preventDefault();
  // const availableStations = await getAvailableStations()
  const stations = await getStations();
  setStations(stations.data);
  setNewReservation({
    ...newReservation,
    id_user: user.id,
    usuario: user.username
  });
};

export const startTime = (
  e,
  setNewReservation,
  newReservation,
  setFinalShowPickTime
) => {
  const startDate = new Date(e.target.value);
  setNewReservation({ ...newReservation, [e.target.name]: startDate });
  startDate !== null ? setFinalShowPickTime(true) : setFinalShowPickTime(false);
};

export const finalTime = (newReservation, e, setNewReservation) => {
  const initialDate = new Date(newReservation.startDate);
  const finalDate = new Date( //  format yyyy/mm/dd hh:mm is ok
    `${initialDate.getFullYear()}/${initialDate.getMonth() +
      1}/${initialDate.getDate()} ${e.target.value}`
  );
  setNewReservation({ ...newReservation, [e.target.name]: finalDate });
};

export const verifyAvailable = async (
  e,
  newReservation,
  setStationsAvailable,
  setShowPickStationAvailable
) => {
  e.preventDefault();
  const initialDate = new Date(newReservation.startDate);
  const endDate = new Date(newReservation.finalDate);
  const stations = await availableStations({
    startDate: initialDate,
    finalDate: endDate
  });
  setStationsAvailable(stations.data);
  setShowPickStationAvailable(true);
};

export const handlePickSelected = (
  event,
  station,
  setStationSelected,
  setShowPickStationAvailable
) => {
  event.preventDefault();
  setStationSelected(station);
  setShowPickStationAvailable(false);
  console.log(station);
};
