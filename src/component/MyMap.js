import { Map, MapMarker } from "react-kakao-maps-sdk";

const MyMap = () => {
  return (
    <Map
      center={{ lat: 37.5665, lng: 126.978 }}
      style={{ width: "100%", height: "400px" }}
      level={7}
      appkey={process.env.REACT_APP_KAKAO_MAP_API_KEY} // 환경 변수로 전달
    >
      <MapMarker position={{ lat: 37.5665, lng: 126.978 }}>
        <div>서울</div>
      </MapMarker>
    </Map>
  );
};

export default MyMap;