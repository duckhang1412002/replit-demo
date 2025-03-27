import { 
  users, categories, articles, podcasts, tags,
  type User, type InsertUser, 
  type Category, type InsertCategory,
  type Article, type InsertArticle,
  type Podcast, type InsertPodcast,
  type Tag, type InsertTag
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Category methods
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Article methods
  getArticles(limit?: number): Promise<Article[]>;
  getFeaturedArticles(): Promise<Article[]>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  getArticlesByCategory(categoryId: number): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;
  
  // Podcast methods
  getPodcasts(limit?: number): Promise<Podcast[]>;
  getPodcastBySlug(slug: string): Promise<Podcast | undefined>;
  createPodcast(podcast: InsertPodcast): Promise<Podcast>;
  
  // Tag methods
  getTags(): Promise<Tag[]>;
  getTagBySlug(slug: string): Promise<Tag | undefined>;
  createTag(tag: InsertTag): Promise<Tag>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private articles: Map<number, Article>;
  private podcasts: Map<number, Podcast>;
  private tags: Map<number, Tag>;
  
  private userId: number;
  private categoryId: number;
  private articleId: number;
  private podcastId: number;
  private tagId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.articles = new Map();
    this.podcasts = new Map();
    this.tags = new Map();
    
    this.userId = 1;
    this.categoryId = 1;
    this.articleId = 1;
    this.podcastId = 1;
    this.tagId = 1;
    
    this.seedData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug
    );
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  // Article methods
  async getArticles(limit?: number): Promise<Article[]> {
    const articles = Array.from(this.articles.values())
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
    
    return limit ? articles.slice(0, limit) : articles;
  }

  async getFeaturedArticles(): Promise<Article[]> {
    return Array.from(this.articles.values())
      .filter(article => article.isFeatured)
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return Array.from(this.articles.values()).find(
      (article) => article.slug === slug
    );
  }

  async getArticlesByCategory(categoryId: number): Promise<Article[]> {
    return Array.from(this.articles.values())
      .filter(article => article.categoryId === categoryId)
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = this.articleId++;
    const article: Article = { ...insertArticle, id };
    this.articles.set(id, article);
    return article;
  }

  // Podcast methods
  async getPodcasts(limit?: number): Promise<Podcast[]> {
    const podcasts = Array.from(this.podcasts.values())
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
    
    return limit ? podcasts.slice(0, limit) : podcasts;
  }

  async getPodcastBySlug(slug: string): Promise<Podcast | undefined> {
    return Array.from(this.podcasts.values()).find(
      (podcast) => podcast.slug === slug
    );
  }

  async createPodcast(insertPodcast: InsertPodcast): Promise<Podcast> {
    const id = this.podcastId++;
    const podcast: Podcast = { ...insertPodcast, id };
    this.podcasts.set(id, podcast);
    return podcast;
  }

  // Tag methods
  async getTags(): Promise<Tag[]> {
    return Array.from(this.tags.values());
  }

  async getTagBySlug(slug: string): Promise<Tag | undefined> {
    return Array.from(this.tags.values()).find(
      (tag) => tag.slug === slug
    );
  }

  async createTag(insertTag: InsertTag): Promise<Tag> {
    const id = this.tagId++;
    const tag: Tag = { ...insertTag, id };
    this.tags.set(id, tag);
    return tag;
  }

  // Seed method to populate initial data
  private seedData() {
    // Seed admin user
    const admin: User = {
      id: this.userId++,
      username: "admin",
      password: "admin123"
    };
    this.users.set(admin.id, admin);
    
    // Seed categories
    const categories = [
      { name: "Content Creation", slug: "content-creation", count: 24 },
      { name: "Social Media", slug: "social-media", count: 18 },
      { name: "Podcasting", slug: "podcasting", count: 12 },
      { name: "Monetization", slug: "monetization", count: 9 },
      { name: "Productivity", slug: "productivity", count: 15 }
    ];
    
    categories.forEach(cat => {
      const category: Category = {
        id: this.categoryId++,
        name: cat.name,
        slug: cat.slug,
        count: cat.count
      };
      this.categories.set(category.id, category);
    });
    
    // Seed tags
    const tags = [
      { name: "content", slug: "content" },
      { name: "marketing", slug: "marketing" },
      { name: "social media", slug: "social-media" },
      { name: "seo", slug: "seo" },
      { name: "podcast", slug: "podcast" },
      { name: "blogging", slug: "blogging" },
      { name: "writing", slug: "writing" },
      { name: "productivity", slug: "productivity" },
      { name: "analytics", slug: "analytics" },
      { name: "audience", slug: "audience" }
    ];
    
    tags.forEach(t => {
      const tag: Tag = {
        id: this.tagId++,
        name: t.name,
        slug: t.slug
      };
      this.tags.set(tag.id, tag);
    });
    
    // Seed articles
    const articles = [
      {
        title: "How to Create Engaging Content That Keeps Readers Coming Back",
        slug: "create-engaging-content",
        content: "The secret to building a loyal audience isn't just about publishing regularly—it's about creating content that resonates deeply with your readers and keeps them engaged long after they've finished reading. This comprehensive guide explores various techniques and strategies to create compelling content.",
        excerpt: "The secret to building a loyal audience isn't just about publishing regularly—it's about creating content that resonates deeply with your readers and keeps them engaged long after they've finished reading.",
        featuredImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
        categoryId: 1,
        authorId: 1,
        isFeatured: true,
        publishDate: new Date("2023-05-15")
      },
      {
        title: "10 Social Media Trends Every Creator Should Know in 2023",
        slug: "social-media-trends-2023",
        content: "Social media landscapes are constantly evolving. Stay ahead of the curve with these emerging trends that are reshaping how we connect with audiences online. From algorithm changes to new features, we cover everything you need to know.",
        excerpt: "Stay ahead of the curve with these emerging trends that are reshaping how we connect with audiences online.",
        featuredImage: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740",
        categoryId: 2,
        authorId: 1,
        isFeatured: false,
        publishDate: new Date("2023-05-10")
      },
      {
        title: "Understanding Your Audience: Analytics for Content Creators",
        slug: "audience-analytics",
        content: "Analytics can be intimidating, but they're essential for content creators. Learn how to interpret your analytics data to create more targeted content for your specific audience and increase engagement metrics.",
        excerpt: "Learn how to interpret your analytics data to create more targeted content for your specific audience.",
        featuredImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
        categoryId: 1,
        authorId: 1,
        isFeatured: false,
        publishDate: new Date("2023-05-08")
      },
      {
        title: "Essential Equipment for Starting Your Podcast on a Budget",
        slug: "podcast-equipment-budget",
        content: "You don't need expensive gear to launch a professional-sounding podcast. This guide breaks down the essential equipment you need to get started without breaking the bank. Focus on quality where it matters most.",
        excerpt: "You don't need expensive gear to launch a professional-sounding podcast. Here's what you really need.",
        featuredImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f",
        categoryId: 3,
        authorId: 1,
        isFeatured: false,
        publishDate: new Date("2023-05-05")
      },
      {
        title: "Creating a Content Calendar That Actually Works",
        slug: "content-calendar",
        content: "Stop the last-minute content scramble with this practical approach to planning your content strategy. We cover everything from content mapping to scheduling tools that will transform your workflow.",
        excerpt: "Stop the last-minute content scramble with this practical approach to planning your content strategy.",
        featuredImage: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28",
        categoryId: 5,
        authorId: 1,
        isFeatured: false,
        publishDate: new Date("2023-05-03")
      },
      {
        title: "7 Ways to Improve Your Content Strategy This Month",
        slug: "improve-content-strategy",
        content: "Looking for quick wins to boost your content performance? These 7 actionable strategies can be implemented immediately to see results in your content engagement and reach.",
        excerpt: "These actionable tips will help you refine your approach and get better results from your content marketing efforts.",
        featuredImage: "https://images.unsplash.com/photo-1611162616475-46b635cb6868",
        categoryId: 1,
        authorId: 1,
        isFeatured: false,
        publishDate: new Date("2023-05-01")
      },
      {
        title: "How to Build Your Personal Brand on Social Media",
        slug: "build-personal-brand",
        content: "Your personal brand is your most valuable asset as a content creator. This guide explores strategies to define, build, and maintain a strong personal brand that resonates with your target audience.",
        excerpt: "Learn effective strategies to establish yourself as an authority in your niche and grow your online presence.",
        featuredImage: "https://images.unsplash.com/photo-1616469829941-c7200edec809",
        categoryId: 2,
        authorId: 1,
        isFeatured: false,
        publishDate: new Date("2023-04-28")
      },
      {
        title: "The Best Tools for Content Creators in 2023",
        slug: "best-content-tools-2023",
        content: "The right tools can transform your content creation process. From writing assistants to video editors, this comprehensive guide covers the essential tools every content creator should consider.",
        excerpt: "Discover the most effective software and applications that will streamline your workflow and enhance your content quality.",
        featuredImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
        categoryId: 1,
        authorId: 1,
        isFeatured: false,
        publishDate: new Date("2023-04-25")
      }
    ];
    
    articles.forEach(art => {
      const article: Article = {
        id: this.articleId++,
        title: art.title,
        slug: art.slug,
        content: art.content,
        excerpt: art.excerpt,
        featuredImage: art.featuredImage,
        categoryId: art.categoryId,
        authorId: art.authorId,
        isFeatured: art.isFeatured,
        publishDate: art.publishDate
      };
      this.articles.set(article.id, article);
    });
    
    // Seed podcasts
    const podcasts = [
      {
        title: "The Creator Journey: Interview with Bestselling Author Mark Williams",
        slug: "creator-journey-mark-williams",
        description: "In this episode, we talk with Mark about his creative process, how he overcame writer's block, and his advice for aspiring authors.",
        coverImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618",
        audioUrl: "#",
        duration: "45 minutes",
        publishDate: new Date("2023-05-12")
      },
      {
        title: "Content Monetization Strategies That Actually Work",
        slug: "content-monetization-strategies",
        description: "We break down the most effective ways to monetize your content in 2023, beyond simple advertising models.",
        coverImage: "https://images.unsplash.com/photo-1588617312537-5144176285d6",
        audioUrl: "#",
        duration: "38 minutes",
        publishDate: new Date("2023-05-08")
      }
    ];
    
    podcasts.forEach(pod => {
      const podcast: Podcast = {
        id: this.podcastId++,
        title: pod.title,
        slug: pod.slug,
        description: pod.description,
        coverImage: pod.coverImage,
        audioUrl: pod.audioUrl,
        duration: pod.duration,
        publishDate: pod.publishDate
      };
      this.podcasts.set(podcast.id, podcast);
    });
  }
}

export const storage = new MemStorage();
