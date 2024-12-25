import useSearch from "./useSearch";

const useLeisure = (page, pageSize) => {
  // "/api/leisure"를 통해 레저 데이터를 가져옴
  const { results: leisure = [], loading, error, hasMore } = useSearch("/api/leisure", page, pageSize);
  return { leisure, loading, error, hasMore };
};

export default useLeisure;