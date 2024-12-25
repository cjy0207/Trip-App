import { useState, useEffect } from "react";
import api from "../utils/api";

/**
 * Custom hook to fetch leisure data with pagination.
 * @param {number} page - The page number for pagination.
 * @param {number} pageSize - The number of items per page.
 * @returns {object} { leisure, loading, error, hasMore }
 */
const useLeisure = (page = 1, pageSize = 10) => {
  const [leisure, setLeisure] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchLeisure = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = {
          pageNo: page,
          numOfRows: pageSize,
          contentTypeId: 28, // 레저 정보의 contentTypeId
        };

        const data = await api.get("/KorService/areaBasedList", { params });

        if (data?.length < pageSize) {
          setHasMore(false); // 더 이상 데이터가 없으면 false
        }

        setLeisure((prev) => [...prev, ...data]); // 기존 데이터에 추가
      } catch (err) {
        setError(err?.message || "Failed to fetch leisure data.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeisure();
  }, [page, pageSize]);

  return { leisure, loading, error, hasMore };
};

export default useLeisure;