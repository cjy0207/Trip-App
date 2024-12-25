import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import { Routes, Route } from "react-router-dom";
import AccommodationSearchPage from "./pages/SearchPage/component/AccommodationSearchPage/AccommodationSearchPage.jsx";
import LeisureSearchPage from "./pages/SearchPage/component/LeisureSearchPage/LeisureSearchPage.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          {/* <Route path="/search" element={<SearchPage />}>
          </Route> */}
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/search/accommodation"
            element={<AccommodationSearchPage />}
          />
          <Route path="/search/leisure" element={<LeisureSearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
