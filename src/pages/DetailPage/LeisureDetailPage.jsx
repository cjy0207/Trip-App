// src/pages/DetailPage/LeisureDetailPage.jsx

import useLeisureDetailData from '../../hooks/useLeisureDetailData'; // 훅을 default export 방식으로 가져오기
import './DetailPage.style.css';

const LeisureDetailPage = () => {
  const { detailData, loading, error } = useLeisureDetailData('leisure'); // 'leisure' 타입 데이터 가져오기
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!detailData) {
    return <div>No leisure details available.</div>;
  }

  return (
    <div className="detail-page">
      <div className="detail-images">
        {detailData.firstimage ? (
          <img src={detailData.firstimage} alt={detailData.title} />
        ) : (
          <p>No images available</p>
        )}
      </div>

      <div className="detail-info">
        <h1>{detailData.title}</h1>
        <p>{detailData.addr1}</p>
        <p>{detailData.addr2}</p>
        <p>{detailData.zipcode}</p>
        <p>{detailData.tel}</p>
        <p>{detailData.overview || "No overview available."}</p>
        <button>예약하기</button>
      </div>
    </div>
  );
};

export default LeisureDetailPage;
