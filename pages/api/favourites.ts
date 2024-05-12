//THIS IS A DIFFERENT FILE IT IS FAVOURITES NOT FAVOURITE

import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    //return error if method is not get
    return res.status(405).end();
  }
  try {
    const { currentUser } = await serverAuth(req, res); //authenticate User
    const favouriteMovies = await prismadb.movie.findMany({
      //finds all the favourite Ids in User Model
      where: {
        id: {
          in: currentUser?.favouriteIds,
        },
      },
    });
    return res.status(200).json(favouriteMovies);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
