import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

/**
 * 상세 정보 API 호출 함수
 * @param {string} contentid - 콘텐츠 고유 ID
 * @param {number} contentTypeId - 콘텐츠 유형 ID
 * @returns {Promise<Object>} - 상세 정보 데이터
 */
const fetchDetailInfo = async (contentid, contentTypeId) => {
  if (!contentid || !contentTypeId) throw new Error("contentid와 contentTypeId가 필요합니다.");

  try {
    const response = await api.get("/detailIntro", {
      params: {
        contentId: contentid,   // 콘텐츠 ID
        contentTypeId: contentTypeId, // 콘텐츠 유형 ID
        MobileOS: "ETC",       // 모바일 OS
        MobileApp: "TourAPIApp", // 모바일 앱 이름
        _type: "json",         // JSON 형식으로 요청
      },
    });
    console.log("상세 정보 응답 데이터:", response);
    return response;
  } catch (error) {
    console.error("상세 정보 가져오기 실패:", error);
    throw new Error("상세 정보를 가져오는 데 실패했습니다.");
  }
};

/**
 * 상세 정보 훅
 * @param {string} contentid - 콘텐츠 고유 ID
 * @param {number} contentTypeId - 콘텐츠 유형 ID
 */
const useDetailInfo = (contentid, contentTypeId) => {
  return useQuery({
    queryKey: ["detailInfo", contentid, contentTypeId],
    queryFn: () => fetchDetailInfo(contentid, contentTypeId),
    enabled: !!contentid && !!contentTypeId,
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선 유지
    cacheTime: 1000 * 60 * 10, // 10분 동안 캐시 데이터 유지
    onError: (error) => {
      console.error("통합 상세 정보 훅 에러 발생:", error.message);
    },
  });
};

export default useDetailInfo;