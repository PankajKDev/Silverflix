import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next"; //these represent request and response in next js
import prismadb from "@/lib/prismadb";

export default async function handler( //defining a handler which will take two arguement req and res
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    //if req.method isnt POST return error
    return res.status(405).end();
  }
  try {
    const { email, name, password } = req.body; //if method is POST extract email,name,password from request body
    const existingUser = await prismadb.user.findUnique({
      //if user already exists return an error message
      where: {
        email,
      },
    });
    if (existingUser) {
      return res.status(422).json({ error: "Email already taken" });
    }
    const hashedPassword = await bcrypt.hash(password, 12); //hashing the password with salt value of 12
    const user = await prismadb.user.create({
      //creates a new user in database with email,name,hashedPassword and other stuff
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });
    return res.status(200).json(user); //return user with OK status code 200
  } catch (error) {
    console.log(error);
    return res.status(400).end(); //any error occurs log error to console with status 400
  }
}
