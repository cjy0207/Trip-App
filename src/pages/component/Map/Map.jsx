import React, { useEffect } from "react";

const Map = ({ latitude, longitude, address, width = "100%", height = "400px" }) => {
  useEffect(() => {
    const loadKakaoMaps = () => {
      if (!document.querySelector(`script[src*="kakao.com/v2/maps/sdk.js"]`)) {
        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
        script.async = true;

        script.onload = () => {
          window.kakao.maps.load(() => {
            if (latitude && longitude) {
              initializeMap(latitude, longitude);
            } else if (address) {
              geocodeAddress(address);
            }
          });
        };

        document.head.appendChild(script);
      } else if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          if (latitude && longitude) {
            initializeMap(latitude, longitude);
          } else if (address) {
            geocodeAddress(address);
          }
        });
      }
    };

    const geocodeAddress = (addr) => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(addr, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const { y, x } = result[0];
          initializeMap(parseFloat(y), parseFloat(x));
        } else {
          console.error("주소 변환 실패:", status);
        }
      });
    };

    const initializeMap = (lat, lng) => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);

      const markerPosition = new window.kakao.maps.LatLng(lat, lng);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
    };

    loadKakaoMaps();
  }, [latitude, longitude, address]);

  return (
    <div
      id="map"
      style={{
        width:"100%",
        height:"300px",
        marginBottom: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    ></div>
  );
};

export default Map;