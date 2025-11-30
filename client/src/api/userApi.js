import { BASE_URL, getAuthHeaders, handleResponse } from './apiClient'; //

export const getAllUsers = async () => {
  const res = await fetch(`${BASE_URL}/users/users`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};

export const getAllHospitals = async () => {
  const res = await fetch(`${BASE_URL}/users/hospitals`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};

export const deleteUser = async (id) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
};