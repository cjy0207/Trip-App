import { useState, useEffect } from "react";
import api from "../utils/api";

const useTransport = (page = 1, pageSize = 10) => {
  const [transport, setTransport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchTransport = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = {
          pageNo: page,
          numOfRows: pageSize,
          contentTypeId: 12, 
        };

        const data = await api.get("/KorService/areaBasedList", { params });

        if (data?.length < pageSize) {
          setHasMore(false);
        }

        setTransport((prev) => [...prev, ...data]);
      } catch (err) {
        setError(err?.message || "Failed to fetch transport data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransport();
  }, [page, pageSize]);

  return { transport, loading, error, hasMore };
};

export default useTransport;