import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDetailInfo from "../../hooks/useDetailInfo";
import useDetailData from "../../hooks/useDetailData";
import "./DetailPage.style.css";

const LeisureDetailPage = () => {
  const { contentid } = useParams(); // URL에서 contentid 가져오기
  const contentTypeId = 28; // 레저의 contentTypeId

  // useDetailData에서 데이터 가져오기
  const { detailData, loading: dataLoading, error: dataError } = useDetailData("leisure");
  console.log("Detail Data:", detailData);

  // useDetailInfo에서 데이터 가져오기
  const { data: leisureInfo = [], isLoading: infoLoading, isError: infoError, error: infoErrorMessage } =
    useDetailInfo(contentid, contentTypeId);
  console.log("Leisure Info:", leisureInfo);

  const [mergedData, setMergedData] = useState(null);

  // 데이터 병합
  useEffect(() => {
    if (detailData && leisureInfo.length > 0) {
      console.log("Using API Data:", leisureInfo[0]);
      setMergedData({ ...leisureInfo[0], ...detailData });
    } else if (detailData) {
      console.log("Using Detail Data:", detailData);
      setMergedData(detailData);
    } else if (leisureInfo.length > 0) {
      console.log("Using Leisure Info only:", leisureInfo[0]);
      setMergedData(leisureInfo[0]);
    } else {
      console.log("No data available from both API and useDetailData.");
    }
  }, [detailData, leisureInfo]);

  console.log("Merged Data:", mergedData);

  if (infoLoading || dataLoading) return <p>Loading...</p>;
  if (infoError || dataError)
    return <p>Error: {infoErrorMessage?.message || dataError?.message || "데이터를 불러오는데 실패했습니다."}</p>;

  if (!mergedData) return <p>레저 데이터가 없습니다.</p>;

  const {
    firstimage = null,
    title = "레저 이름이 없습니다.",
    addr1 = "정보 없음",
    tel = "정보 없음",
    overview = "설명이 없습니다.",
    chkbabycarriageleports = "정보 없음",
    chkcreditcardleports = "정보 없음",
    chkpetleports = "정보 없음",
    openperiod = "정보 없음",
    parkingleports = "정보 없음",
    parkingfeeleports = "정보 없음",
    expagerangeleports = "정보 없음",
    usefeeleports = "정보 없음",
    usetimeleports = "정보 없음",
    restdateleports = "정보 없음",
    infocenterleports = "정보 없음",
    reservation = "정보 없음",
  } = mergedData;

  return (
    <div className="detail-detail-page">
      {/* 이미지 섹션 */}
      <div className="detail-detail-images">
        {firstimage ? (
          <img src={firstimage} alt={title || "레저 이미지"} className="photo-item" />
        ) : (
          <p>이미지가 없습니다.</p>
        )}
      </div>

      {/* 상세 정보 섹션 */}
      <div className="detail-detail-info">
        <h1>{title}</h1>
        <p>주소: {addr1}</p>
        <p>전화번호: {tel}</p>
        <p>설명: {overview}</p>
        <p>유모차 대여 여부: {chkbabycarriageleports}</p>
        <p>신용카드 사용 가능 여부: {chkcreditcardleports}</p>
        <p>반려동물 동반 여부: {chkpetleports}</p>
        <p>운영 기간: {openperiod}</p>
        <p>주차 가능 여부: {parkingleports}</p>
        <p>주차 요금: {parkingfeeleports}</p>
        <p>이용 가능 연령대: {expagerangeleports}</p>
        <p>이용 요금: {usefeeleports}</p>
        <p>운영 시간: {usetimeleports}</p>
        <p>휴무일: {restdateleports}</p>
        <p>문의처: {infocenterleports}</p>
        <p>예약 정보: {reservation}</p>
        <button className="detail-button">예약하기</button>
      </div>
    </div>
  );
};

export default LeisureDetailPage;
