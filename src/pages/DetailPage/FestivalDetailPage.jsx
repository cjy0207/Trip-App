import React from "react";
import { useLocation } from "react-router-dom"; // 수정: useLocation 훅을 사용하여 전달된 state 접근
import './DetailPage.style.css';

const DetailPage = () => {
  const location = useLocation(); // 수정: useLocation 훅 사용
  const { festival } = location.state || {}; // 수정: state에서 festival 데이터 가져오기

  if (!festival) {
    return <div>No festival details available.</div>; // 수정: festival 데이터가 없으면 메시지 표시
  }

  return (
    <div className="detail-detail-page">
      <div className="detail-detail-images">
        {festival.firstimage ? (
          <img src={festival.firstimage} alt={festival.title} />
        ) : (
          <p>No images available</p>
        )}
      </div>

      <div className="detail-detail-info">
        <h1>{festival.title}</h1>
        <p>{festival.addr1}</p>
        <p>{festival.addr2}</p>
        <p>{festival.zipcode}</p>
        <p>{festival.tel}</p>
        <p>{festival.overview || "No overview available."}</p>
        <button className="detail-button">예약하기</button>
      </div>
    </div>
  );
};

export default DetailPage;
