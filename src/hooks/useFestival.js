import useSearch from "./useSearch";

const useFestival = (page, pageSize, query) => {
  const { results: festivals = [], loading, error, hasMore } = useSearch("/api/festival", page, pageSize, query);
  return { festivals, loading, error, hasMore };
};

export default useFestival;