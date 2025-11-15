import axios from "axios";

export const createRequest = (data) =>
  axios.post("/api/requests", data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

export const getOutgoingRequests = () =>
  axios.get("/api/requests/outgoing", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

export const getIncomingRequests = () =>
  axios.get("/api/requests/incoming", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

export const updateRequestStatus = (id, status) =>
  axios.put(`/api/requests/${id}`, status, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
