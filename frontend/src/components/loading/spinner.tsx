import { useState } from "react";

export default function Spinner({ size }: { size: number }) {
  const [spinSize, setSpinSize] = useState(size);

  return (
    <div className="flex items-center justify-center h-fit">
      <div
        className={`animate-spin rounded-full h-${spinSize} w-${spinSize} border-t-2 border-b-2 border-gray-900`}
      ></div>
    </div>
  );
}
