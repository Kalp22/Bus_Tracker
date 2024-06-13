"use client";

import Image from "next/image";
import { HTMLInputTypeAttribute, MouseEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInSignUp() {
  const router = useRouter();

  const [toSignUp, settoSignUp] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const toggleSignUp = () => {
    setTransitioning(true);
    setTimeout(() => {
      settoSignUp(!toSignUp);
      setTransitioning(false);
    }, 500);
    setForm({ email: "", password: "" });
    setPasswordFocus(false);
    setEmailFocus(false);
  };

  const handleAction: MouseEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    if (!toSignUp && form.email && form.password) {
      if (form.email === "test@gmail.com" && form.password === "1234") {
        router.push("/live");
      }

      return;
    }
  };

  return (
    <main
      className={`flex ${toSignUp ? "flex-row" : "flex-row-reverse"} ${
        transitioning ? "pointer-events-none" : ""
      } w-screen h-screen`}
    >
      <div
        className={`w-1/2 relative cursor-pointer z-10 ${
          transitioning && toSignUp ? "translate-x-[57dvw]" : ""
        } ${transitioning && !toSignUp ? "-translate-x-[57dvw]" : ""}
        ${transitioning ? `transition-all duration-500 ease-out` : ""}`}
        onClick={toggleSignUp}
      >
        <Image
          alt="City Map"
          width={1000}
          height={1000}
          className={`h-screen object-cover rounded-${
            toSignUp ? "e" : "s"
          }-2xl`}
          src="/image.jpeg"
        />
        <div
          className={`flex absolute inset-0 flex-col justify-center items-center`}
        >
          <h2 className="text-black text-2xl font-semibold">
            {toSignUp ? "Already have an account?" : "No account?"}
          </h2>
          <h1 className="text-black text-4xl font-semibold">
            {toSignUp ? "Log In" : "Create Account"}
          </h1>
        </div>
        <div className="flex absolute inset-0 backdrop-filter backdrop-blur-[4px]  justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-black text-2xl font-semibold">
              {toSignUp ? "Already have an account?" : "No account?"}
            </h2>
            <div className="h-px w-full bg-black"></div>
            <h1 className="text-black text-4xl font-semibold">
              {toSignUp ? "Log In" : "Create Account"}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-2/3 items-center py-60 bg-[e4e7e8]">
        <h1 className=" text-4xl mb-24 font-semibold">
          {toSignUp ? <>Create Account</> : <>Log In</>}
        </h1>
        <form className="flex flex-col w-80 p-4 gap-14">
          <div className="flex flex-col gap-6">
            <label className={`flex flex-col mt-6`}>
              <div
                className={`${
                  emailFocus
                    ? "text-slate-800 text-sm -translate-y-5"
                    : "px-3 py-1 text-lg cursor-text"
                } absolute transition-all duration-200 ease-in-out`}
              >
                <span>Email Address</span>
              </div>
              <input
                className="px-3 py-2 bg-inherit border-b border-gray-700 rounded-t-sm outline-none active:border-blue-500 transition-all duration-500 ease-in-out"
                type="text"
                name="email"
                id="email"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => (!form.email ? setEmailFocus(false) : "")}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                value={form.email}
              />
            </label>
            <label className={`flex flex-col mt-8`}>
              <div
                className={`${
                  passwordFocus
                    ? "text-slate-800 text-sm -translate-y-5"
                    : "px-3 py-1 text-lg cursor-text"
                } absolute transition-all duration-300 ease-in-out`}
              >
                <span>Password</span>
              </div>
              <input
                className="px-3 py-2 bg-inherit border-b border-gray-700 rounded-t-sm outline-none active:border-blue-500 transition-all duration-500 ease-in-out"
                type="password"
                name="password"
                id="password"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => (!form.password ? setPasswordFocus(false) : "")}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                value={form.password}
              />
            </label>
          </div>
          <div>
            <input
              className="bg-blue-500 text-white hover:bg-blue-700 w-full p-3 text-center cursor-pointer"
              type="submit"
              value={`${toSignUp ? "CREATE ACCOUNT" : "LOG IN"}`}
              onClick={handleAction}
            />
          </div>
        </form>
      </div>
    </main>
  );
}
