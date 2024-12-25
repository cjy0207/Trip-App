import useSearch from "./useSearch";

const useTransport = (page, pageSize) => {
  const { data, loading, error, hasMore } = useSearch("/api/transport", page, pageSize);
  return { transport: data, loading, error, hasMore };
};

export default useTransport;