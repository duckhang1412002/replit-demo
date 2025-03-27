import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearch } from "wouter";
import HeroSection from "@/components/HeroSection";
import ArticleCard, { ArticleProps } from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

type Category = {
  id: number;
  name: string;
  slug: string;
};

const Articles: React.FC = () => {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(useSearch());
  const categorySlug = searchParams.get('category');
  const tagSlug = searchParams.get('tag');
  const featured = searchParams.get('featured') === 'true';
  const view = searchParams.get('view') || 'latest';
  
  // State for active tab
  const [activeTab, setActiveTab] = useState<string>(view);

  // Update URL when tab changes
  useEffect(() => {
    const params = new URLSearchParams(useSearch());
    params.set('view', activeTab);
    setLocation(`/articles?${params.toString()}`);
  }, [activeTab, setLocation]);

  // Fetch categories
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  // Fetch articles based on filters
  const queryParams: Record<string, any> = {};
  if (featured) queryParams.featured = true;
  if (categorySlug && categories) {
    const category = categories.find(c => c.slug === categorySlug);
    if (category) queryParams.categoryId = category.id;
  }

  const { data: articles, isLoading } = useQuery<ArticleProps[]>({
    queryKey: ['/api/articles', queryParams],
  });

  // Title and description based on filters
  let pageTitle = "Articles";
  let pageDescription = "Explore our latest articles, guides, and insights";

  if (featured) {
    pageTitle = "Featured Articles";
    pageDescription = "Our best and most popular content";
  } else if (categorySlug && categories) {
    const category = categories.find(c => c.slug === categorySlug);
    if (category) {
      pageTitle = `${category.name} Articles`;
      pageDescription = `Explore our latest content about ${category.name.toLowerCase()}`;
    }
  } else if (tagSlug) {
    pageTitle = `#${tagSlug} Articles`;
    pageDescription = `Articles tagged with #${tagSlug}`;
  }

  return (
    <div>
      <HeroSection title={pageTitle} description={pageDescription} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="latest">Latest</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-8">
              <TabsContent value="latest" className="space-y-8 mt-0">
                {isLoading ? (
                  Array(5).fill(0).map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm p-4 flex flex-col md:flex-row gap-4">
                      <Skeleton className="h-48 md:w-1/3 w-full rounded-md" />
                      <div className="md:w-2/3 space-y-2">
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-6 w-1/3" />
                      </div>
                    </div>
                  ))
                ) : articles && articles.length > 0 ? (
                  articles.map(article => (
                    <ArticleCard key={article.id} {...article} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900">No articles found</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="featured" className="space-y-8 mt-0">
                {isLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm p-4 flex flex-col md:flex-row gap-4">
                      <Skeleton className="h-48 md:w-1/3 w-full rounded-md" />
                      <div className="md:w-2/3 space-y-2">
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-6 w-1/3" />
                      </div>
                    </div>
                  ))
                ) : articles && articles.filter(a => a.featured).length > 0 ? (
                  articles.filter(a => a.featured).map(article => (
                    <ArticleCard key={article.id} {...article} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900">No featured articles found</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Check back later for featured content.
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="categories" className="mt-0">
                {categories ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {categories.map(category => (
                      <div key={category.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                        <h3 className="text-xl font-bold mb-2 font-heading">{category.name}</h3>
                        <p className="text-gray-600 mb-4">
                          {`Explore our latest ${category.name.toLowerCase()} content`}
                        </p>
                        <a 
                          href={`/articles?category=${category.slug}`}
                          className="text-primary hover:text-primary-700 font-medium"
                        >
                          View Articles →
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {Array(6).fill(0).map((_, i) => (
                      <Skeleton key={i} className="h-40 w-full rounded-lg" />
                    ))}
                  </div>
                )}
              </TabsContent>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <Sidebar />
            </div>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default Articles;
