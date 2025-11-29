export const BASE_URL = "http://localhost:8000/api";

export const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const handleResponse = async (res) => {
    if (res.status === 204) return null;

    const contentType = res.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');

    const payload = isJson ? await res.json().catch(() => null) : null;

    if (!res.ok) {
        const msg = payload?.error || payload?.message || JSON.stringify(payload) || res.statusText;
        throw new Error(msg);
    }

    if (payload && typeof payload === 'object' && ('success' in payload)) {
        if (!payload.success) throw new Error(payload.error || 'Request failed');
        return payload.data;
    }

    return payload;
};
