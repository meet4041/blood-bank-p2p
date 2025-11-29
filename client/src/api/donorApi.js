import { BASE_URL, getAuthHeaders, handleResponse } from './apiClient';

export const getDonors = async () => {
    const res = await fetch(`${BASE_URL}/donors`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    });
    return handleResponse(res);
};

export const getDonorById = async (id) => {
    const res = await fetch(`${BASE_URL}/donors/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    });
    return handleResponse(res);
};

export const createDonor = async (data) => {
    const res = await fetch(`${BASE_URL}/donors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(data),
    });
    return handleResponse(res);
};

export const updateDonor = async (id, data) => {
    const res = await fetch(`${BASE_URL}/donors/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(data),
    });
    return handleResponse(res);
};

export const deleteDonor = async (id) => {
    const res = await fetch(`${BASE_URL}/donors/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    });
    return handleResponse(res);
};
