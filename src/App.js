import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import TransportSearchPage from "./pages/SearchPage/components/TransportSearchPage/TransportSearchPage";
import LeisureSearchPage from "./pages/SearchPage/components/LeisureSearchPage/LeisureSearchPage";
import FestivalSearchPage from "./pages/SearchPage/components/FestivalSearchPage/FestivalSearchPage";
import { Routes, Route } from "react-router-dom";
import AccommodationSearchPage from "./pages/SearchPage/components/AccommodationSearchPage/AccommodationSearchPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />}>
            <Route index element={<AccommodationSearchPage />} />
            <Route path="transport" element={<TransportSearchPage />} />
            <Route path="leisure" element={<LeisureSearchPage />} />
            <Route path="festival" element={<FestivalSearchPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
