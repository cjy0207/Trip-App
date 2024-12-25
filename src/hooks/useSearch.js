import { useState, useEffect } from "react";
import api from "../utils/api";

/**
 * Custom hook to fetch search results.
 * @param {string} query - The search keyword.
 * @param {number} page - The page number for pagination.
 * @param {number} pageSize - The number of items per page.
 * @returns {object} { results, loading, error, hasMore }
 */
const useSearch = (query = "", page = 1, pageSize = 10) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = {
          pageNo: page,
          numOfRows: pageSize,
          contentTypeId: 32, // 숙박 시설의 contentTypeId
          keyword: query, // 검색어
        };

        const data = await api.get("/KorService/searchKeyword", { params });

        if (data?.length < pageSize) {
          setHasMore(false);
        }

        if (page === 1) {
          setResults(data); // 첫 페이지는 데이터 초기화
        } else {
          setResults((prev) => [...prev, ...data]); // 이후 페이지는 데이터 추가
        }
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError(err?.message || "Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query, page, pageSize]);

  return { results, loading, error, hasMore };
};

export default useSearch;