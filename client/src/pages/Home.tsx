import React from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Article, Podcast } from "@shared/schema";
import Layout from "../components/Layout";
import FeaturedArticle from "../components/FeaturedArticle";
import ArticleCard from "../components/ArticleCard";
import PodcastItem from "../components/PodcastItem";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Home: React.FC = () => {
  const { data: featuredArticles = [], isLoading: isFeaturedLoading } = useQuery<Article[]>({
    queryKey: ['/api/articles/featured'],
  });

  const { data: latestArticles = [], isLoading: isArticlesLoading } = useQuery<Article[]>({
    queryKey: ['/api/articles', { limit: 4 }],
  });

  const { data: podcasts = [], isLoading: isPodcastsLoading } = useQuery<Podcast[]>({
    queryKey: ['/api/podcasts', { limit: 2 }],
  });

  const featuredArticle = featuredArticles[0];

  return (
    <Layout>
      <section>
        {/* Featured Post */}
        <div className="mb-10">
          {isFeaturedLoading ? (
            <div className="bg-muted/30 rounded-lg overflow-hidden">
              <Skeleton className="w-full h-80" />
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-5 w-32 ml-2" />
                </div>
                <Skeleton className="h-9 w-3/4 mb-3" />
                <Skeleton className="h-20 w-full mb-4" />
                <div className="flex items-center">
                  <Skeleton className="h-10 w-10 rounded-full mr-3" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </div>
            </div>
          ) : featuredArticle ? (
            <FeaturedArticle article={featuredArticle} />
          ) : (
            <div className="text-center p-6 bg-muted/30 rounded-lg">
              <p>No featured articles found.</p>
            </div>
          )}
        </div>

        {/* Latest Articles */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-6 pb-2 border-b border-gray-200">Latest Articles</h2>
          {isArticlesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden border shadow-sm">
                  <Skeleton className="w-full h-48" />
                  <div className="p-5">
                    <div className="flex items-center mb-2">
                      <Skeleton className="h-4 w-16 rounded-full" />
                      <Skeleton className="h-4 w-24 ml-2" />
                    </div>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-16 w-full mb-4" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {latestArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
          <div className="mt-8 text-center">
            <Link href="/articles">
              <Button>View More Articles</Button>
            </Link>
          </div>
        </div>

        {/* Latest Podcasts */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-6 pb-2 border-b border-gray-200">Latest Podcasts</h2>
          {isPodcastsLoading ? (
            [...Array(2)].map((_, i) => (
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
          <div className="mt-6 text-center">
            <Link href="/podcasts">
              <Button variant="outline">Browse All Podcasts</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
