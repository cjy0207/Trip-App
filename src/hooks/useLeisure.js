import { useState, useEffect } from "react";
import api from "../utils/api";

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
          contentTypeId: 28,
        };

        const data = await api.get("/KorService/areaBasedList", { params });

        if (data?.length < pageSize) {
          setHasMore(false);
        }

        setLeisure((prev) => [...prev, ...data]);
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