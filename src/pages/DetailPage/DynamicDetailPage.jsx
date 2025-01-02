import React from "react";
import { useParams } from "react-router-dom";
import AccommodationDetailPage from "./DetailPage";
import LeisureDetailPage from "./LeisureDetailPage";
import FestivalDetailPage from "./FestivalDetailPage";
import TourCourseDetailPage from "./TourCourseDetailPage";

const DynamicDetailPage = () => {
  const { category, contentid } = useParams(); // URL에서 category와 contentid를 가져옴

  console.log("DynamicDetailPage Params:", { category, contentid });

  switch (category) {
    case "accommodation":
      return <AccommodationDetailPage contentid={contentid} />;
    case "leisure":
      return <LeisureDetailPage contentid={contentid} />;
    case "festival":
      return <FestivalDetailPage contentid={contentid} />;
    case "tour": // 모든 tourcourse도 'tour'로 통합
      return <TourCourseDetailPage contentid={contentid} />;
    case "tourcourse": // 투어코스는 별도로 구분
      return <TourCourseDetailPage contentid={contentid} />;
    default:
      return <p>잘못된 경로입니다.</p>;
  }
};

export default DynamicDetailPage;
