import { useState, useEffect } from "react";
import api from "../utils/api";

/**
 * Custom hook to fetch festival data with pagination.
 * @param {number} page - The page number for pagination.
 * @param {number} pageSize - The number of items per page.
 * @returns {object} { festivals, loading, error, hasMore }
 */
const useFestival = (page = 1, pageSize = 10) => {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchFestivals = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = {
          pageNo: page,
          numOfRows: pageSize,
          contentTypeId: 15, // 축제 정보의 contentTypeId
        };

        const data = await api.get("/KorService/areaBasedList", { params });

        if (data?.length < pageSize) {
          setHasMore(false);
        }

        setFestivals((prev) => [...prev, ...data]);
      } catch (err) {
        setError(err?.message || "Failed to fetch festival data.");
      } finally {
        setLoading(false);
      }
    };

    fetchFestivals();
  }, [page, pageSize]);

  return { festivals, loading, error, hasMore };
};

export default useFestival;