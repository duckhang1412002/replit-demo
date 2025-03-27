import { Article, Category, Podcast, Tag } from "@shared/schema";

export interface SidebarProps {
  categories: Category[];
  recentPosts: Article[];
  tags: Tag[];
}

export interface ArticleCardProps {
  article: Article;
}

export interface FeaturedArticleProps {
  article: Article;
}

export interface PodcastItemProps {
  podcast: Podcast;
}

export interface SidebarWidget {
  title: string;
  component: React.ReactNode;
}

export interface LayoutOption {
  id: string;
  name: string;
}

export interface ColorScheme {
  id: string;
  primary: string;
  secondary: string;
  bgColor: string;
  textColor: string;
}

export interface FontOption {
  id: string;
  heading: string;
  body: string;
  name: string;
}

export interface ThemeSettings {
  layout: string;
  colorScheme: ColorScheme;
  font: FontOption;
}
