export const ImageSection = () => {
  return (
    <div className="bg-gradient-to-br from-orange-100 to-orange-50 dark:from-gray-700 dark:to-gray-900 p-12 hidden lg:flex items-center justify-center">
      <div className="relative w-full h-full max-w-2xl flex items-center justify-center">
        <img
          src="/illus.png"
          alt="Illustration"
          className="object-contain h-[70vh] w-auto rounded-xl shadow-lg border-8 border-white dark:border-gray-800"
        />
      </div>
    </div>
  );
};
