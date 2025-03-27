import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import HeroSection from "@/components/HeroSection";
import FeaturedArticle from "@/components/FeaturedArticle";
import ArticleCard, { ArticleProps } from "@/components/ArticleCard";
import PodcastCard, { PodcastProps } from "@/components/PodcastCard";
import Sidebar from "@/components/Sidebar";

const Home: React.FC = () => {
  // Fetch featured article
  const { data: featuredArticles, isLoading: isFeaturedLoading } = useQuery<ArticleProps[]>({
    queryKey: ['/api/articles', { featured: true, limit: 1 }],
  });

  // Fetch latest articles
  const { data: latestArticles, isLoading: isArticlesLoading } = useQuery<ArticleProps[]>({
    queryKey: ['/api/articles', { limit: 3 }],
  });

  // Fetch latest podcasts
  const { data: latestPodcasts, isLoading: isPodcastsLoading } = useQuery<PodcastProps[]>({
    queryKey: ['/api/podcasts', { limit: 2 }],
  });

  const featuredArticle = featuredArticles?.[0];

  return (
    <div>
      <HeroSection />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            {/* Featured Article */}
            {isFeaturedLoading ? (
              <div className="bg-white rounded-lg shadow-md h-96 animate-pulse mb-8" />
            ) : featuredArticle ? (
              <FeaturedArticle {...featuredArticle} />
            ) : null}

            {/* Latest Articles */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-heading">Latest Articles</h2>
                <Link href="/articles">
                  <a className="text-primary hover:text-primary-700 text-sm font-medium">View All</a>
                </Link>
              </div>

              <div className="space-y-8">
                {isArticlesLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm h-48 animate-pulse" />
                  ))
                ) : latestArticles?.map((article) => (
                  <ArticleCard key={article.id} {...article} />
                ))}
              </div>
            </section>

            {/* Latest Podcasts */}
            <section className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-heading">Latest Podcasts</h2>
                <Link href="/podcasts">
                  <a className="text-primary hover:text-primary-700 text-sm font-medium">View All</a>
                </Link>
              </div>

              <div className="space-y-6">
                {isPodcastsLoading ? (
                  Array(2).fill(0).map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm h-48 animate-pulse" />
                  ))
                ) : latestPodcasts?.map((podcast) => (
                  <PodcastCard key={podcast.id} {...podcast} />
                ))}
              </div>
            </section>
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

export default Home;
