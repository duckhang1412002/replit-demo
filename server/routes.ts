import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertSubscriberSchema, 
  insertArticleSchema, 
  insertPodcastSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  const apiRouter = express.Router();

  // Site settings
  apiRouter.get('/settings', async (req, res) => {
    const settingsKeys = [
      'site_title', 
      'site_description', 
      'site_logo', 
      'primary_color', 
      'accent_color',
      'font_heading',
      'font_body'
    ];
    
    const settingsPromises = settingsKeys.map(key => storage.getSetting(key));
    const settingsResults = await Promise.all(settingsPromises);
    
    const settings = settingsKeys.reduce((acc, key, index) => {
      const setting = settingsResults[index];
      if (setting) {
        acc[key] = setting.value;
      }
      return acc;
    }, {} as Record<string, string>);
    
    res.json(settings);
  });

  // Categories
  apiRouter.get('/categories', async (req, res) => {
    const categories = await storage.getCategories();
    res.json(categories);
  });

  apiRouter.get('/categories/:slug', async (req, res) => {
    const { slug } = req.params;
    const category = await storage.getCategoryBySlug(slug);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json(category);
  });

  // Articles
  apiRouter.get('/articles', async (req, res) => {
    const featuredString = req.query.featured as string | undefined;
    const featured = featuredString ? featuredString === 'true' : undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
    
    const articles = await storage.getArticles({ featured, limit, categoryId });
    
    const articlesWithAuthor = await Promise.all(articles.map(async (article) => {
      const author = await storage.getUser(article.authorId);
      const category = article.categoryId ? await storage.getCategories().then(
        categories => categories.find(c => c.id === article.categoryId)
      ) : null;
      const tags = await storage.getArticleTags(article.id);
      
      return {
        ...article,
        author: author ? {
          id: author.id,
          username: author.username,
          displayName: author.displayName,
          avatarUrl: author.avatarUrl,
          bio: author.bio
        } : null,
        category: category || null,
        tags: tags || []
      };
    }));
    
    res.json(articlesWithAuthor);
  });

  apiRouter.get('/articles/:slug', async (req, res) => {
    const { slug } = req.params;
    const article = await storage.getArticleBySlug(slug);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    const author = await storage.getUser(article.authorId);
    const category = article.categoryId ? await storage.getCategories().then(
      categories => categories.find(c => c.id === article.categoryId)
    ) : null;
    const tags = await storage.getArticleTags(article.id);
    
    res.json({
      ...article,
      author: author ? {
        id: author.id,
        username: author.username,
        displayName: author.displayName,
        avatarUrl: author.avatarUrl,
        bio: author.bio
      } : null,
      category: category || null,
      tags: tags || []
    });
  });

  apiRouter.post('/articles', async (req, res) => {
    try {
      const articleData = insertArticleSchema.parse(req.body);
      const article = await storage.createArticle(articleData);
      res.status(201).json(article);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid article data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to create article' });
    }
  });

  // Podcasts
  apiRouter.get('/podcasts', async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
    
    const podcasts = await storage.getPodcasts({ limit, categoryId });
    
    const podcastsWithAuthor = await Promise.all(podcasts.map(async (podcast) => {
      const author = await storage.getUser(podcast.authorId);
      const category = podcast.categoryId ? await storage.getCategories().then(
        categories => categories.find(c => c.id === podcast.categoryId)
      ) : null;
      const tags = await storage.getPodcastTags(podcast.id);
      
      return {
        ...podcast,
        author: author ? {
          id: author.id,
          username: author.username,
          displayName: author.displayName,
          avatarUrl: author.avatarUrl,
          bio: author.bio
        } : null,
        category: category || null,
        tags: tags || []
      };
    }));
    
    res.json(podcastsWithAuthor);
  });

  apiRouter.get('/podcasts/:slug', async (req, res) => {
    const { slug } = req.params;
    const podcast = await storage.getPodcastBySlug(slug);
    
    if (!podcast) {
      return res.status(404).json({ message: 'Podcast not found' });
    }
    
    const author = await storage.getUser(podcast.authorId);
    const category = podcast.categoryId ? await storage.getCategories().then(
      categories => categories.find(c => c.id === podcast.categoryId)
    ) : null;
    const tags = await storage.getPodcastTags(podcast.id);
    
    res.json({
      ...podcast,
      author: author ? {
        id: author.id,
        username: author.username,
        displayName: author.displayName,
        avatarUrl: author.avatarUrl,
        bio: author.bio
      } : null,
      category: category || null,
      tags: tags || []
    });
  });

  apiRouter.post('/podcasts', async (req, res) => {
    try {
      const podcastData = insertPodcastSchema.parse(req.body);
      const podcast = await storage.createPodcast(podcastData);
      res.status(201).json(podcast);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid podcast data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to create podcast' });
    }
  });

  // Tags
  apiRouter.get('/tags', async (req, res) => {
    const tags = await storage.getTags();
    res.json(tags);
  });

  // Subscribe to newsletter
  apiRouter.post('/subscribe', async (req, res) => {
    try {
      const subscriberData = insertSubscriberSchema.parse(req.body);
      const subscriber = await storage.addSubscriber(subscriberData);
      res.status(201).json({ message: 'Subscribed successfully' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid email', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to subscribe' });
    }
  });

  // Contact form
  apiRouter.post('/contact', async (req, res) => {
    const contactSchema = z.object({
      name: z.string().min(1),
      email: z.string().email(),
      message: z.string().min(10)
    });
    
    try {
      const contactData = contactSchema.parse(req.body);
      // In a real app, would store the message or send email
      res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid contact data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to send message' });
    }
  });

  // Mount the API router
  app.use('/api', apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
