import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useMovieList from "@/hooks/useMovieList";
import { NextPageContext } from "next"; //this object will be passed to the function
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context); //checks for session with getSession
  if (!session) {
    //if no session redirect to /auth
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    //if there is a session return empty props
    props: {},
  };
}
export default function Home() {
  const { data: movies = [] } = useMovieList();
  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending now" data={movies} />
      </div>
    </>
  );
}
