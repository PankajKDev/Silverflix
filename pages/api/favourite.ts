import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      //request method is POST
      const { currentUser } = await serverAuth(req, res); //authenticates user with serverAuthh
      const { movieId } = req.body; //retrivies movieID from request body
      const existingMovie = await prismadb.movie.findUnique({
        //check if movie exists in dataBase
        where: {
          id: movieId,
        },
      });
      if (!existingMovie) {
        throw new Error("Invalid ID");
      }
      const user = await prismadb.user.update({
        //if the movie exists it will update the user's favouriteMovieIds by pushing
        //the new movie ID to array using update
        where: {
          email: currentUser.email || "",
        },
        data: {
          favouriteIds: {
            push: movieId,
          },
        },
      });
      return res.status(200).json(user);
    }
    if (req.method === "DELETE") {
      //request method is DELETE
      const { currentUser } = await serverAuth(req, res); //authenticates user
      const { movieId } = req.body; //retrives movideId from req.body
      const existingMovie = await prismadb.movie.findUnique({
        //check if movie exists
        where: { id: movieId },
      });
      if (!existingMovie) {
        throw new Error("Invalid ID");
      }
      const updatedFavouriteIds = without(currentUser.favouriteIds, movieId); //if movie exists
      //then make a new  movie array by removing movieId from currentUser.favouriteIds
      const updatedUser = await prismadb.user.update({
        //updates User with updatedFavouriteIds
        where: { email: currentUser.email || "" },
        data: { favouriteIds: updatedFavouriteIds },
      });
      return res.status(200).json(updatedUser);
    }
    return res.status(405).end(); //if method is not POST or DELTE 405 error and end()
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
