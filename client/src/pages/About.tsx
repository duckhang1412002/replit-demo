import React from "react";
import HeroSection from "@/components/HeroSection";
import Sidebar from "@/components/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

type User = {
  displayName: string;
  bio: string;
  avatarUrl: string;
};

const About: React.FC = () => {
  const { data: author, isLoading } = useQuery<User>({
    queryKey: ['/api/users/1'], // Just get the first user for demo
  });

  const { data: settings } = useQuery({
    queryKey: ['/api/settings'],
  });

  return (
    <div>
      <HeroSection 
        title="About Creator's Canvas" 
        description="Learn more about our platform and how we help content creators share their work with the world"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <Tabs defaultValue="about">
              <TabsList className="mb-8">
                <TabsTrigger value="about">About Us</TabsTrigger>
                <TabsTrigger value="mission">Our Mission</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="prose max-w-none">
                      <h2 className="text-2xl font-bold font-heading mb-4">Who We Are</h2>
                      <p>
                        Creator's Canvas was founded with a simple mission: to provide content creators with a beautiful, hassle-free platform to publish their work. We understand the challenges that bloggers, podcasters, and digital creators face when trying to share their content with the world.
                      </p>
                      <p>
                        Too often, creators find themselves spending more time wrestling with complicated website setups than actually creating content. We've eliminated that pain point by building a clean, intuitive platform that focuses on what truly matters – your content.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="prose max-w-none">
                      <h2 className="text-2xl font-bold font-heading mb-4">Our Story</h2>
                      <p>
                        Creator's Canvas began as a personal project by {author?.displayName || "our founder"}, who experienced firsthand the frustration of setting up a professional-looking platform for publishing content. After trying numerous existing solutions and finding them either too complex or too limiting, the idea for a simplified yet powerful publishing platform was born.
                      </p>
                      <p>
                        What started as a solution for personal use quickly evolved into a platform that now helps thousands of creators focus on their craft rather than technical details. Today, Creator's Canvas continues to evolve based on feedback from our community of passionate users.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                {isLoading ? (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <Skeleton className="h-32 w-32 rounded-full" />
                        <div className="space-y-3">
                          <Skeleton className="h-6 w-48" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : author ? (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <Avatar className="h-32 w-32">
                          <AvatarImage src={author.avatarUrl} alt={author.displayName} />
                          <AvatarFallback>{author.displayName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-bold mb-2">{author.displayName}</h3>
                          <p className="text-gray-600 italic mb-4">Founder & Content Strategist</p>
                          <p className="text-gray-700">
                            {author.bio || "A passionate advocate for content creators, helping them build sustainable online businesses through strategic content creation and distribution."}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : null}
              </TabsContent>
              
              <TabsContent value="mission" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="prose max-w-none">
                      <h2 className="text-2xl font-bold font-heading mb-4">Our Mission</h2>
                      <p>
                        At Creator's Canvas, our mission is to democratize content publishing by making it accessible to everyone, regardless of their technical expertise. We believe that great ideas deserve a beautiful platform, and that creators should spend their time creating, not configuring.
                      </p>
                      <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                        "We're building the platform we wished existed when we started our own content creation journey."
                      </blockquote>
                      <p>
                        We're driven by three core values:
                      </p>
                      <ul>
                        <li>
                          <strong>Simplicity First:</strong> We prioritize clean, intuitive design that gets out of your way.
                        </li>
                        <li>
                          <strong>Creator-Centric:</strong> Every feature we build serves the needs of content creators.
                        </li>
                        <li>
                          <strong>Continuous Evolution:</strong> We listen and adapt, constantly improving based on creator feedback.
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="prose max-w-none">
                      <h2 className="text-2xl font-bold font-heading mb-4">Our Vision</h2>
                      <p>
                        We envision a world where anyone with valuable knowledge, creative ideas, or important stories can share them professionally without technical barriers. Where content creators can focus entirely on crafting their message, not managing their platform.
                      </p>
                      <p>
                        Creator's Canvas aims to be the go-to solution for independant creators who value both simplicity and professional presentation. We're building more than just a publishing tool – we're creating an ecosystem that supports the entire creator journey.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="features" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="prose max-w-none">
                      <h2 className="text-2xl font-bold font-heading mb-4">Key Features</h2>
                      <p>
                        Creator's Canvas combines simplicity with powerful features designed specifically for content creators. Here's what makes our platform special:
                      </p>
                      
                      <h3 className="text-xl font-bold mt-6 mb-2">Content Publishing</h3>
                      <ul>
                        <li><strong>Versatile Formats:</strong> Publish articles, reviews, podcast episodes, and more with dedicated templates for each.</li>
                        <li><strong>Rich Media Support:</strong> Easily embed images, audio, video, and interactive elements.</li>
                        <li><strong>Categorization:</strong> Organize your content with categories and tags for easy discovery.</li>
                      </ul>
                      
                      <h3 className="text-xl font-bold mt-6 mb-2">Design & Customization</h3>
                      <ul>
                        <li><strong>Theme Customization:</strong> Adjust colors, fonts, and layouts without coding knowledge.</li>
                        <li><strong>Responsive Design:</strong> Your content looks perfect on every device, from phones to desktops.</li>
                        <li><strong>Custom Branding:</strong> Add your logo, favicon, and brand colors for a consistent identity.</li>
                      </ul>
                      
                      <h3 className="text-xl font-bold mt-6 mb-2">Growth Tools</h3>
                      <ul>
                        <li><strong>SEO Optimization:</strong> Built-in tools to help your content rank better in search results.</li>
                        <li><strong>Social Sharing:</strong> One-click sharing to popular social platforms.</li>
                        <li><strong>Email Newsletter:</strong> Grow your audience with integrated newsletter subscriptions.</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="prose max-w-none">
                      <h2 className="text-2xl font-bold font-heading mb-4">Technical Specifications</h2>
                      <ul>
                        <li><strong>Fast Loading:</strong> Optimized for speed with a focus on core web vitals.</li>
                        <li><strong>Mobile-First:</strong> Fully responsive design that works on all devices.</li>
                        <li><strong>Accessible:</strong> WCAG compliant, ensuring your content reaches everyone.</li>
                        <li><strong>Secure:</strong> Regular security updates and best practices built-in.</li>
                        <li><strong>Modern Stack:</strong> Built with React, Tailwind CSS, and modern web technologies.</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
