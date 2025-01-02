import React from "react";
import { useParams } from "react-router-dom";
import useDetailInfo from "../../hooks/useDetailInfo";

const FestivalDetailPage = () => {
  const { contentid } = useParams(); // URL에서 contentid 가져오기
  const contentTypeId = 15; // 축제의 contentTypeId
  const { data, isLoading, isError, error } = useDetailInfo(contentid, contentTypeId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  // 데이터가 배열 형태로 들어올 경우 첫 번째 요소 선택
  const detailData = data[0];

  return (
    <div>
      <h1>{detailData.eventplace || "정보가 없습니다."}</h1>
      <p>행사 장소: {detailData.eventplace || "정보가 없습니다."}</p>
      <p>행사 기간: {`${detailData.eventstartdate || "정보 없음"} ~ ${detailData.eventenddate || "정보 없음"}`}</p>
      <p>운영 시간: {detailData.playtime || "정보가 없습니다."}</p>
      <p>이용 요금: {detailData.usetimefestival || "정보가 없습니다."}</p>
      <p>주최자: {detailData.sponsor1 || "정보가 없습니다."}</p>
      <p>주최자 연락처: {detailData.sponsor1tel || "정보가 없습니다."}</p>
      <p>홈페이지: {detailData.eventhomepage || "정보가 없습니다."}</p>
    </div>
  );
};

export default FestivalDetailPage;