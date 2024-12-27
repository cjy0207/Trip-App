import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTourCourseQuery } from "../../hooks/useTourCourse";
import Banner from "../component/Banner/Banner";
import CardList from "../component/CardList/CardList";

const TourCoursePage = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();

  const { data: tourCourses, isLoading, isError, error } = useTourCourseQuery(page, pageSize);

  const handleSearch = (query) => {
    navigate(`/search?query=${encodeURIComponent(query)}&filter=tourCourse`);
  };

  return (
    <div className="container mt-4">
      <Banner onSearch={handleSearch} filter="tourCourse" />
      <h1>Tour Courses</h1>
      {isLoading && <p>Loading tour courses...</p>}
      {isError && <p>Error: {error.message}</p>}
      {!isLoading && tourCourses?.length === 0 && <p>No tour courses found.</p>}
      <CardList items={tourCourses} itemType="tourCourse" />
    </div>
  );
};

export default TourCoursePage;