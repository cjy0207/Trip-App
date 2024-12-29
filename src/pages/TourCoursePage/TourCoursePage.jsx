import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTourCourseQuery } from "../../hooks/useTourCourse";
import Banner from "../component/Banner/Banner";
import CardList from "../component/CardList/CardList";
import Map from "../component/Map/Map";

const TourCoursePage = () => {
  const [page, setPage] = useState(1);
  const [allTourCourses, setAllTourCourses] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const pageSize = 10;
  const navigate = useNavigate();

  const { data: tourCourses, isFetching } = useTourCourseQuery(page, pageSize);

  useEffect(() => {
    if (tourCourses) {
      setAllTourCourses((prev) => [...prev, ...tourCourses]);
    }
  }, [tourCourses]);

  const handleCardButtonClick = (location) => {
    setSelectedLocation(location);
  };

  const handleSearch = (query) => {
    navigate(`/search?query=${encodeURIComponent(query)}&filter=tourCourse`);
  };

  return (
    <div className="container mt-4">
      <Banner onSearch={handleSearch} filter="tourCourse" />
      <h1>Tour Courses</h1>

      <div className="row">
        <div className="col-md-4 mb-4 mt-3">
          <div style={{ position: "sticky", top: "80px" }}>
            {selectedLocation ? (
              <Map
                latitude={selectedLocation.lat}
                longitude={selectedLocation.lng}
                address={selectedLocation.address}
              />
            ) : (
              <p>지도를 보려면 "지도 보기" 버튼을 클릭하세요.</p>
            )}
          </div>
        </div>

        <div className="col-md-8">
          <CardList items={allTourCourses} onButtonClick={handleCardButtonClick} />
          {isFetching && <p>Loading more...</p>}
        </div>
      </div>
    </div>
  );
};

export default TourCoursePage;