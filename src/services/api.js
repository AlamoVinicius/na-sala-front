import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000"
});

export const createSession = async (username, password) => {
  return await api.post("/sessions", { username, password })
};
 // ========= users ============== 
export const getUsers = async () => {
  return await api.get("/users")
}


// ========== stations/macas ============

export const getStations = async () => {
  return await api.get("/stations")
}