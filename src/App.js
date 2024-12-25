import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import DetailPage from "./pages/DetailPage/DetailPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="detail/:contentid" element={<DetailPage />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
