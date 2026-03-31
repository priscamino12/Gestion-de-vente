import axios from "axios";

const API = axios.create({
  baseURL: "http://VOTRE_IP:5000",

  //baseURL : 'http://localhost:5000',
});


export const getVentes = () => API.get("/ventes");
export const getStats = () => API.get("/ventes/stats");
export const addVente = (data) => API.post("/ventes", data);
export const updateVente = (id, data) => API.put(`/ventes/${id}`, data);
export const deleteVente = (id) => API.delete(`/ventes/${id}`);