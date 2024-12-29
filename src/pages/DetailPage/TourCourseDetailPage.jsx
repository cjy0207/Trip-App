import useDetailData from '../../hooks/useDetailData'; 
import './DetailPage.style.css';

const DetailPage = () => {
  const { detailData, loading, error } = useDetailData('tourCourse'); // 수정: 'tourCourse'로 데이터 요청 
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!detailData) {
    return <div>No tour course details available.</div>; // 수정: 'No hotel details available.'에서 'No tour course details available.'로 수정
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
        <p>{detailData.addr1}</p>
        <p>{detailData.addr2}</p>
        <p>{detailData.zipcode}</p>
        <p>{detailData.tel}</p>
        <p>{detailData.overview || "No overview available."}</p>
        <button className="detail-button">예약하기</button>
      </div>
    </div>
  );
};

export default DetailPage;
