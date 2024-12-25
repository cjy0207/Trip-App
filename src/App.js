import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import { Routes, Route } from "react-router-dom";
import FestivalPage from "./pages/FestivalPage/FestivalPage.jsx";
import TourPage from "./pages/TourPage/TourPage.jsx";
import LeisurePage from "./pages/LeisurePage/LeisurePage.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          {/* <Route path="/search" element={<SearchPage />}>
          </Route> */}
          <Route path="/search" element={<SearchPage />} />
          <Route path="search/leisure" element={<LeisurePage />} />
          <Route path="search/festival" element={<FestivalPage />} />
          <Route path="search/tour" element={<TourPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
