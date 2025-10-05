import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 min-h-[200px]">
      {/* Spinner */}
      <Loader className="h-10 w-10 animate-spin text-indigo-600" />

      {/* Skeleton bars */}
      <div className="space-y-2 w-48">
        <div className="h-3 w-full bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
        <div className="h-3 w-5/6 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
        <div className="h-3 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
      </div>

      <p className="text-gray-600 dark:text-gray-300 text-sm animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
};

export default Loading;
