import { useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

/**
 * 다양한 디테일 페이지 데이터를 관리하는 커스텀 훅
 * @param {string} type - 'hotel', 'leisure', 'festival', 'tour' 중 하나를 전달
 * @returns {Object} detailData - 요청된 데이터 (호텔, 레저, 축제, 투어)
 * @returns {boolean} loading - 로딩 상태
 * @returns {string|null} error - 오류 메시지 (있을 경우)
 */
const useDetail = (type) => {
  const location = useLocation();
  const { contentid } = useParams();

  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // location.state에 있는 데이터 확인 및 처리
    if (location.state?.[type]) {
      setDetailData(location.state[type]); // 전달된 타입에 맞는 데이터 사용
      setLoading(false);
    } else {
      setError(`${type} 데이터가 없습니다`);
      setLoading(false);
    }
  }, [location.state, type]);

  return { detailData, loading, error, contentid };
};

export default useDetail;
