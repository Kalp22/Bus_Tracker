"use client";

import Image from "next/image";

import { useState } from "react";

export default function SignInSignUp() {
  const [toSignUp, settoSignUp] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });

  return (
    <main
      className={`flex ${
        toSignUp ? "flex-row" : "flex-row-reverse"
      } w-screen h-screen`}
    >
      <div
        className=" w-1/2 cursor-pointer"
        onClick={() => settoSignUp(!toSignUp)}
      >
        <picture>
          <Image
            alt="City Map"
            width={1000}
            height={1000}
            className={` h-screen object-cover ${
              toSignUp ? "rounded-e-2xl" : "rounded-s-2xl"
            }`}
            src="/map_city.jpg"
          />{" "}
        </picture>
      </div>
      <div className=" flex flex-col w-2/3 items-center py-60">
        <h1 className=" text-4xl mb-24">
          {toSignUp ? <>Sign Up</> : <>Sign In</>}
        </h1>
        <form className=" flex flex-col p-4 gap-14">
          <div className=" flex flex-col gap-6">
            <label className=" flex flex-col ">
              <span>Email</span>
              <input
                className=" bg-slate-500 px-3 py-2 rounded-md"
                type="text"
                name="email"
                id="email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                value={form.email}
              />
            </label>
            <label className=" flex flex-col">
              <span>Password</span>
              <input
                className=" bg-slate-500 px-3 py-2 rounded-md"
                type="password"
                name="password"
                id="password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                value={form.password}
              />
            </label>
          </div>
          <div>
            <input
              className=" bg-slate-500 w-full p-3 rounded-2xl text-center cursor-pointer"
              type="submit"
              value={`${toSignUp ? "Sign Up" : "Sign In"}`}
            />
          </div>
        </form>
      </div>
    </main>
  );
}
