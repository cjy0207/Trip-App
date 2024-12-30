import useDetailData from '../../hooks/useDetailData'; 
import './DetailPage.style.css';

const DetailPage = () => {
  const { detailData, loading, error } = useDetailData('tourCourse'); // 'tourCourse'로 데이터 요청 
  console.log('detailData:', detailData);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!detailData) {
    return <div>No tour course details available.</div>; // 데이터가 없을 경우
  }

  return (
    <div className="detail-detail-page">
      <div className="detail-detail-images">
        {detailData.firstimage ? (
          <img src={detailData.firstimage} alt={detailData.title} />
        ) : (
          <p>No images available</p>
        )}
      </div>

      <div className="detail-detail-info">
        <h1>{detailData.title}</h1>
        {/* 주소, 전화번호, 기타 정보들이 없으면 표시하지 않도록 */}
        <p>{detailData.overview || "No overview available."}</p> {/* 개요만 표시 */}
        <button className="detail-button">예약하기</button>
      </div>
    </div>
  );
};

export default DetailPage;
