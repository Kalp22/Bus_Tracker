export default function Spinner({
  size,
  color,
  border,
}: {
  size: number;
  color: string;
  border: number;
}) {
  return (
    <div
      className={`animate-spin size-${size} mx-2 border-${border} border-y-${color} border-x-transparent rounded-full`}
    ></div>
  );
}
