import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, Calendar, User, Tag, Facebook, Twitter, Linkedin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArticleProps } from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";

const Article: React.FC = () => {
  const { id } = useParams();
  
  const { data: article, isLoading, error } = useQuery<ArticleProps & { content: string, tags: { id: number, name: string, slug: string }[] }>({
    queryKey: [`/api/articles/${id}`],
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Articles
            </Button>
            <Skeleton className="h-8 w-3/4 mb-4" />
            <div className="flex gap-4 mb-6">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-64 w-full mb-6" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <Sidebar />
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h2>
          <p className="text-gray-600 mb-6">The article you're looking for does not exist or has been removed.</p>
          <Link href="/articles">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Articles
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = formatDistanceToNow(new Date(article.createdAt), { addSuffix: true });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <article className="lg:col-span-8">
          <Link href="/articles">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Articles
            </Button>
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">{article.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>by {article.author.displayName}</span>
            </div>
            {article.category && (
              <Link href={`/articles?category=${article.category.slug}`}>
                <Badge variant="outline" className="hover:bg-primary-50 cursor-pointer">
                  {article.category.name}
                </Badge>
              </Link>
            )}
          </div>
          
          {article.imageUrl && (
            <div className="mb-6">
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-auto rounded-lg object-cover" 
              />
            </div>
          )}
          
          <div className="prose prose-lg max-w-none mb-8">
            <p>{article.content}</p>
          </div>
          
          <Separator className="my-8" />
          
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-0">
              <Tag className="h-4 w-4" />
              {article.tags?.map(tag => (
                <Link key={tag.id} href={`/articles?tag=${tag.slug}`}>
                  <Badge variant="secondary" className="hover:bg-primary-50 cursor-pointer">
                    #{tag.name}
                  </Badge>
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Share:</span>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-blue-600">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-blue-400">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-blue-700">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center">
              <img 
                src={article.author.avatarUrl || "https://via.placeholder.com/80?text=A"} 
                alt={`${article.author.displayName}'s profile`} 
                className="h-16 w-16 rounded-full mr-4" 
              />
              <div>
                <h3 className="text-lg font-bold mb-1">{article.author.displayName}</h3>
                <p className="text-sm text-gray-600 mb-2">Content Strategist & Podcaster</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                  <Link href="/about">
                    <Button variant="ghost" size="sm">
                      More Articles
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>

        <aside className="lg:col-span-4 mt-8 lg:mt-0">
          <Sidebar />
        </aside>
      </div>
    </div>
  );
};

export default Article;
