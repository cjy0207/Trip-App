import React, { useState } from "react";
import useAccommodation from "../../hooks/useAccommodation"; // 적절한 경로로 수정

const HomePage = () => {
  // 지역 코드와 세부 지역 코드를 관리하는 상태
  const [areaCode, setAreaCode] = useState(1); // 기본값: 1 (서울)
  const [sigunguCode, setSigunguCode] = useState(null); // 세부 지역 코드

  // useAccommodation 훅으로 데이터 가져오기
  const { accommodations, loading, error } = useAccommodation(areaCode, sigunguCode);

  // 지역 코드 변경 핸들러
  const handleAreaChange = (e) => {
    setAreaCode(Number(e.target.value));
    setSigunguCode(null); // 세부 지역 코드는 초기화
  };

  // 세부 지역 코드 변경 핸들러
  const handleSigunguChange = (e) => {
    setSigunguCode(Number(e.target.value));
  };

  return (
    <div className="container mt-4">
      <h1>Accommodation Finder</h1>
      <p>Explore accommodations in different regions of Korea!</p>

      {/* 지역 선택 */}
      <div className="mb-3">
        <label htmlFor="areaCode" className="form-label">
          Select Area:
        </label>
        <select
          id="areaCode"
          className="form-select"
          value={areaCode}
          onChange={handleAreaChange}
        >
          <option value={1}>Seoul</option>
          <option value={2}>Incheon</option>
          <option value={3}>Daejeon</option>
          <option value={4}>Daegu</option>
          <option value={5}>Busan</option>
          {/* 필요한 지역 코드를 추가 */}
        </select>
      </div>

      {/* 세부 지역 선택 */}
      {areaCode && (
        <div className="mb-3">
          <label htmlFor="sigunguCode" className="form-label">
            Select Sub-Area (optional):
          </label>
          <select
            id="sigunguCode"
            className="form-select"
            value={sigunguCode || ""}
            onChange={handleSigunguChange}
          >
            <option value="">-- Select Sub-Area --</option>
            <option value={1}>Gangnam</option>
            <option value={2}>Jongno</option>
            <option value={3}>Mapo</option>
            {/* 필요한 세부 지역 코드를 추가 */}
          </select>
        </div>
      )}

      {/* 로딩 상태 표시 */}
      {loading && <p>Loading accommodations...</p>}

      {/* 에러 메시지 표시 */}
      {error && <p className="text-danger">Error: {error}</p>}

      {/* 숙박 데이터 출력 */}
      <div className="row">
        {accommodations?.length > 0 ? (
          accommodations.map((item) => (
            <div key={item.contentid} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.addr1}</p>
                  <p className="card-text">
                    {item.tel ? `Contact: ${item.tel}` : "No contact available"}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && <p>No accommodations found for the selected area.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;