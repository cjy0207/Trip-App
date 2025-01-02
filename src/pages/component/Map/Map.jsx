import React, { useEffect } from "react";

const Map = ({ mapx, mapy }) => {
  useEffect(() => {
    if (mapx && mapy) {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
      script.async = true;

      script.onload = () => {
        window.kakao.maps.load(() => {
          const container = document.getElementById("map"); // 지도 컨테이너
          const options = {
            center: new window.kakao.maps.LatLng(mapy, mapx), // 위도, 경도
            level: 3, // 줌 레벨
          };

          const map = new window.kakao.maps.Map(container, options); // 지도 생성

          // 마커 생성
          const markerPosition = new window.kakao.maps.LatLng(mapy, mapx);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map); // 마커를 지도에 추가
        });
      };

      document.head.appendChild(script);
    }
  }, [mapx, mapy]);

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "300px",
        marginTop: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    ></div>
  );
};

export default Map;