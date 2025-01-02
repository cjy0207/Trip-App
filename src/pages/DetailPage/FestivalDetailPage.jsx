import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDetailInfo from "../../hooks/useDetailInfo";
import useDetailData from "../../hooks/useDetailData";
import "./DetailPage.style.css";

const FestivalDetailPage = () => {
  const { contentid } = useParams(); // URL에서 contentid 가져오기
  const contentTypeId = 15; // 축제의 contentTypeId

  // useDetailData에서 데이터 가져오기
  const { detailData, loading: dataLoading, error: dataError } = useDetailData("festival");
  console.log("Initial Data from useDetailData:", detailData);

  // useDetailInfo에서 데이터 가져오기
  const { data: festivalInfo = [], isLoading: infoLoading, isError: infoError, error: infoErrorMessage } =
    useDetailInfo(contentid, contentTypeId);
  console.log("API Data from useDetailInfo:", festivalInfo);

  const [mergedData, setMergedData] = useState(null);

  // 데이터 병합
  useEffect(() => {
    if (detailData && festivalInfo.length > 0) {
      console.log("Using API Data:", festivalInfo[0]);
      setMergedData({ ...festivalInfo[0], ...detailData });
    } else if (detailData) {
      console.log("Using Initial Data from useDetailData:", detailData);
      setMergedData(detailData);
    } else if (festivalInfo.length > 0) {
      console.log("Using API Data only:", festivalInfo[0]);
      setMergedData(festivalInfo[0]);
    } else {
      console.log("No data available from both API and useDetailData.");
    }
  }, [detailData, festivalInfo]);

  console.log("Merged Data:", mergedData);

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
    eventplace = "행사 장소 정보 없음",
    eventstartdate = "시작 날짜 정보 없음",
    eventenddate = "종료 날짜 정보 없음",
    playtime = "운영 시간 정보 없음",
    usetimefestival = "이용 요금 정보 없음",
    sponsor1 = "주최자 정보 없음",
    sponsor1tel = "주최자 연락처 정보 없음",
    eventhomepage = null,
    title = "제목 없음",
  } = mergedData;

  const eventHomepageLink = eventhomepage ? (
    <a href={eventhomepage} target="_blank" rel="noopener noreferrer">
      {eventhomepage}
    </a>
  ) : (
    "정보가 없습니다."
  );

  return (
    <div className="detail-detail-page">
      {/* 사진 섹션 */}
      <div className="detail-detail-images">
        {firstimage || firstimage2 ? (
          <div className="photo-gallery">
            {firstimage && <img src={firstimage} alt="Festival Main Photo" className="photo-item" />}
          </div>
        ) : (
          <p>사진이 없습니다.</p>
        )}
      </div>

      <div className="detail-detail-info">
        <h1>{title}</h1>
        <p>행사 장소: {eventplace}</p>
        <p>행사 주소: {addr1}</p>
        {addr2 && <p>상세 주소: {addr2}</p>}
        <p>
          행사 기간: {eventstartdate} ~ {eventenddate}
        </p>
        <p>운영 시간: {playtime}</p>
        <p>이용 요금: {usetimefestival}</p>
        <p>주최자: {sponsor1}</p>
        <p>주최자 연락처: {sponsor1tel}</p>
        <p>홈페이지: {eventHomepageLink}</p>
        <p>전화번호: {tel}</p>
        <button className="detail-button">예약하기</button>
      </div>
    </div>
  );
};

export default FestivalDetailPage;
