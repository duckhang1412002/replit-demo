import { useQuery } from "@tanstack/react-query";
import HeroSection from "@/components/HeroSection";
import PodcastCard, { PodcastProps } from "@/components/PodcastCard";
import Sidebar from "@/components/Sidebar";
import { Skeleton } from "@/components/ui/skeleton";

const Podcasts: React.FC = () => {
  const { data: podcasts, isLoading } = useQuery<PodcastProps[]>({
    queryKey: ['/api/podcasts'],
  });

  return (
    <div>
      <HeroSection 
        title="Podcasts" 
        description="Listen to our latest episodes on content creation, marketing strategies, and more"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-bold font-heading mb-6">All Episodes</h2>
            
            <div className="space-y-6">
              {isLoading ? (
                Array(4).fill(0).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex flex-col md:flex-row items-start">
                      <Skeleton className="h-32 w-32 rounded-lg flex-shrink-0 mb-4 md:mb-0 md:mr-6" />
                      <div className="flex-grow space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-10 w-full rounded-lg" />
                      </div>
                    </div>
                  </div>
                ))
              ) : podcasts && podcasts.length > 0 ? (
                podcasts.map(podcast => (
                  <PodcastCard key={podcast.id} {...podcast} />
                ))
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900">No podcasts found</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Check back later for new episodes.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Podcasts;
