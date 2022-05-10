import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000"
});

export const createSession = (username, password) => {
  return api.post("/sessions", { username, password })
};
 // ========= users ============== 
export const getUsers = async () => {
  return api.get("/users")
}


// ========== stations/macas ============

export const getStations = async () => {
  return api.get("/stations")
}