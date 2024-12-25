import { useState, useEffect } from "react";
import api from "../utils/api";

/**
 * Custom hook to fetch search results for multiple content types.
 * @param {string} query - The search keyword.
 * @param {number[]} contentTypeIds - Array of content types to search for.
 * @param {number} page - The page number for pagination.
 * @param {number} pageSize - The number of items per page.
 * @returns {object} { results, loading, error, hasMore }
 */
const useSearch = (query = "", contentTypeIds = [], page = 1, pageSize = 10) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      setLoading(true);
      setError(null);

      try {
        const requests = contentTypeIds.map((contentTypeId) => {
          const params = {
            pageNo: page,
            numOfRows: pageSize,
            contentTypeId,
            keyword: query,
          };

          return api.get("/KorService/searchKeyword", { params });
        });

        const responses = await Promise.all(requests);
        const combinedResults = responses.flat();

        // 데이터를 초기화하거나 추가
        if (page === 1) {
          setResults(combinedResults); // 첫 페이지
        } else {
          setResults((prev) => [...prev, ...combinedResults]); // 이후 페이지 추가
        }

        // 더 가져올 데이터가 있는지 확인
        setHasMore(combinedResults.length >= contentTypeIds.length * pageSize);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError(err?.message || "Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, contentTypeIds, page, pageSize]);

  return { results, loading, error, hasMore };
};

export default useSearch;