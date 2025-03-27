import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Podcast } from "@shared/schema";
import Layout from "../components/Layout";
import PodcastItem from "../components/PodcastItem";
import { Skeleton } from "../components/ui/skeleton";

const Podcasts: React.FC = () => {
  const { data: podcasts = [], isLoading } = useQuery<Podcast[]>({
    queryKey: ['/api/podcasts'],
  });

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Podcasts</h1>
        <p className="text-muted-foreground font-serif">
          Listen to our podcasts featuring interviews, discussions, and insights on content creation.
        </p>
      </div>

      {isLoading ? (
        [...Array(4)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-lg p-5 mb-4 shadow-sm">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 mb-4 md:mb-0">
                <Skeleton className="rounded-md w-full h-32" />
              </div>
              <div className="md:w-3/4 md:pl-6">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-16 w-full mb-3" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="w-full max-w-xs h-8 hidden md:block" />
                  <Skeleton className="h-8 w-28 md:hidden" />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        podcasts.map(podcast => (
          <PodcastItem key={podcast.id} podcast={podcast} />
        ))
      )}
    </Layout>
  );
};

export default Podcasts;
