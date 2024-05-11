//super important useSWR accept three parameters the key,fetcher and options I will use
// useSWR("/api/random",fetcher,{options by swr}) and fetcher is a promise function which returns data
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
const useMovieList = () => {
  const { data, error, isLoading } = useSWR("/api/movies", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return { data, error, isLoading };
};

export default useMovieList;
