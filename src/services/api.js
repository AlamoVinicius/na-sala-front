import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // baseURL: "http://localhost:5000/",
  // baseURL: "https://na-sala-server-d6vi3acbc-alamovinicius.vercel.app/",
  timeout: 15000,
});

export const createSession = (username, password) => api.post("/sessions", { username, password });

// ========= users ==============
export const getUsers = async () => {
  return await api.get("/users");
};

export const getInfoUser = async (id) => api.get(`/users/${id}`);

export const createUser = async (user) => {
  return await api.post("/users", user);
};

export const deleteUser = async (id) => {
  return await api.delete(`/users/${id}`);
};
export const blockUser = async ({ userId, blocked }) => {
  return await api.patch(`/users/${userId}/blocked`, { blocked });
};
// ========== stations/macas ============
export const getStation = async (name) => {
  return await api.get(`/stations/${name}`);
};

// ========== booking ===================

export const getAllReservationFromMonth = (params) => api.get("/booking", { params: params });

export const getMyBookings = async (username) => {
  return await api.get(`/booking/${username}`);
};

export const getBookingsbyDay = async (date) => {
  return await api.get(`/getbookingbyday?date=${date}`);
};

export const availableStations = async (object) => {
  return await api.post("/booking/verify", object); // end pont para verificar as macas que estarão disponiveis
};

export const createBooking = async (object) => {
  return await api.post("/booking", object);
};

export const deleteBooking = async (id) => {
  return await api.delete(`/booking/${id}`);
};
