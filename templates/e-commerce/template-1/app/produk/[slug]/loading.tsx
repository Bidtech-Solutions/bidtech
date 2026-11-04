import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function LoadingProductDetail() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-ink-900">
      <Navbar />
      <main className="flex-grow pt-24 sm:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Bar Skeleton */}
          <div className="flex items-center justify-between mb-8">
            <div className="h-9 w-36 bg-gray-200/70 rounded-xl animate-pulse" />
            <div className="h-5 w-48 bg-gray-200/70 rounded-md animate-pulse hidden sm:block" />
          </div>

          {/* 2-Column Showcase Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16">
            
            {/* Left Image Canvas Skeleton */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-2xl border border-gray-200 aspect-square flex items-center justify-center p-8 animate-pulse shadow-xs">
                <div className="w-56 h-56 bg-gray-100 rounded-2xl" />
              </div>
            </div>

            {/* Right Details Skeleton */}
            <div className="lg:col-span-6 space-y-4 pt-2">
              <div className="h-4 w-20 bg-gray-200/70 rounded animate-pulse" />
              <div className="h-9 w-3/4 bg-gray-200/70 rounded-lg animate-pulse" />
              <div className="h-4 w-full max-w-md bg-gray-200/70 rounded animate-pulse" />
              
              <div className="pt-4 border-b border-gray-100 pb-6">
                <div className="h-10 w-44 bg-gray-200/70 rounded-lg animate-pulse" />
              </div>

              {/* Color Swatches Skeleton */}
              <div className="pt-2">
                <div className="h-4 w-28 bg-gray-200/70 rounded animate-pulse mb-3" />
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-200/70 animate-pulse" />
                  <div className="w-9 h-9 rounded-full bg-gray-200/70 animate-pulse" />
                  <div className="w-9 h-9 rounded-full bg-gray-200/70 animate-pulse" />
                </div>
              </div>

              {/* Button Skeleton */}
              <div className="pt-6">
                <div className="h-14 w-full bg-gray-200/70 rounded-xl animate-pulse" />
              </div>
            </div>

          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}

