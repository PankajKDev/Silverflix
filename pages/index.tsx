import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next"; //this object will be passed to the function
import { getSession } from "next-auth/react";

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
  const { data: user } = useCurrentUser(); //getting data frok hook useCurrentUser
  return (
    <>
      <Navbar />
    </>
  );
}
