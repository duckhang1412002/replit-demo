import React from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PodcastItemProps } from "@/lib/types";

const PodcastItem: React.FC<PodcastItemProps> = ({ podcast }) => {
  return (
    <Card className="mb-4 transition-shadow hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <img 
              src={podcast.coverImage || "https://placehold.co/400x300/e6e7ee/818cf8?text=Podcast+Cover"} 
              alt={podcast.title} 
              className="rounded-md w-full h-32 object-cover" 
            />
          </div>
          <div className="md:w-3/4 md:pl-6">
            <Link href={`/podcasts/${podcast.slug}`}>
              <a className="text-lg font-bold mb-2 block hover:text-primary transition-colors">
                {podcast.title}
              </a>
            </Link>
            <p className="text-muted-foreground text-sm mb-3 font-serif">
              {podcast.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">
                {podcast.duration} • {format(new Date(podcast.publishDate), "MMM d, yyyy")}
              </span>
              <div className="hidden md:block w-full max-w-xs">
                <audio controls className="w-full">
                  <source src={podcast.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
              <Button variant="ghost" className="md:hidden text-primary hover:text-primary/80 p-0">
                <Play className="h-4 w-4 mr-2" /> Play Episode
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PodcastItem;
