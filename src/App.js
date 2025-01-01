import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import { Routes, Route } from "react-router-dom";
import FestivalPage from "./pages/FestivalPage/FestivalPage.jsx";
import TourCoursePage from "./pages/TourCoursePage/TourCoursePage.jsx";
import LeisurePage from "./pages/LeisurePage/LeisurePage.jsx";
import AccommodationPage from "./pages/AccommodationPage/AccommodationPage.jsx";
import DynamicDetailPage from "./pages/DetailPage/DynamicDetailPage.jsx"; 
import Footer from "./pages/component/Footer/Footer.jsx";
import DetailPage from "./pages/DetailPage/DetailPage.jsx"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="detail/:contentid" element={<DetailPage />} />

          {/* 카테고리별 리스트 페이지 */}
          <Route path="search/accommodation" element={<AccommodationPage />} />
          <Route path="search/leisure" element={<LeisurePage />} />
          <Route path="search/festival" element={<FestivalPage />} />
          <Route path="search/tour" element={<TourCoursePage />} />

          {/* 동적 디테일 페이지 */}
          <Route path="search/:category/detail/:contentid" element={<DynamicDetailPage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
