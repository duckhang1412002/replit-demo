import React from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Article, Category, Tag } from "@shared/schema";
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import { format } from "date-fns";

interface SidebarProps {
  recentPosts: Article[];
  categories: Category[];
  tags: Tag[];
}

const Sidebar: React.FC<SidebarProps> = ({ recentPosts, categories, tags }) => {
  return (
    <div className="space-y-8">
      {/* About Widget */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">About This Blog</CardTitle>
        </CardHeader>
        <Separator className="mb-4" />
        <CardContent className="flex flex-col items-center">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src="https://randomuser.me/api/portraits/women/65.jpg" alt="Blog author" />
            <AvatarFallback>EA</AvatarFallback>
          </Avatar>
          <p className="text-center text-muted-foreground font-serif mb-4">
            Welcome to CreatorSpace! I'm Emma, and I share insights on content creation, 
            digital marketing, and building an online presence.
          </p>
          <Link href="/about">
            <a className="text-primary font-medium hover:underline">Read More</a>
          </Link>
        </CardContent>
      </Card>

      {/* Newsletter Signup */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <h3 className="text-lg font-bold mb-3">Subscribe to Newsletter</h3>
          <p className="text-muted-foreground font-serif mb-4 text-sm">
            Get the latest articles, podcasts, and resources delivered straight to your inbox.
          </p>
          <form className="space-y-3">
            <Input 
              type="email" 
              placeholder="Your email address" 
              className="w-full"
              required
            />
            <Button type="submit" className="w-full">Subscribe</Button>
          </form>
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Recent Posts</CardTitle>
        </CardHeader>
        <Separator className="mb-4" />
        <CardContent className="px-6 py-0">
          <ul className="space-y-4">
            {recentPosts.map((post) => (
              <li key={post.id} className="flex py-2">
                <div className="flex-shrink-0 mr-3">
                  <img 
                    src={post.featuredImage || "https://placehold.co/100x100/e6e7ee/818cf8?text=Thumb"} 
                    alt={post.title} 
                    className="w-16 h-16 rounded object-cover" 
                  />
                </div>
                <div>
                  <h4 className="font-medium hover:text-primary text-sm">
                    <Link href={`/articles/${post.slug}`}>
                      <a>{post.title}</a>
                    </Link>
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(post.publishDate), "MMM d, yyyy")}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 mb-2">
            <Link href="/articles">
              <a className="text-primary text-sm font-medium hover:underline">
                View All Posts
              </a>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <Separator className="mb-4" />
        <CardContent className="px-6 py-0">
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link href={`/categories/${category.slug}`}>
                  <a className="flex justify-between items-center text-foreground hover:text-primary py-1">
                    <span>{category.name}</span>
                    <Badge variant="outline" className="rounded-full bg-muted/50">
                      {category.count}
                    </Badge>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Follow Me</CardTitle>
        </CardHeader>
        <Separator className="mb-4" />
        <CardContent>
          <div className="flex justify-center space-x-4">
            <Button size="icon" className="rounded-full bg-[#3b5998] hover:bg-[#3b5998]/90" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button size="icon" className="rounded-full bg-[#1da1f2] hover:bg-[#1da1f2]/90" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button size="icon" className="rounded-full bg-[#e4405f] hover:bg-[#e4405f]/90" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button size="icon" className="rounded-full bg-[#ff0000] hover:bg-[#ff0000]/90" aria-label="YouTube">
              <Youtube className="h-5 w-5" />
            </Button>
            <Button size="icon" className="rounded-full bg-[#0077b5] hover:bg-[#0077b5]/90" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tags Cloud */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Popular Tags</CardTitle>
        </CardHeader>
        <Separator className="mb-4" />
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link key={tag.id} href={`/tags/${tag.slug}`}>
                <a className="px-3 py-1 bg-muted text-foreground text-sm rounded-full hover:bg-muted/80 transition-colors">
                  {tag.name}
                </a>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sidebar;
