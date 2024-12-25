import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

if (!API_KEY) {
  console.error("API 키가 설정되지 않았습니다. .env 파일을 확인하세요.");
}

const api = axios.create({
  baseURL: "https://api.visitkorea.or.kr/openapi/service/rest",
  params: {
    serviceKey: decodeURIComponent(API_KEY || ""),
    MobileOS: "ETC",
    MobileApp: "TourAPIApp",
    _type: "json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === "development") {
      console.log("요청 시작:", config);
    }
    return config;
  },
  (error) => {
    console.error("요청 오류:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === "development") {
      console.log("응답 성공:", response);
    }
    return response?.data?.response?.body?.items?.item || [];
  },
  (error) => {
    console.error("응답 오류:", error.response || error);
    return Promise.reject(error);
  }
);

export default api;