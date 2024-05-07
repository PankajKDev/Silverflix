import Input from "@/components/Input";
import { useCallback, useState } from "react";
import axios from "axios";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const toggleVariant = useCallback(() => {
    setVariant((currentvariant) =>
      currentvariant === "login" ? "register" : "login"
    );
  }, []);
  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        //sending post request at /api/register with {email,name,password}
        email,
        name,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password]); //putting email,name and password in dependecy array
  return (
    <div
      className="
  relative h-full w-full bg-[url(/Images/Hero.png)] bg-no-repeat bg-center bg-cover"
    >
      <div className="bg-black  w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/Images/Logo.png" className="h-12" alt="" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-90 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {" "}
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  type="text"
                  label="Username"
                  id="name"
                  onChange={(e: any) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
              )}

              <Input
                label="Email"
                id="email"
                type="email"
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
              <Input
                label="Password"
                id="password"
                type="password"
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </div>
            <button
              onClick={register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition-none"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Silverflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create Account" : "Sign in"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Auth;
