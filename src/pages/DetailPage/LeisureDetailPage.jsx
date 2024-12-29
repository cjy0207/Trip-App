import React from "react";
import { useLocation } from "react-router-dom"; // 수정: useLocation 훅을 사용하여 전달된 state 접근
import './DetailPage.style.css';

const DetailPage = () => {
  const location = useLocation(); // 수정: useLocation 훅 사용
  const { leisure } = location.state || {}; // 수정: state에서 leisure 데이터 가져오기

  if (!leisure) {
    return <div>No leisure details available.</div>;
  }

  return (
    <div className="detail-detail-page">
      <div className="detail-detail-images">
        {leisure.firstimage ? (
          <img src={leisure.firstimage} alt={leisure.title} />
        ) : (
          <p>No images available</p>
        )}
      </div>

      <div className="detail-detail-info">
        <h1>{leisure.title}</h1>
        <p>{leisure.addr1}</p>
        <p>{leisure.addr2}</p>
        <p>{leisure.zipcode}</p>
        <p>{leisure.tel}</p>
        <p>{leisure.overview || "No overview available."}</p>
        <button className="detail-button">예약하기</button>
      </div>
    </div>
  );
};

export default DetailPage;
