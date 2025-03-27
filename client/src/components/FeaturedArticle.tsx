import React from "react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FeaturedArticleProps } from "@/lib/types";

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ article }) => {
  return (
    <Card className="overflow-hidden bg-muted/30">
      <div className="relative w-full h-80">
        <img 
          src={article.featuredImage || "https://placehold.co/1200x600/e6e7ee/818cf8?text=Featured+Image"} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge className="rounded-full bg-secondary/20 text-secondary hover:bg-secondary/30">
            Featured
          </Badge>
          <span className="text-muted-foreground text-sm">
            {format(new Date(article.publishDate), "MMMM d, yyyy")}
          </span>
        </div>
        <Link href={`/articles/${article.slug}`}>
          <a className="text-2xl font-bold mb-3 block hover:text-primary transition-colors">
            {article.title}
          </a>
        </Link>
        <p className="text-muted-foreground mb-4 font-serif">
          {article.excerpt}
        </p>
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src="https://randomuser.me/api/portraits/women/42.jpg" alt="Author" />
            <AvatarFallback>AU</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Sarah Johnson</p>
            <p className="text-xs text-muted-foreground">Content Strategist</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedArticle;
