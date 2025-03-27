import {
  users, categories, articles, podcasts, tags, articleTags, podcastTags, subscribers, settings,
  type User, type Category, type Article, type Podcast, type Tag, type ArticleTag, type PodcastTag, type Subscriber, type Setting,
  type InsertUser, type InsertCategory, type InsertArticle, type InsertPodcast, type InsertTag, type InsertArticleTag, type InsertPodcastTag, type InsertSubscriber, type InsertSetting
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Category operations
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Article operations
  getArticles(options?: { limit?: number, featured?: boolean, categoryId?: number }): Promise<Article[]>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: number, article: Partial<InsertArticle>): Promise<Article | undefined>;
  deleteArticle(id: number): Promise<boolean>;

  // Podcast operations
  getPodcasts(options?: { limit?: number, categoryId?: number }): Promise<Podcast[]>;
  getPodcastBySlug(slug: string): Promise<Podcast | undefined>;
  createPodcast(podcast: InsertPodcast): Promise<Podcast>;
  updatePodcast(id: number, podcast: Partial<InsertPodcast>): Promise<Podcast | undefined>;
  deletePodcast(id: number): Promise<boolean>;

  // Tag operations
  getTags(): Promise<Tag[]>;
  getTagBySlug(slug: string): Promise<Tag | undefined>;
  createTag(tag: InsertTag): Promise<Tag>;
  getArticleTags(articleId: number): Promise<Tag[]>;
  getPodcastTags(podcastId: number): Promise<Tag[]>;
  addArticleTag(articleTag: InsertArticleTag): Promise<ArticleTag>;
  addPodcastTag(podcastTag: InsertPodcastTag): Promise<PodcastTag>;

  // Subscriber operations
  addSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;

  // Settings operations
  getSetting(key: string): Promise<Setting | undefined>;
  updateSetting(key: string, value: string): Promise<Setting>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private articles: Map<number, Article>;
  private podcasts: Map<number, Podcast>;
  private tags: Map<number, Tag>;
  private articleTags: Map<number, ArticleTag>;
  private podcastTags: Map<number, PodcastTag>;
  private subscribers: Map<number, Subscriber>;
  private siteSettings: Map<number, Setting>;

  private userIdCounter: number = 1;
  private categoryIdCounter: number = 1;
  private articleIdCounter: number = 1;
  private podcastIdCounter: number = 1;
  private tagIdCounter: number = 1;
  private articleTagIdCounter: number = 1;
  private podcastTagIdCounter: number = 1;
  private subscriberIdCounter: number = 1;
  private settingIdCounter: number = 1;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.articles = new Map();
    this.podcasts = new Map();
    this.tags = new Map();
    this.articleTags = new Map();
    this.podcastTags = new Map();
    this.subscribers = new Map();
    this.siteSettings = new Map();

    // Initialize with default data
    this.initializeData();
  }

  private initializeData() {
    // Create default user
    const defaultUser: InsertUser = {
      username: "admin",
      password: "password", // In real system, would be hashed
      displayName: "David Chen",
      bio: "Content Strategist & Podcaster sharing actionable tips, strategies, and insights for content creators looking to build sustainable online businesses.",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    };
    const user = this.createUser(defaultUser);

    // Create default categories
    const categories = [
      { name: "Content Strategy", slug: "content-strategy" },
      { name: "Podcasting", slug: "podcasting" },
      { name: "Social Media", slug: "social-media" },
      { name: "SEO", slug: "seo" },
      { name: "Video Creation", slug: "video-creation" }
    ];
    const createdCategories = categories.map(cat => this.createCategory(cat));

    // Create default tags
    const tags = [
      { name: "Content Marketing", slug: "content-marketing" },
      { name: "Blogging Tips", slug: "blogging-tips" },
      { name: "SEO", slug: "seo" },
      { name: "Podcast Growth", slug: "podcast-growth" },
      { name: "Email Marketing", slug: "email-marketing" },
      { name: "Monetization", slug: "monetization" },
      { name: "Productivity Tips", slug: "productivity-tips" },
      { name: "Social Media", slug: "social-media" }
    ];
    const createdTags = tags.map(tag => this.createTag(tag));

    // Create sample articles
    const articles = [
      {
        title: "How to Create Engaging Content That Converts",
        slug: "how-to-create-engaging-content-that-converts",
        excerpt: "In today's content-saturated digital landscape, creating material that not only captures attention but also drives action is more challenging—and more essential—than ever.",
        content: "In today's content-saturated digital landscape, creating material that not only captures attention but also drives action is more challenging—and more essential—than ever. This comprehensive guide explores proven strategies for developing content that resonates with your audience and motivates them to take the next step.",
        imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
        authorId: user.id,
        categoryId: createdCategories[0].id,
        featured: true,
        published: true
      },
      {
        title: "10 Proven Strategies for Growing Your Online Audience",
        slug: "proven-strategies-growing-online-audience",
        excerpt: "Building an engaged online audience isn't just about posting consistently—it's about creating a strategic approach that connects with your target viewers and readers.",
        content: "Building an engaged online audience isn't just about posting consistently—it's about creating a strategic approach that connects with your target viewers and readers. Discover the methods that industry leaders use to expand their digital reach.",
        imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
        authorId: user.id,
        categoryId: createdCategories[0].id,
        featured: false,
        published: true
      },
      {
        title: "Starting a Successful Podcast: Equipment and Planning Guide",
        slug: "starting-successful-podcast-equipment-planning-guide",
        excerpt: "Launching a podcast doesn't require fancy equipment or a sound engineering degree, but knowing the essentials will help you create professional-quality episodes from the start.",
        content: "Launching a podcast doesn't require fancy equipment or a sound engineering degree, but knowing the essentials will help you create professional-quality episodes from the start. This guide breaks down exactly what you need.",
        imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8",
        authorId: user.id,
        categoryId: createdCategories[1].id,
        featured: false,
        published: true
      },
      {
        title: "The Complete Social Media Content Calendar Template",
        slug: "complete-social-media-content-calendar-template",
        excerpt: "Consistency is key in social media marketing, but planning weeks of content in advance can feel overwhelming.",
        content: "Consistency is key in social media marketing, but planning weeks of content in advance can feel overwhelming. This ready-to-use template helps you organize your posts across platforms while maintaining your brand voice.",
        imageUrl: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740",
        authorId: user.id,
        categoryId: createdCategories[2].id,
        featured: false,
        published: true
      }
    ];
    
    const createdArticles = articles.map(article => this.createArticle(article));
    
    // Add tags to articles
    createdArticles.forEach((article, index) => {
      // Add 2-3 tags to each article
      const tagsToAdd = createdTags.slice(index, index + 3);
      tagsToAdd.forEach(tag => {
        this.addArticleTag({
          articleId: article.id,
          tagId: tag.id
        });
      });
    });

    // Create sample podcasts
    const podcasts = [
      {
        title: "The Future of Content Creation with AI Tools",
        slug: "future-content-creation-ai-tools",
        description: "In this episode, we explore how artificial intelligence is reshaping the content creation landscape, from writing assistants to image generation. Industry experts weigh in on ethical considerations and how creators can leverage these tools effectively.",
        imageUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618",
        audioUrl: "/podcasts/episode-42.mp3",
        duration: 2700, // 45 minutes
        episodeNumber: 42,
        authorId: user.id,
        categoryId: createdCategories[0].id,
        published: true
      },
      {
        title: "Monetization Strategies for Independent Creators",
        slug: "monetization-strategies-independent-creators",
        description: "From subscription models to digital products, this episode breaks down diverse revenue streams for bloggers, podcasters, and content creators looking to build sustainable businesses around their passion projects.",
        imageUrl: "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a",
        audioUrl: "/podcasts/episode-41.mp3",
        duration: 2280, // 38 minutes
        episodeNumber: 41,
        authorId: user.id,
        categoryId: createdCategories[1].id,
        published: true
      }
    ];
    
    const createdPodcasts = podcasts.map(podcast => this.createPodcast(podcast));
    
    // Add tags to podcasts
    createdPodcasts.forEach((podcast, index) => {
      // Add 2-3 tags to each podcast
      const tagsToAdd = createdTags.slice(index + 2, index + 5);
      tagsToAdd.forEach(tag => {
        this.addPodcastTag({
          podcastId: podcast.id,
          tagId: tag.id
        });
      });
    });

    // Create site settings
    const siteSettings = [
      { key: "site_title", value: "Creator's Canvas" },
      { key: "site_description", value: "A simple, elegant platform for content creators, bloggers, and podcasters to publish their work without the technical hassle" },
      { key: "site_logo", value: "/logo.svg" },
      { key: "primary_color", value: "#3B82F6" },
      { key: "accent_color", value: "#F59E0B" },
      { key: "font_heading", value: "Inter" },
      { key: "font_body", value: "Merriweather" }
    ];
    
    siteSettings.forEach(setting => {
      this.updateSetting(setting.key, setting.value);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const newUser: User = { ...user, id, createdAt: now };
    this.users.set(id, newUser);
    return newUser;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug,
    );
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const id = this.categoryIdCounter++;
    const newCategory: Category = { ...category, id };
    this.categories.set(id, newCategory);
    return newCategory;
  }

  // Article methods
  async getArticles(options?: { limit?: number, featured?: boolean, categoryId?: number }): Promise<Article[]> {
    let articles = Array.from(this.articles.values())
      .filter(article => article.published);
    
    if (options?.featured !== undefined) {
      articles = articles.filter(article => article.featured === options.featured);
    }
    
    if (options?.categoryId !== undefined) {
      articles = articles.filter(article => article.categoryId === options.categoryId);
    }
    
    // Sort by date (newest first)
    articles.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    if (options?.limit) {
      articles = articles.slice(0, options.limit);
    }
    
    return articles;
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return Array.from(this.articles.values()).find(
      (article) => article.slug === slug && article.published,
    );
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const id = this.articleIdCounter++;
    const now = new Date();
    const newArticle: Article = { ...article, id, createdAt: now, updatedAt: now };
    this.articles.set(id, newArticle);
    return newArticle;
  }

  async updateArticle(id: number, article: Partial<InsertArticle>): Promise<Article | undefined> {
    const existingArticle = this.articles.get(id);
    if (!existingArticle) return undefined;
    
    const now = new Date();
    const updatedArticle: Article = { ...existingArticle, ...article, updatedAt: now };
    this.articles.set(id, updatedArticle);
    return updatedArticle;
  }

  async deleteArticle(id: number): Promise<boolean> {
    return this.articles.delete(id);
  }

  // Podcast methods
  async getPodcasts(options?: { limit?: number, categoryId?: number }): Promise<Podcast[]> {
    let podcasts = Array.from(this.podcasts.values())
      .filter(podcast => podcast.published);
    
    if (options?.categoryId !== undefined) {
      podcasts = podcasts.filter(podcast => podcast.categoryId === options.categoryId);
    }
    
    // Sort by episode number (descending)
    podcasts.sort((a, b) => {
      if (a.episodeNumber === null) return 1;
      if (b.episodeNumber === null) return -1;
      return b.episodeNumber - a.episodeNumber;
    });
    
    if (options?.limit) {
      podcasts = podcasts.slice(0, options.limit);
    }
    
    return podcasts;
  }

  async getPodcastBySlug(slug: string): Promise<Podcast | undefined> {
    return Array.from(this.podcasts.values()).find(
      (podcast) => podcast.slug === slug && podcast.published,
    );
  }

  async createPodcast(podcast: InsertPodcast): Promise<Podcast> {
    const id = this.podcastIdCounter++;
    const now = new Date();
    const newPodcast: Podcast = { ...podcast, id, createdAt: now };
    this.podcasts.set(id, newPodcast);
    return newPodcast;
  }

  async updatePodcast(id: number, podcast: Partial<InsertPodcast>): Promise<Podcast | undefined> {
    const existingPodcast = this.podcasts.get(id);
    if (!existingPodcast) return undefined;
    
    const updatedPodcast: Podcast = { ...existingPodcast, ...podcast };
    this.podcasts.set(id, updatedPodcast);
    return updatedPodcast;
  }

  async deletePodcast(id: number): Promise<boolean> {
    return this.podcasts.delete(id);
  }

  // Tag methods
  async getTags(): Promise<Tag[]> {
    return Array.from(this.tags.values());
  }

  async getTagBySlug(slug: string): Promise<Tag | undefined> {
    return Array.from(this.tags.values()).find(tag => tag.slug === slug);
  }

  async createTag(tag: InsertTag): Promise<Tag> {
    const id = this.tagIdCounter++;
    const newTag: Tag = { ...tag, id };
    this.tags.set(id, newTag);
    return newTag;
  }

  async getArticleTags(articleId: number): Promise<Tag[]> {
    const tagIds = Array.from(this.articleTags.values())
      .filter(at => at.articleId === articleId)
      .map(at => at.tagId);
      
    return tagIds.map(id => this.tags.get(id)).filter((tag): tag is Tag => tag !== undefined);
  }

  async getPodcastTags(podcastId: number): Promise<Tag[]> {
    const tagIds = Array.from(this.podcastTags.values())
      .filter(pt => pt.podcastId === podcastId)
      .map(pt => pt.tagId);
      
    return tagIds.map(id => this.tags.get(id)).filter((tag): tag is Tag => tag !== undefined);
  }

  async addArticleTag(articleTag: InsertArticleTag): Promise<ArticleTag> {
    const id = this.articleTagIdCounter++;
    const newArticleTag: ArticleTag = { ...articleTag, id };
    this.articleTags.set(id, newArticleTag);
    return newArticleTag;
  }

  async addPodcastTag(podcastTag: InsertPodcastTag): Promise<PodcastTag> {
    const id = this.podcastTagIdCounter++;
    const newPodcastTag: PodcastTag = { ...podcastTag, id };
    this.podcastTags.set(id, newPodcastTag);
    return newPodcastTag;
  }

  // Subscriber methods
  async addSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    // Check if email already exists
    const existingSubscriber = Array.from(this.subscribers.values()).find(
      s => s.email === subscriber.email
    );
    
    if (existingSubscriber) {
      return existingSubscriber;
    }
    
    const id = this.subscriberIdCounter++;
    const now = new Date();
    const newSubscriber: Subscriber = { ...subscriber, id, createdAt: now };
    this.subscribers.set(id, newSubscriber);
    return newSubscriber;
  }

  // Settings methods
  async getSetting(key: string): Promise<Setting | undefined> {
    return Array.from(this.siteSettings.values()).find(setting => setting.key === key);
  }

  async updateSetting(key: string, value: string): Promise<Setting> {
    const existingSetting = Array.from(this.siteSettings.values()).find(
      setting => setting.key === key
    );
    
    if (existingSetting) {
      const updatedSetting: Setting = { ...existingSetting, value };
      this.siteSettings.set(existingSetting.id, updatedSetting);
      return updatedSetting;
    } else {
      const id = this.settingIdCounter++;
      const newSetting: Setting = { id, key, value };
      this.siteSettings.set(id, newSetting);
      return newSetting;
    }
  }
}

export const storage = new MemStorage();
