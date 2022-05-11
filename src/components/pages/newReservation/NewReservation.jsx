import { getStations } from "../../../services/api";

export const submit = async (
	e,
	setNewReservation,
	setStations,
	newReservation,
	user
) => {
	e.preventDefault();
	//const stations = await getStations();
    const stations = 
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
	let finalDate = new Date(newReservation.StartDate).toUTCString();
	finalDate = new Date(finalDate);
	const day = finalDate
		.getDate()
		.toString()
		.padStart(2, "0");
	const month = (finalDate.getMonth() + 1).toString().padStart(2, "0");
	const year = finalDate
		.getFullYear()
		.toString()
		.padStart(2, "0");
	finalDate = new Date(`${year}-${month}-${day}T${e.target.value}`);
	setNewReservation({ ...newReservation, [e.target.name]: finalDate });
};
