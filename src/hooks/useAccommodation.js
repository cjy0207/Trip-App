import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

/**
 * 숙박 정보를 가져오는 API 함수
 * @param {object} params - API 요청 파라미터
 * @returns {Promise<Array>} - 숙박 데이터 배열
 */
export const fetchAccommodation = async ({ page = 1, pageSize = 10 }) => {
  const params = {
    pageNo: page,
    numOfRows: pageSize,
    contentTypeId: 32, // 숙박 정보 contentTypeId
  };

  try {
    const response = await api.get("/areaBasedList", { params });
    return response;
  } catch (error) {
    console.error("Error fetching accommodations:", error);
    throw new Error("Failed to fetch accommodations");
  }
};

/**
 * 숙박 정보를 React Query로 가져오는 훅
 * @param {number} page - 현재 페이지 번호
 * @param {number} pageSize - 페이지당 데이터 수
 */
export const useAccommodationQuery = (page = 1, pageSize = 10) => {
  return useQuery({
    queryKey: ["accommodations", page, pageSize],
    queryFn: () => fetchAccommodation({ page, pageSize }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    onError: (error) => {
      console.error("Error loading accommodations:", error);
    },
  });
};