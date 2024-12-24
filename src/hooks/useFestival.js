import { useState, useEffect } from "react";
import api from "../utils/api";

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
          contentTypeId: 15,
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