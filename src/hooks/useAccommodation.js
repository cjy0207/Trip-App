import { useState, useEffect } from "react";
import api from "../utils/api";

/**
 * Custom hook to fetch accommodation data.
 * @param {number} areaCode - The area code for the desired location (default: 1).
 * @param {number|null} sigunguCode - The sub-area code for the location (optional).
 * @returns {object} { accommodations, loading, error }
 */
const useAccommodation = (areaCode = 1, sigunguCode = null) => {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccommodations = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = {
          areaCode,
          contentTypeId: 32, // Content type ID for accommodations
        };

        if (sigunguCode) {
          params.sigunguCode = sigunguCode;
        }

        const data = await api.get("/KorService/areaBasedList", { params });
        setAccommodations(data); // 성공적으로 데이터를 상태에 저장
      } catch (err) {
        console.error("Error fetching accommodations:", err);
        setError(err?.message || "Failed to fetch accommodations.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodations();
  }, [areaCode, sigunguCode]); // Dependency array

  return { accommodations, loading, error };
};

export default useAccommodation;