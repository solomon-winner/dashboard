const EmptyComponent = (className) => {
  return (
    <div className="flex justify-center items-center bg-gray-100 rounded-md p-4">
      <p className={`text-gray-500 font-semibold ${className}`}>No information available.</p>
    </div>
  );
};
export default EmptyComponent;
