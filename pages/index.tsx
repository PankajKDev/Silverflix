import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useFavourites from "@/hooks/useFavourites";
import useMovieList from "@/hooks/useMovieList";
import { NextPageContext } from "next"; //this object will be passed to the function
import { getSession } from "next-auth/react";
import InfoModal from "@/components/InfoModal";
import userInfoModal from "@/hooks/useInfoModal";
import Head from "next/head";
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
  const { data: favourites = [] } = useFavourites();
  const { isOpen, closeModal } = userInfoModal();
  return (
    <>
      <Head>
        <title>Silverflix&#xb7;Home</title>
        <meta name="google-site-verification" content="SUROMljiAxs03qhjkCdpiYyyA-YU9VYxKDJj9cazuLo" />
        <meta name="description" content="Silverflix Homepage" />
        <link rel="icon" href="/Images/Favicon.jpeg" />
      </Head>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending now" data={movies} />
        <MovieList title="My List" data={favourites} />
      </div>
    </>
  );
}
