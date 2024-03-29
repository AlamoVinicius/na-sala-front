import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // baseURL: "http://localhost:5000/",
  timeout: 15000,
});

export const createSession = (loginData) => api.post("/sessions", loginData);

// ========= users ==============
export const getUsers = async (companyId) => {
  return await api.get(`/studio/${companyId}/users`);
};

export const getInfoUser = async (id) => api.get(`/users/${id}`);

export const createUser = async (user, studioId) => {
  return await api.post(`/studio/${studioId}/users`, user);
};

export const deleteUser = async (id) => {
  return await api.delete(`/users/${id}`);
};
export const blockUser = async ({ userId, blocked }) => {
  return await api.patch(`/users/${userId}/blocked`, { blocked });
};
// ========== stations/macas ============
export const getStation = async (stationName) => {
  return await api.get(`/stations/${stationName}`);
};

export const getAllStations = async (studioId) => {
  return await api.get(`/studio/${studioId}/stations`);
};

export const createStation = async (station, studioId) => {
  return await api.post(`studio/${studioId}/stations`, station, { headers: { "Content-Type": "multipart/form-data" } });
};

export const deleteStation = async (idStation) => await api.delete(`/stations/${idStation}`);

// ========== booking ===================

export const getAllReservationFromMonth = (params, studioId) =>
  api.get(`studio/${studioId}/booking`, { params: params });

export const getMyBookings = async (username, studioId) => {
  return await api.get(`studio/${studioId}/booking/${username}`);
};

export const getBookingsbyDay = async (date, studioId) => {
  return await api.get(`studio/${studioId}/getbookingbyday?date=${date}`);
};

export const availableStations = async (object, studioId) => {
  return await api.post(`studio/${studioId}/booking/verify`, object); // end pont para verificar as macas que estarão disponiveis
};

export const createBooking = async (object, studioId) => {
  return await api.post(`/studio/${studioId}/booking`, object);
};

export const deleteBooking = async (id) => {
  return await api.delete(`/booking/${id}`);
};
