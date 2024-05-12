import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth"; //to authenticate routes
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    await serverAuth(req, res); //checks if user is authenticated
    const moviesCount = await prismadb.movie.count(); //checks number of movies
    const randomIndex = Math.floor(Math.random() * moviesCount); //obvious duh
    const randomMovies = await prismadb.movie.findMany({
      //retrives a single with help of findMany and take:1
      take: 1,
      skip: randomIndex,
    });
    return res.status(200).json(randomMovies[0]);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
