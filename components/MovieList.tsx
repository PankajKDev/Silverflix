//install lodash
import { FC } from "react";
import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";
interface MovieListProps {
  data: Record<string, any>[];
  title: string;
}

const MovieList: FC<MovieListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    //so i dont render an empty div
    return null;
  }
  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl mb-3 font-semibold">
          {title}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {data.map((movie) => {
            return <MovieCard key={movie.id} data={movie} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
