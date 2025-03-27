import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";

export interface ArticleAuthor {
  id: number;
  username: string;
  displayName: string;
  avatarUrl?: string;
}

export interface ArticleCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ArticleTag {
  id: number;
  name: string;
  slug: string;
}

export interface ArticleProps {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl?: string;
  author: ArticleAuthor;
  category?: ArticleCategory | null;
  createdAt: string;
  featured?: boolean;
}

const ArticleCard: React.FC<ArticleProps> = ({
  title,
  slug,
  excerpt,
  imageUrl,
  author,
  category,
  createdAt,
  featured = false
}) => {
  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row">
      <div className="md:w-1/3 flex-shrink-0">
        <img 
          src={imageUrl || "https://via.placeholder.com/300x200?text=No+Image"} 
          alt={title} 
          className="h-48 md:h-full w-full object-cover"
        />
      </div>
      <div className="p-6 md:w-2/3">
        <div className="flex items-center mb-2">
          <span className="text-xs font-medium text-gray-500">{formattedDate}</span>
          {category && (
            <>
              <span className="mx-2 text-gray-300">•</span>
              <Link href={`/articles?category=${category.slug}`}>
                <a className="text-xs font-medium text-primary">{category.name}</a>
              </Link>
            </>
          )}
        </div>
        <h3 className="text-xl font-bold mb-2 font-heading">
          <Link href={`/articles/${slug}`}>
            <a className="hover:text-primary transition-colors duration-200">{title}</a>
          </Link>
        </h3>
        <p className="text-gray-700 mb-4">
          {excerpt}
        </p>
        <div className="flex items-center mt-auto">
          <img 
            src={author.avatarUrl || "https://via.placeholder.com/40?text=A"} 
            alt={`${author.displayName}'s profile`} 
            className="h-8 w-8 rounded-full mr-2"
          />
          <span className="text-sm text-gray-600">by {author.displayName}</span>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
