export const LoadingSpinner = ({ size = "medium" }) => {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-6 w-6",
    large: "h-8 w-8",
  };

  return (
    <div
      className={`animate-spin ${sizeClasses[size]} border-2 border-white
                    border-t-transparent rounded-full`}
    />
  );
};
