import { useState } from "react";
import { Link } from "wouter";
import { Search, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type Category = {
  id: number;
  name: string;
  slug: string;
  count?: number;
};

type Tag = {
  id: number;
  name: string;
  slug: string;
};

type PopularPost = {
  id: number;
  title: string;
  slug: string;
  imageUrl?: string;
  viewCount: number;
  createdAt: string;
};

type Author = {
  id: number;
  username: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
};

const Sidebar: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Get categories
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  // Get popular posts - in a real app, this would be a separate API endpoint
  const { data: articles } = useQuery({
    queryKey: ['/api/articles', { limit: 3 }],
  });

  // Get tags
  const { data: tags } = useQuery<Tag[]>({
    queryKey: ['/api/tags'],
  });

  // Get author
  const { data: author } = useQuery<Author>({
    queryKey: ['/api/users/1'], // Just get the first user for demo
  });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsSubmitting(true);
    try {
      await apiRequest('POST', '/api/subscribe', { email });
      toast({
        title: "Success",
        description: "You have successfully subscribed to our newsletter!",
        variant: "default",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* About Widget */}
      {author && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-bold mb-4 font-heading">About This Blog</h3>
          <div className="flex items-center mb-4">
            <img 
              src={author.avatarUrl || "https://via.placeholder.com/64?text=A"} 
              alt="Blog author" 
              className="h-16 w-16 rounded-full mr-4" 
            />
            <div>
              <h4 className="font-medium">{author.displayName}</h4>
              <p className="text-sm text-gray-600">Content Strategist & Podcaster</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm mb-4">
            {author.bio || "I share actionable tips, strategies, and insights for content creators looking to build sustainable online businesses."}
          </p>
          <Link href="/about">
            <a className="text-primary hover:text-primary-700 text-sm font-medium">Learn More →</a>
          </Link>
        </div>
      )}

      {/* Search Widget */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-bold mb-4 font-heading">Search</h3>
        <form className="relative">
          <input 
            type="text" 
            placeholder="Search articles..." 
            className="w-full py-2 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary text-sm"
          />
          <button type="submit" className="absolute right-0 top-0 mr-2 mt-2 text-gray-500">
            <Search className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Categories Widget */}
      {categories && categories.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-bold mb-4 font-heading">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <Link key={category.id} href={`/articles?category=${category.slug}`}>
                <a className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md group transition-colors duration-200">
                  <span className="text-gray-700 group-hover:text-primary">{category.name}</span>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{category.count || 0}</span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Popular Posts Widget */}
      {articles && articles.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-bold mb-4 font-heading">Popular Posts</h3>
          <div className="space-y-4">
            {articles.slice(0, 3).map((post: any) => (
              <div key={post.id} className="flex items-start">
                <img 
                  src={post.imageUrl || "https://via.placeholder.com/56?text=Post"} 
                  alt="Post thumbnail" 
                  className="h-14 w-14 rounded object-cover flex-shrink-0 mr-3" 
                />
                <div>
                  <h4 className="text-sm font-medium text-gray-800 line-clamp-2">
                    <Link href={`/articles/${post.slug}`}>
                      <a className="hover:text-primary transition-colors duration-200">{post.title}</a>
                    </Link>
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.floor(Math.random() * 5)}K views • {Math.floor(Math.random() * 14) + 1} days ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter Widget */}
      <div className="bg-primary-50 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-bold mb-2 font-heading">Subscribe to Newsletter</h3>
        <p className="text-sm text-gray-700 mb-4">Get weekly content tips, resources, and inspiration delivered to your inbox.</p>
        <form onSubmit={handleSubscribe}>
          <div className="mb-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full py-2 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-2 px-4 bg-primary hover:bg-primary-700 text-white font-medium rounded-md transition-colors duration-300 disabled:opacity-70"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2">We respect your privacy. Unsubscribe at any time.</p>
      </div>

      {/* Social Links Widget */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-bold mb-4 font-heading">Connect With Me</h3>
        <div className="flex justify-between">
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
            <Facebook className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-400 transition-colors duration-200">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-600 hover:text-red-600 transition-colors duration-200">
            <Youtube className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors duration-200">
            <Instagram className="w-6 h-6" />
          </a>
        </div>
      </div>
      
      {/* Tags Widget */}
      {tags && tags.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-bold mb-4 font-heading">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link key={tag.id} href={`/articles?tag=${tag.slug}`}>
                <a className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200">
                  #{tag.name}
                </a>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
