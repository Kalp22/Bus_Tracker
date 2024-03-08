import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen p-40 w-screen gap-20">
      <div className="flex flex-col h-full w-[40em] justify-center gap-12">
        <h1 className=" text-7xl">From Stop to Drop</h1>
        <h2 className=" text-3xl">
          Bus Tracker Ensures Your Bus is Right on Track
        </h2>
        <span>
          Your key to hassle-free commuting! Real-time bus tracking for
          precision in every journey. Stay ahead, stay on time!
        </span>
        <div className="flex justify-center">
          <Link href="/SigninSignup">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sign Up Now!
            </button>
          </Link>
        </div>
      </div>
      <div className=" flex items-center justify-center">
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

{
  /* <p>
  Welcome to Bus Tracker, your go-to solution for seamless and
  stress-free commuting! With our innovative platform, we bring you
  real-time tracking of your bus journeys, ensuring you stay one step
  ahead of your schedule.
</p>
<p>
  Imagine a world where waiting at the bus stop becomes a thing of the
  past. Bus Tracker transforms your commute experience by providing live
  updates on the whereabouts of your bus, so you can plan your arrival
  at the stop with precision.
</p>
<p>
  Whether you're a daily commuter or an occasional traveler, Bus Tracker
  empowers you to navigate your journey effortlessly. No more
  uncertainty – just reliable, on-the-go information that puts you in
  control of your travel time.
</p> */
}
