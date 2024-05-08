import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next"; //this object will be passed to the function
import { getSession, signOut } from "next-auth/react";

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
      <h1 className="text-4xl text-white">lmao</h1>
      <p>Logged in as :{user?.name}</p>
      <button
        className="h-10 w-full bg-white hover:bg-black hover:text-white transition"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </>
  );
}
