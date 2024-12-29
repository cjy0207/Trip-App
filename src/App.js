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
import DetailPage from "./pages/DetailPage/DetailPage.jsx";
import LeisureDetailPage from "./pages/DetailPage/LeisureDetailPage.jsx"; 
import FestivalDetailPage from "./pages/DetailPage/FestivalDetailPage.jsx"; 
import TourCourseDetailPage from "./pages/DetailPage/TourCourseDetailPage.jsx"; 

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="detail/:contentid" element={<DetailPage />} /> 
          <Route path="/search" element={<SearchPage />} />
          <Route path="search/accommodation" element={<AccommodationPage />} />
          <Route path="search/accommodation/detail/:contentid" element={<DetailPage />} />
          <Route path="search/leisure" element={<LeisurePage />} />
          <Route path="search/leisure/detail/:contentid" element={<LeisureDetailPage />} /> {/* 레저 디테일 페이지 */}
          <Route path="search/festival" element={<FestivalPage />} />
          <Route path="search/festival/detail/:contentid" element={<FestivalDetailPage />} /> {/* 축제 디테일 페이지 */}
          <Route path="search/tour" element={<TourCoursePage />} />
          <Route path="search/tour/detail/:contentid" element={<TourCourseDetailPage />} /> {/* 투어 코스 디테일 페이지 */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
