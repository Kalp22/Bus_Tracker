import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen w-screen gap-20">
      <div className="flex flex-col justify-center gap-12 bg-gradient-to-br from-blue-500 to-green-500 h-full p-10">
        <h1 className="text-7xl text-white">From Stop to Drop</h1>
        <h2 className="text-3xl text-white">
          Bus Tracker Ensures Your Bus is Right on Track
        </h2>
        <span className="text-white">
          Your key to hassle-free commuting! Real-time bus tracking for
          precision in every journey. Stay ahead, stay on time!
        </span>
        <div className="flex justify-center">
          <Link href="/SigninSignup">
            <button className="bg-white text-blue-500 hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded">
              Sign Up Now!
            </button>
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-center h-full">
        <picture>
          <Image
            alt="Bus Tracker"
            height={700}
            src="/bus_vector.svg"
            width={700}
          />
        </picture>
      </div>
    </main>
  );
}
