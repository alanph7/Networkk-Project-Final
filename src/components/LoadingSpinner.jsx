export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-sky-500 animate-spin"></div>
      <p className="mt-4 font-normal text-gray-600">Finding services for you...</p>
    </div>
    );
}
