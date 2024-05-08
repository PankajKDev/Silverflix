import useSWR from "swr"; //hook for data fetching and revalidation
import fetcher from "@/lib/fetcher";
const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher); //it takes two arguements the key
  //for identifying data and fetcher function for fetching data
  //data:the fetched data,
  //error:error during fetching
  //isLoading checking if data is fetched or not
  //mutate a function that can be used to trigger revalidation of data
  return { data, error, isLoading, mutate };
};
export default useCurrentUser;
