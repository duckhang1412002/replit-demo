import { useState } from "react";
import { Link } from "wouter";
import { Play } from "lucide-react";
import { ArticleAuthor, ArticleCategory } from "./ArticleCard";

export interface PodcastProps {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageUrl?: string;
  audioUrl: string;
  duration: number; // in seconds
  episodeNumber?: number;
  author: ArticleAuthor;
  category?: ArticleCategory | null;
}

const PodcastCard: React.FC<PodcastProps> = ({
  title,
  slug,
  description,
  imageUrl,
  audioUrl,
  duration,
  episodeNumber,
  author
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Format time in MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Format duration in MM:SS
  const formattedDuration = formatTime(duration);
  
  // Handle playback (in a real app, would use audio elements)
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col md:flex-row items-start">
        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
          <img 
            src={imageUrl || "https://via.placeholder.com/128?text=Podcast"} 
            alt={`${title} cover art`} 
            className="h-32 w-32 rounded-lg object-cover"
          />
        </div>
        <div className="flex-grow">
          <div className="flex items-center mb-1">
            {episodeNumber && (
              <>
                <span className="text-xs font-medium text-gray-500">Episode {episodeNumber}</span>
                <span className="mx-2 text-gray-300">•</span>
              </>
            )}
            <span className="text-xs font-medium text-gray-500">{formattedDuration}</span>
          </div>
          <h3 className="text-xl font-bold mb-2 font-heading">
            <Link href={`/podcasts/${slug}`}>
              <a className="hover:text-primary transition-colors duration-200">{title}</a>
            </Link>
          </h3>
          <p className="text-gray-700 mb-4">
            {description}
          </p>
          <div className="bg-gray-100 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <button 
                  className="text-primary focus:outline-none mr-4"
                  onClick={togglePlayback}
                >
                  <Play className="w-8 h-8 text-primary" />
                </button>
                <div className="text-sm text-gray-500">
                  <span className="podcast-current-time">{formatTime(currentTime)}</span> / <span className="podcast-duration">{formattedDuration}</span>
                </div>
              </div>
            </div>
            <input 
              type="range" 
              className="w-full podcast-player h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer" 
              min="0" 
              max={duration} 
              value={currentTime}
              onChange={(e) => setCurrentTime(parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastCard;
