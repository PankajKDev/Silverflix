//THIS IS A DIFFERENT FILE IT IS FAVOURITES NOT FAVOURITE
//AND WILL BE USED WITH GET METHOD
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
}
