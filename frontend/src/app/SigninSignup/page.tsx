"use client";

import Image from "next/image";

import { useState } from "react";

export default function SignInSignUp() {
  const [toSignIn, setToSignIn] = useState(true);

  return (
    <main className="flex flex-row w-screen h-screen">
      <div>
        <picture>
          <Image
            alt="City Map"
            width={1000}
            height={1000}
            className=" h-screen object-cover"
            src="/map_city.jpg"
          />{" "}
        </picture>
      </div>
      <div>kjbvgvrbuu</div>
    </main>
  );
}
