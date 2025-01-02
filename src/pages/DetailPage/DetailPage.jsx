import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDetailInfo from "../../hooks/useDetailInfo";
import useDetailData from "../../hooks/useDetailData";
import Map from "../component/Map/Map";
import ReservationModal from "./compnent/ReservationModal";
import "./DetailPage.style.css";

const AccommodationDetailPage = () => {
  const { contentid } = useParams();
  const contentTypeId = 32;

  // 데이터 가져오기
  const { detailData, loading: dataLoading, error: dataError } = useDetailData("accommodation");
  const { data: accommodationInfo = [], isLoading: infoLoading, isError: infoError, error: infoErrorMessage } =
    useDetailInfo(contentid, contentTypeId);

  // 상태 관리
  const [mergedData, setMergedData] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // 데이터 병합
  useEffect(() => {
    if (detailData && accommodationInfo.length > 0) {
      setMergedData({ ...accommodationInfo[0], ...detailData });
    } else if (detailData) {
      setMergedData(detailData);
    } else if (accommodationInfo.length > 0) {
      setMergedData(accommodationInfo[0]);
    }
  }, [detailData, accommodationInfo]);

  if (infoLoading || dataLoading) return <p>Loading...</p>;
  if (infoError || dataError)
    return <p>Error: {infoErrorMessage?.message || dataError?.message || "데이터를 불러오는데 실패했습니다."}</p>;

  if (!mergedData) return <p>데이터가 없습니다.</p>;

  const {
    addr1 = "주소 정보 없음",
    addr2 = "",
    tel = "전화번호 정보 없음",
    firstimage = null,
    firstimage2 = null,
    title = "제목 없음",
    checkintime = "체크인 시간 정보 없음",
    checkouttime = "체크아웃 시간 정보 없음",
    roomcount = "객실 수 정보 없음",
    roomtype = "객실 유형 정보 없음",
    subfacility = "부대시설 정보 없음",
    parkinglodging = "주차 가능 여부 정보 없음",
    pickup = "픽업 서비스 정보 없음",
    refundregulation = "환불 규정 정보 없음",
    reservationlodging = "예약 연락처 정보 없음",
    reservationurl = null,
    overview = "설명 없음",
    mapx, // 경도
    mapy, // 위도
  } = mergedData;

  return (
    <div className="detail-detail-page">
      {/* 사진 섹션 */}
      <div className="detail-detail-images">
        {firstimage || firstimage2 ? (
          <div className="photo-gallery">
            {firstimage && <img src={firstimage} alt="Accommodation Main Photo" className="photo-item" />}
          </div>
        ) : (
          <p>사진이 없습니다.</p>
        )}
      </div>

      {/* 상세 정보 섹션 */}
      <div className="detail-detail-info">
        <h1>{title}</h1>
        <p>주소: {addr1}</p>
        {addr2 && <p>상세 주소: {addr2}</p>}
        <p>전화번호: {tel}</p>
        <p>체크인 시간: {checkintime}</p>
        <p>체크아웃 시간: {checkouttime}</p>
        <p>객실 수: {roomcount}</p>
        <p>객실 유형: {roomtype}</p>
        <p>부대시설: {subfacility}</p>
        <p>주차 가능 여부: {parkinglodging}</p>
        <p>픽업 서비스: {pickup}</p>
        <p>환불 규정: {refundregulation}</p>
        <p>예약 연락처: {reservationlodging}</p>
        <p>
          홈페이지:{" "}
          {reservationurl ? (
            <a href={reservationurl} target="_blank" rel="noopener noreferrer">
              바로가기
            </a>
          ) : (
            "정보가 없습니다."
          )}
        </p>
        <p>설명: {overview}</p>

        {/* 버튼 섹션 */}
        <div className="button-container">
          <button className="detail-button" onClick={() => setShowModal(true)}>
            예약하기
          </button>
          <button
            className="detail-button"
            style={{ marginLeft: "10px" }}
            onClick={() => setShowMap((prev) => !prev)} // 지도 보기/닫기 버튼
          >
            {showMap ? "지도 닫기" : "지도 보기"}
          </button>
        </div>

        {/* 지도 섹션 */}
        {showMap && mapx && mapy && <Map mapx={parseFloat(mapx)} mapy={parseFloat(mapy)} />}
      </div>

      {/* 예약 모달 */}
      <ReservationModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default AccommodationDetailPage;