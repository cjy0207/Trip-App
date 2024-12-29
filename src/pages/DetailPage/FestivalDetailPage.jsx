import useDetailData from '../../hooks/useDetailData'; // default export로 가져오기
import './DetailPage.style.css';

const DetailPage = () => {
  const { detailData, loading, error } = useDetailData('festival'); // 'hotel' 타입으로 데이터 가져오기
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!detailData) {
    return <div>No hotel details available.</div>;
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

export default DetailPage;


