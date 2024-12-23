import { useState, useEffect } from "react";
import api from "../utils/api";

/**
 * Custom hook to fetch accommodation data with pagination.
 * @param {number} page - The page number for pagination.
 * @param {number} pageSize - The number of items per page.
 * @returns {object} { accommodations, loading, error, hasMore }
 */
const useAccommodation = (page = 1, pageSize = 10) => {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true); // 더 많은 데이터가 있는지 확인

  useEffect(() => {
    const fetchAccommodations = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = {
          pageNo: page, // 페이지 번호
          numOfRows: pageSize, // 페이지 당 데이터 수
          contentTypeId: 32, // 숙박 시설의 contentTypeId
        };

        const data = await api.get("/KorService/areaBasedList", { params });

        if (data?.length < pageSize) {
          setHasMore(false); // 데이터가 pageSize보다 적으면 마지막 페이지로 간주
        }

        setAccommodations((prev) => [...prev, ...data]); // 기존 데이터에 추가
      } catch (err) {
        console.error("Error fetching accommodations:", err);
        setError(err?.message || "Failed to fetch accommodations.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodations();
  }, [page, pageSize]);

  return { accommodations, loading, error, hasMore };
};

export default useAccommodation;