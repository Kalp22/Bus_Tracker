import { useState, useEffect } from "react";

export default function Spinner({
  size,
  color,
  border,
}: {
  size: number;
  color: string;
  border: number;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    isMounted && (
      <div
        className={`animate-spin size-${size} mx-2 border-${border} border-y-${color} border-x-transparent rounded-full`}
      ></div>
    )
  );
}
