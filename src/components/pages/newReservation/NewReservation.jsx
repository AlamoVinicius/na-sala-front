import { getStations } from "../../../services/api";

export const submit = async (
  e,
  setNewReservation,
  setStations,
  newReservation,
  user
) => {
  e.preventDefault();
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
  const initialDate = new Date(newReservation.StartDate); 
  const finalDate = new Date(      //  format yyyy/mm/dd hh:mm is ok
    `${initialDate.getFullYear()}/${initialDate.getMonth() +
      1}/${initialDate.getDate()} ${e.target.value}`
  );
  setNewReservation({ ...newReservation, [e.target.name]: finalDate });
};
