import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

/**
 * 여행 코스 데이터를 가져오는 API 함수
 * @param {object} params - API 요청 파라미터
 * @returns {Promise<Array>} - 여행 코스 데이터 배열
 */
export const fetchTourCourses = async ({ page = 1, pageSize = 10 }) => {
  const params = {
    pageNo: page,
    numOfRows: pageSize,
    contentTypeId: 25, // 여행 코스 contentTypeId
  };

  try {
    const response = await api.get("/areaBasedList", { params });
    return response; // Axios 인터셉터에서 데이터만 반환
  } catch (error) {
    console.error("Error fetching tour courses:", error);
    throw new Error("Failed to fetch tour courses");
  }
};

/**
 * 여행 코스 데이터를 React Query로 가져오는 훅
 * @param {number} page - 현재 페이지 번호
 * @param {number} pageSize - 페이지당 데이터 수
 */
export const useTourCourseQuery = (page = 1, pageSize = 10) => {
  return useQuery({
    queryKey: ["tourCourses", page, pageSize],
    queryFn: () => fetchTourCourses({ page, pageSize }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    onError: (error) => {
      console.error("Error loading tour courses:", error);
    },
  });
};