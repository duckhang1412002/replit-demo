import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Article } from "@shared/schema";
import Layout from "../components/Layout";
import ArticleCard from "../components/ArticleCard";
import { Skeleton } from "../components/ui/skeleton";

const Articles: React.FC = () => {
  const { data: articles = [], isLoading } = useQuery<Article[]>({
    queryKey: ['/api/articles'],
  });

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Articles</h1>
        <p className="text-muted-foreground font-serif">
          Explore our collection of articles on content creation, social media, and more.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
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
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Articles;
