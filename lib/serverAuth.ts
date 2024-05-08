import prismadb from "@/lib/prismadb";
import { NextApiRequest } from "next"; //typescript type that represents incoming request object
import { getSession } from "next-auth/react"; //to retrieve current user session
const serverAuth = async (req: NextApiRequest) => {
  //takes NextAPIRequest object as an arguement which
  //represents the incoming request from API route
  const session = await getSession({ req }); //retrieves current session
  if (!session?.user?.email) {
    //if there is no email assosciated throws error
    throw "not signed in";
  }
  const currentUser = await prismadb.user.findUnique({
    //finds the user based on current session
    where: {
      email: session.user.email,
    },
  });
  if (!currentUser) {
    throw new Error("not signed in");
  }
  return { currentUser }; //returns object containing currentUser
};
export default serverAuth;
