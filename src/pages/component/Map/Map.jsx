import React, { useEffect } from "react";

const Map = ({ latitude = 37.5665, longitude = 126.9780, width = "100%", height = "300px" }) => {
  useEffect(() => {
    const initializeMap = (lat, lng) => {
      // 기존에 스크립트가 추가되어 있다면 중복 추가를 방지
      if (!document.querySelector(`script[src*="kakao.com/v2/maps/sdk.js"]`)) {
        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`;
        script.async = true;

        script.onload = () => {
          window.kakao.maps.load(() => {
            const container = document.getElementById("map");
            const options = {
              center: new window.kakao.maps.LatLng(lat, lng), // 중심 좌표
              level: 3, // 확대 레벨
            };
            const map = new window.kakao.maps.Map(container, options);

            // 현재 위치에 마커 추가
            const markerPosition = new window.kakao.maps.LatLng(lat, lng);
            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
            });
            marker.setMap(map);
          });
        };

        document.head.appendChild(script);
      } else {
        // 이미 로드된 스크립트가 있는 경우, 바로 지도 초기화
        window.kakao.maps.load(() => {
          const container = document.getElementById("map");
          const options = {
            center: new window.kakao.maps.LatLng(lat, lng), // 중심 좌표
            level: 3, // 확대 레벨
          };
          const map = new window.kakao.maps.Map(container, options);

          // 현재 위치에 마커 추가
          const markerPosition = new window.kakao.maps.LatLng(lat, lng);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);
        });
      }
    };

    initializeMap(latitude, longitude);
  }, [latitude, longitude]);

  return (
    <div
      id="map"
      style={{
        width: width,
        height: height,
        marginBottom: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    ></div>
  );
};

export default Map;