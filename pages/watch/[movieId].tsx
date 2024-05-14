import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/router";
const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query; //retrieves movieID from query
  const { data } = useMovie(movieId as string); //fetches movieData using useMovie hook with movieId as parameter
  return (
    <div className="h-screen w-screen bg-black">
      <nav
        className="fixed w-full p-4 z-10 flex 
      flex-row items-center gap-8 bg-black bg-opacity-70"
      >
        <AiOutlineArrowLeft
          onClick={() => router.push("/")}
          className="text-white "
          size={40}
        />
        <p className="text-white">
          <span className="font-light">Now Watching:</span>
          {data?.title}
        </p>
      </nav>
      <div>
        <video
          className="h-full w-full"
          autoPlay
          controls
          src={data?.videoUrl}
        ></video>
      </div>
    </div>
  );
};
export default Watch;
