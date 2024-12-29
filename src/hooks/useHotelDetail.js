import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

/**
 * 숙박 디테일 정보를 가져오는 React Query 훅
 * @param {string} id - 숙박 ID
 * @returns {object} - React Query 결과 객체
 */
export const useHotelDetailQuery = (id) => {
  const fetchAccommodationDetail = async () => {
    try {
      const response = await api.get(`/detail/${id}`); // API 엔드포인트에 맞게 수정
      return response.data; // API 응답 데이터 반환
    } catch (error) {
      console.error("Error fetching accommodation detail:", error);
      throw new Error("Failed to fetch accommodation detail");
    }
  };

  return useQuery({
    queryKey: ["accommodationDetail", id],
    queryFn: fetchAccommodationDetail, // 내부에서 API 호출
    enabled: !!id, // ID가 있을 때만 실행
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선 상태 유지
    cacheTime: 1000 * 60 * 10, // 10분 동안 캐시 유지
    onError: (error) => {
      console.error("Error loading accommodation detail:", error);
    },
  });
};