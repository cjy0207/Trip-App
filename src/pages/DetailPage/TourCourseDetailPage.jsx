import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDetailInfo from "../../hooks/useDetailInfo";
import useDetailData from "../../hooks/useDetailData";
import "./DetailPage.style.css";

const TourCourseDetailPage = () => {
  const { contentid } = useParams(); // URL에서 contentid 가져오기
  const contentTypeId = 25; // 투어코스의 contentTypeId

  // useDetailData에서 데이터 가져오기
  const { detailData, loading: dataLoading, error: dataError } = useDetailData("tourcourse");
  console.log("Detail Data from useDetailData:", detailData);

  // useDetailInfo에서 데이터 가져오기
  const {
    data: tourInfo = [],
    isLoading: infoLoading,
    isError: infoError,
    error: infoErrorMessage,
  } = useDetailInfo(contentid, contentTypeId);
  console.log("Tour Info from useDetailInfo:", tourInfo);

  const [mergedData, setMergedData] = useState(null);

  // 데이터 병합
  useEffect(() => {
    if (detailData && tourInfo.length > 0) {
      console.log("Merging API Data and detailData...");
      setMergedData({ ...tourInfo[0], ...detailData });
    } else if (detailData) {
      console.log("Using Detail Data only...");
      setMergedData(detailData);
    } else if (tourInfo.length > 0) {
      console.log("Using Tour Info only...");
      setMergedData(tourInfo[0]);
    } else {
      console.log("No data available from both API and useDetailData.");
    }
  }, [detailData, tourInfo]);

  console.log("Merged Data:", mergedData);

  if (infoLoading || dataLoading) return <p>Loading...</p>;
  if (infoError || dataError)
    return (
      <p>
        Error: {infoErrorMessage?.message || dataError?.message || "데이터를 불러오는 데 실패했습니다."}
      </p>
    );

  if (!mergedData) return <p>투어 코스 데이터가 없습니다.</p>;

  const {
    firstimage = null,
    firstimage2 = null,
    title = "투어코스 이름이 없습니다.",
    overview = "설명이 없습니다.",
    distance = "정보 없음",
    taketime = "정보 없음",
    theme = "정보 없음",
    schedule = "정보 없음",
    infocentertourcourse = "정보 없음",
  } = mergedData;

  return (
    <div className="detail-detail-page">
      {/* 사진 섹션 */}
      <div className="detail-detail-images">
        {firstimage || firstimage2 ? (
          <div className="photo-gallery">
            {firstimage && <img src={firstimage} alt="Tour Course Main Photo" className="photo-item" />}
          </div>
        ) : (
          <p>사진이 없습니다.</p>
        )}
      </div>

      {/* 상세 정보 섹션 */}
      <div className="detail-detail-info">
        <h1>{title}</h1>
        <p>설명: {overview}</p>
        <p>거리: {distance}</p>
        <p>소요 시간: {taketime}</p>
        <p>테마: {theme}</p>
        <p>운영 일정: {schedule}</p>
        <p>문의처: {infocentertourcourse}</p>
        <button className="detail-button">예약하기</button>
      </div>
    </div>
  );
};

export default TourCourseDetailPage;
