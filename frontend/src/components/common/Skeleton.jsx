import React from "react";

// Base Skeleton shape
export const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-800 ${className}`}
      {...props}
    />
  );
};

// Skeleton for a Medium-style horizontal PostCard
export const PostCardSkeleton = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 py-8 border-b border-gray-100 dark:border-gray-800">
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center space-x-2 mb-3">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-6 w-2/3 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-4" />

        <div className="flex items-center space-x-4 mt-auto pt-4">
          <Skeleton className="h-4 w-20 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      <div className="w-full sm:w-[200px] sm:h-[134px] order-first sm:order-last mb-4 sm:mb-0 hidden sm:block">
        <Skeleton className="w-full h-full rounded-md" />
      </div>
    </div>
  );
};

// Skeleton for the Post Detail page
export const PostDetailSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto py-10 fade-in">
      <header className="mb-10 flex flex-col items-center">
        <Skeleton className="h-4 w-24 mb-6" />
        <Skeleton className="h-12 w-full max-w-2xl mb-4" />
        <Skeleton className="h-12 w-3/4 max-w-xl mb-8" />

        <div className="flex space-x-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
      </header>

      <Skeleton className="w-full h-64 md:h-[400px] mb-12 rounded-xl" />

      <div className="space-y-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-11/12" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
        <Skeleton className="h-5 w-full mt-8" />
        <Skeleton className="h-5 w-10/12" />
        <Skeleton className="h-5 w-full" />
      </div>
    </div>
  );
};

// Skeleton for comments
export const CommentSkeleton = () => {
  return (
    <div className="border-b border-gray-100 dark:border-gray-800 py-6">
      <div className="flex items-center space-x-3 mb-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
};
