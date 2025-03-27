import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";
import { ArticleProps } from "./ArticleCard";

const FeaturedArticle: React.FC<ArticleProps> = ({
  title,
  slug,
  excerpt,
  imageUrl,
  author,
  createdAt
}) => {
  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
      <div className="relative h-64 md:h-80">
        <img 
          src={imageUrl || "https://via.placeholder.com/1200x600?text=Featured+Article"} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-70"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <div className="flex items-center mb-2">
            <span className="bg-accent text-white text-xs font-bold uppercase px-2 py-1 rounded">Featured</span>
            <span className="ml-2 text-sm">{formattedDate}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-2">{title}</h2>
          <div className="flex items-center">
            <img 
              src={author.avatarUrl || "https://via.placeholder.com/40?text=A"} 
              alt={`${author.displayName}'s profile`} 
              className="h-8 w-8 rounded-full mr-2"
            />
            <span className="text-sm">by {author.displayName}</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="mb-4 text-gray-700">
          {excerpt}
        </p>
        <Link href={`/articles/${slug}`}>
          <a className="inline-flex items-center text-primary hover:text-primary-700 font-medium">
            Continue Reading
            <svg className="ml-1 w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </a>
        </Link>
      </div>
    </article>
  );
};

export default FeaturedArticle;
