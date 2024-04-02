export default function Spinner({ size }: { size: number }) {
  return (
    <div className="flex items-center justify-center h-fit">
      <div
        className={`animate-spin rounded-full h-${size} w-${size} border-t-2 border-b-2 border-gray-900`}
      ></div>
    </div>
  );
}
