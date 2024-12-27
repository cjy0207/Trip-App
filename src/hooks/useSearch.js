import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

/**
 * 검색 API 호출 함수
 * @param {object} params - 검색 요청 파라미터
 * @returns {Promise<Array>} - 검색 결과 데이터
 */
const fetchSearchResults = async ({ keyword, page, pageSize, contentTypeId }) => {
  if (!keyword) throw new Error("검색어가 필요합니다.");

  const params = {
    keyword,
    pageNo: page,
    numOfRows: pageSize,
    contentTypeId,
  };

  try {
    const response = await api.get("/searchKeyword", { params });
    return response;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw new Error("Failed to fetch search results");
  }
};

/**
 * 숙박 및 레저 정보 검색 훅
 * @param {string} keyword - 검색어
 * @param {number} page - 현재 페이지 번호
 * @param {number} pageSize - 페이지당 데이터 수
 * @param {number[]} contentTypeIds - 검색할 콘텐츠 타입 ID 배열
 */
export const useSearchQuery = (keyword, page = 1, pageSize = 10, contentTypeIds = []) => {
  return useQuery({
    queryKey: ["search", keyword, page, pageSize, contentTypeIds],
    queryFn: () =>
      Promise.all(
        contentTypeIds.map((contentTypeId) =>
          fetchSearchResults({ keyword, page, pageSize, contentTypeId })
        )
      ).then((results) => results.flat()), // 여러 contentTypeId 결과를 병합
    enabled: !!keyword, // 검색어가 있을 때만 실행
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    onError: (error) => {
      console.error("Error in useSearchQuery:", error.message);
    },
  });
};