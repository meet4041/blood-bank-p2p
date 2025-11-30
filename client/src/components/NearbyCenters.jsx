import React, { useState, useEffect, useContext } from "react";
import { RadiusContext } from "../context/RadiusContext";

const NearbyCenters = () => {
  const { radius, setRadius } = useContext(RadiusContext);
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const CACHE_TTL_MS = 1000 * 60 * 60;

    const cacheKey = (lat, lon, r) => `donation_centers_${Math.round(lat * 100)}_${Math.round(lon * 100)}_${r}`;

    const fetchCenters = async (lat, lon, radiusMeters) => {
      const key = cacheKey(lat, lon, radiusMeters);
      const cachedRaw = localStorage.getItem(key);
      if (cachedRaw) {
        try {
          const parsed = JSON.parse(cachedRaw);
          if (parsed?.timestamp && parsed?.data && Date.now() - parsed.timestamp < CACHE_TTL_MS) {
            setCenters(parsed.data);
            setLoading(false);
            return;
          } else localStorage.removeItem(key);
        } catch {}
      }

      try {
        const query = `
[out:json][timeout:25];
(
  node["amenity"="blood_donation"](around:${radiusMeters},${lat},${lon});
  node["amenity"="hospital"](around:${radiusMeters},${lat},${lon});
  node["healthcare"="blood_donation"](around:${radiusMeters},${lat},${lon});
);
out center 20;`;

        const res = await fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: query,
        });
        if (!res.ok) throw new Error("Overpass API request failed");
        const data = await res.json();
        if (cancelled) return;

        const elements = (data.elements || []).slice(0, 20).map((el) => ({
          id: el.id,
          name: el.tags?.name || el.tags?.operator || "Unnamed",
          lat: el.lat ?? el.center?.lat,
          lon: el.lon ?? el.center?.lon,
          tags: el.tags || {},
        }));

        setCenters(elements);
        localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data: elements }));
        setLoading(false);
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to fetch donation centers");
          setLoading(false);
        }
      }
    };

    if (!navigator.geolocation) {
      setError("Geolocation not available.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchCenters(pos.coords.latitude, pos.coords.longitude, Math.round(radius * 1000));
      },
      () => {
        fetch("https://ipapi.co/json/")
          .then((r) => r.json())
          .then((data) => fetchCenters(data.latitude, data.longitude, Math.round(radius * 1000)))
          .catch(() => setError("Location access denied"));
      },
      { timeout: 10000 }
    );

    return () => { cancelled = true; };
  }, [radius]);

  const getOpenStreetMapLink = (center) =>
    `https://www.openstreetmap.org/?mlat=${center.lat}&mlon=${center.lon}#map=18/${center.lat}/${center.lon}`;

  return (
    <aside className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 my-6 mx-auto max-w-xl rounded shadow-md" aria-label="Nearby donation centers">
      <div className="flex items-center justify-between">
        <p className="font-bold text-lg">Nearby Donation Centers</p>
        <div className="flex items-center gap-2">
          <label className="text-sm">Radius:</label>
          <select
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="border rounded px-2 py-1 bg-white"
          >
            <option value={2}>2 km</option>
            <option value={5}>5 km</option>
            <option value={10}>10 km</option>
          </select>
        </div>
      </div>

      {loading && <p className="text-gray-600 mt-3">Loading nearby centers...</p>}
      {error && <p className="text-red-600 mt-3">{error}</p>}
      {!loading && !error && centers.length === 0 && <p className="text-gray-600 mt-3">No centers found.</p>}
      {!loading && !error && centers.length > 0 && (
        <ul className="mt-3 space-y-3">
          {centers.map((c) => (
            <li key={c.id} className="bg-white p-3 rounded shadow-sm flex justify-between items-start">
              <div>
                <div className="font-semibold">{c.name}</div>
                <div className="text-xs text-gray-500">{c.tags?.addr_city || c.tags?.addr_state || ""}</div>
              </div>
              <div className="text-sm">
                <a href={getOpenStreetMapLink(c)} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                  Open on map
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default NearbyCenters;
