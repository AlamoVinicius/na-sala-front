import axios from "axios";

export const api = axios.create({
  baseURL: "https://nasala-server.herokuapp.com/"
});

export const createSession = async (username, password) => {
  return await api.post("/sessions", { username, password })
};
 // ========= users ============== 
export const getUsers = async () => {
  return await api.get("/users")
}

export const createUser = async (user) => {
  return await api.post("/users", user)
}

export const deleteUser = async (id) => {
  return await api.delete(`/users/${id}`)
}
// ========== stations/macas ============
export const getStation = async (name) => {
  return await api.get(`/stations/${name}`)
}

// ========== booking ===================
export const getMyBookings = async (username) => {
  return await api.get(`/booking/${username}`)
}

export const getBookingsbyDay = async (date) => {
  return await api.get(`/getbookingbyday?date=${date}`)
}

export const availableStations = async (object) => {
  return await api.post("/booking/verify", object) // end pont para verificar as macas que estarão disponiveis
}

export const createBooking = async (object) => {
  return await api.post("/booking", object)
}

export const deleteBooking = async (id) => {
  return await api.delete(`/booking/${id}`)
}