import { BASE_URL, getAuthHeaders, handleResponse } from './apiClient';

export const getRequests = async () => {
    const res = await fetch(`${BASE_URL}/requests`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    });
    return handleResponse(res);
};

export const getRequestById = async (id) => {
    const res = await fetch(`${BASE_URL}/requests/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    });
    return handleResponse(res);
};

export const createRequest = async (data) => {
    const res = await fetch(`${BASE_URL}/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(data),
    });
    return handleResponse(res);
};

export const updateRequest = async (id, data) => {
    const res = await fetch(`${BASE_URL}/requests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(data),
    });
    return handleResponse(res);
};

export const updateStatus = async (id, data) => {
    const res = await fetch(`${BASE_URL}/requests/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(data),
    });
    return handleResponse(res);
};

export const deleteRequest = async (id) => {
    const res = await fetch(`${BASE_URL}/requests/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    });
    return handleResponse(res);
};
