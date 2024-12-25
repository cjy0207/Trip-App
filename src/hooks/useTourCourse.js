import { useState, useEffect } from "react";
import api from "../utils/api";

/**
 * Custom hook to fetch tour course data with pagination.
 * @param {number} page - The page number for pagination.
 * @param {number} pageSize - The number of items per page.
 * @returns {object} { tourCourses, loading, error, hasMore }
 */
const useTourCourse = (page = 1, pageSize = 10) => {
  const [tourCourses, setTourCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchTourCourses = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = {
          pageNo: page,
          numOfRows: pageSize,
          contentTypeId: 25, // 여행코스의 contentTypeId
        };

        const data = await api.get("/KorService/areaBasedList", { params });

        if (data?.length < pageSize) {
          setHasMore(false);
        }

        setTourCourses((prev) => [...prev, ...data]);
      } catch (err) {
        setError(err?.message || "Failed to fetch tour courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchTourCourses();
  }, [page, pageSize]);

  return { tourCourses, loading, error, hasMore };
};

export default useTourCourse;