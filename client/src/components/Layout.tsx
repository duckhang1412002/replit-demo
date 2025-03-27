import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import ThemeCustomizer from "./ThemeCustomizer";
import { useTheme } from "../context/ThemeContext";
import { useQuery } from "@tanstack/react-query";
import { Article, Category, Tag } from "@shared/schema";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { themeSettings } = useTheme();

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const { data: recentPosts = [] } = useQuery<Article[]>({
    queryKey: ['/api/articles', { limit: 3 }],
  });

  const { data: tags = [] } = useQuery<Tag[]>({
    queryKey: ['/api/tags'],
  });

  // Determine layout classes based on theme settings
  const getLayoutClasses = () => {
    switch (themeSettings.layout) {
      case "sidebar-left":
        return "flex flex-col lg:flex-row-reverse";
      case "full-width":
        return "flex flex-col";
      case "sidebar-right":
      default:
        return "flex flex-col lg:flex-row";
    }
  };

  // Determine content width based on theme settings
  const getContentClasses = () => {
    if (themeSettings.layout === "full-width") {
      return "w-full";
    }
    return "lg:w-2/3 lg:pr-8";
  };

  // Determine sidebar width based on theme settings
  const getSidebarClasses = () => {
    if (themeSettings.layout === "full-width") {
      return "w-full mt-10";
    }
    return "lg:w-1/3 mt-10 lg:mt-0";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <div className={getLayoutClasses()}>
          <div className={getContentClasses()}>
            {children}
          </div>
          <div id="sidebar" className={getSidebarClasses()}>
            <Sidebar 
              categories={categories} 
              recentPosts={recentPosts}
              tags={tags}
            />
          </div>
        </div>
      </main>
      <Footer />
      <ThemeCustomizer />
    </div>
  );
};

export default Layout;
