//this is a dynamic route
//when a user visits site with /watch/123123 or any random id after watch
//Next js will match it with this file
//the movieId will be passed as query

import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    await serverAuth(req, res);
    const { movieId } = req.query;
    if (typeof movieId !== "string") {
      throw new Error("Invalid ID");
    }
    if (!movieId) {
      throw new Error("Invalid ID");
    }
    const movie = await prismadb.movie.findUnique({
      //finds a unique movie from database and assigns it to movie
      where: {
        id: movieId,
      },
    });
    if (!movie) {
      throw new Error("Invalid Id");
    }
    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
