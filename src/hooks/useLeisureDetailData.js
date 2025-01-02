// src/hooks/useLeisureDetailData.js

import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const useLeisureDetailData = (type) => {
  const location = useLocation();
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(location.state); // location.state 확인
    if (location.state?.leisureSpot) {
      setDetailData(location.state.leisureSpot);
      setLoading(false);
    } else {
      setError(`${type} 데이터가 없습니다`);
      setLoading(false);
    }
  }, [location.state, type]);

  return { detailData, loading, error };
};

export default useLeisureDetailData; // default export
