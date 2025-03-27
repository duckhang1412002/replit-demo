import { pgTable, text, serial, integer, boolean, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name").notNull(),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Categories table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
});

// Articles table
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  authorId: integer("author_id").references(() => users.id).notNull(),
  categoryId: integer("category_id").references(() => categories.id),
  featured: boolean("featured").default(false),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Podcasts table
export const podcasts = pgTable("podcasts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  audioUrl: text("audio_url").notNull(),
  duration: integer("duration").notNull(), // duration in seconds
  episodeNumber: integer("episode_number"),
  authorId: integer("author_id").references(() => users.id).notNull(),
  categoryId: integer("category_id").references(() => categories.id),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Tags table
export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
});

// ArticleTags junction table
export const articleTags = pgTable("article_tags", {
  id: serial("id").primaryKey(),
  articleId: integer("article_id").references(() => articles.id).notNull(),
  tagId: integer("tag_id").references(() => tags.id).notNull(),
}, (table) => {
  return {
    articleTagIdx: uniqueIndex("article_tag_idx").on(table.articleId, table.tagId),
  };
});

// PodcastTags junction table
export const podcastTags = pgTable("podcast_tags", {
  id: serial("id").primaryKey(),
  podcastId: integer("podcast_id").references(() => podcasts.id).notNull(),
  tagId: integer("tag_id").references(() => tags.id).notNull(),
}, (table) => {
  return {
    podcastTagIdx: uniqueIndex("podcast_tag_idx").on(table.podcastId, table.tagId),
  };
});

// Email subscribers
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Site settings
export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
});

// Create insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });
export const insertArticleSchema = createInsertSchema(articles).omit({ id: true, createdAt: true, updatedAt: true });
export const insertPodcastSchema = createInsertSchema(podcasts).omit({ id: true, createdAt: true });
export const insertTagSchema = createInsertSchema(tags).omit({ id: true });
export const insertArticleTagSchema = createInsertSchema(articleTags).omit({ id: true });
export const insertPodcastTagSchema = createInsertSchema(podcastTags).omit({ id: true });
export const insertSubscriberSchema = createInsertSchema(subscribers).omit({ id: true, createdAt: true });
export const insertSettingSchema = createInsertSchema(settings).omit({ id: true });

// Export types
export type User = typeof users.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Article = typeof articles.$inferSelect;
export type Podcast = typeof podcasts.$inferSelect;
export type Tag = typeof tags.$inferSelect;
export type ArticleTag = typeof articleTags.$inferSelect;
export type PodcastTag = typeof podcastTags.$inferSelect;
export type Subscriber = typeof subscribers.$inferSelect;
export type Setting = typeof settings.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type InsertPodcast = z.infer<typeof insertPodcastSchema>;
export type InsertTag = z.infer<typeof insertTagSchema>;
export type InsertArticleTag = z.infer<typeof insertArticleTagSchema>;
export type InsertPodcastTag = z.infer<typeof insertPodcastTagSchema>;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type InsertSetting = z.infer<typeof insertSettingSchema>;
