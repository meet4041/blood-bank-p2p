import axios from "axios";

export const searchDonors = (query) =>
  axios.get(`/api/users/donors?${query}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

export const updateAvailability = (status) =>
  axios.put("/api/users/availability", status, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

export const getUnverifiedHospitals = () =>
  axios.get("/api/users/unverified-hospitals", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

export const verifyHospital = (id) =>
  axios.put(`/api/users/verify-hospital/${id}`, {}, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
