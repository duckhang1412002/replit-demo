import React from "react";
import { Link } from "wouter";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ExternalLink } from "lucide-react";
import { ArticleCardProps } from "@/lib/types";

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Card className="overflow-hidden h-full transition-shadow hover:shadow-md">
      <div className="relative h-48 w-full bg-muted">
        <img 
          src={article.featuredImage || "https://placehold.co/600x400/e6e7ee/818cf8?text=Feature+Image"} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="p-5 pb-0">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="rounded-full">
            Category
          </Badge>
          <span className="text-muted-foreground text-sm">
            {format(new Date(article.publishDate), "MMM d, yyyy")}
          </span>
        </div>
        <Link href={`/articles/${article.slug}`}>
          <a className="text-lg font-bold line-clamp-2 hover:text-primary transition-colors">
            {article.title}
          </a>
        </Link>
      </CardHeader>
      <CardContent className="p-5 pt-2">
        <p className="text-muted-foreground text-sm line-clamp-3 font-serif">
          {article.excerpt}
        </p>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Link href={`/articles/${article.slug}`}>
          <a className="text-primary font-medium text-sm hover:underline flex items-center gap-1">
            Read more <ExternalLink className="h-3 w-3" />
          </a>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
