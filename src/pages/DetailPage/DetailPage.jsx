import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const DetailPage = () => {
  const location = useLocation(); 
  console.log(location);  

  const [hotelDetail, setHotelDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state?.hotel) {
      setHotelDetail(location.state.hotel);
      setLoading(false);  
    } else {
      setError("No hotel data available");
      setLoading(false);  
    }
  }, [location.state]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!hotelDetail) {
    return <div>No hotel details available.</div>;
  }

  return (
    <div className="detail-page">
      <div className="detail-images">
        {hotelDetail.firstimage ? (
          <img src={hotelDetail.firstimage} alt={hotelDetail.title} />
        ) : (
          <p>No images available</p>
        )}
      </div>

      <div className="detail-info">
        <h1>{hotelDetail.title}</h1>
        <p>{hotelDetail.addr1}</p>
        <p>{hotelDetail.addr2}</p>
        <p>{hotelDetail.zipcode}</p>
        <p>{hotelDetail.tel}</p>
        <p>{hotelDetail.overview || "No overview available."}</p>
        <button>예약하기</button>
      </div>
    </div>
  );
};

export default DetailPage;
