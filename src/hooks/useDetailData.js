import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const useDetailData = (type) => {
  const location = useLocation();
  const { contentid } = useParams();

  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!['accommodation', 'leisure', 'festival', 'tourcourse', 'tour'].includes(type)) {
          throw new Error(`유효하지 않은 타입입니다: ${type}`);
        }

        let data;

        if (location.state?.[type]) {
          // location.state에 데이터가 있는 경우
          console.log("Using data from location.state");
          data = location.state[type];
        } else {
          // location.state가 없을 경우 API 호출
          console.warn("location.state가 비어 있습니다. API 요청을 시도합니다.");
          const response = await fetch(`/api/${type}/${contentid}`);
          if (!response.ok) {
            throw new Error(`${type} 데이터를 불러오는 데 실패했습니다.`);
          }
          data = await response.json();
        }

        if (!data) {
          throw new Error(`${type}에 해당하는 데이터가 없습니다.`);
        }

        setDetailData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setDetailData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state, type, contentid]);

  console.log("useDetailData Hook State:", { detailData, loading, error, contentid, type, locationState: location.state });

  return { detailData, loading, error, contentid };
};


export default useDetailData;
