import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

import AppLayout from "./layout/AppLayout";

import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import AccommodationPage from "./pages/AccommodationPage/AccommodationPage";
import LeisurePage from "./pages/LeisurePage/LeisurePage";
import FestivalPage from "./pages/FestivalPage/FestivalPage";
import TourCoursePage from "./pages/TourCoursePage/TourCoursePage";

import DetailPage from "./pages/DetailPage/DetailPage";
import LeisureDetailPage from "./pages/DetailPage/LeisureDetailPage";
import FestivalDetailPage from "./pages/DetailPage/FestivalDetailPage";
import TourCourseDetailPage from "./pages/DetailPage/TourCourseDetailPage";
import DynamicDetailPage from "./pages/DetailPage/DynamicDetailPage.jsx"; 
import Footer from "./pages/component/Footer/Footer.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />

          <Route path="search/accommodation" element={<AccommodationPage />} />
          <Route path="search/accommodation/detail/:contentid" element={<DetailPage />} />

          <Route path="search/leisure" element={<LeisurePage />} />
          <Route path="search/leisure/detail/:contentid" element={<LeisureDetailPage />} />

          <Route path="search/festival" element={<FestivalPage />} />
          <Route path="search/festival/detail/:contentid" element={<FestivalDetailPage />} />

          <Route path="search/tour" element={<TourCoursePage />} />
          <Route path="search/tour/detail/:contentid" element={<TourCourseDetailPage />} />

          <Route path="detail/:contentid" element={<DetailPage />} />
          <Route path="search/default/detail/:contentid" element={<DetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="detail/:contentid" element={<DetailPage />} />

          {/* 동적 디테일 페이지 */}
          <Route path="search/:category/detail/:contentid" element={<DynamicDetailPage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;