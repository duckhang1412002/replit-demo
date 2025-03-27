import React from "react";
import Layout from "../components/Layout";
import { Card, CardContent } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Facebook, Twitter, Instagram, Mail, Globe } from "lucide-react";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";

const About: React.FC = () => {
  return (
    <Layout>
      <Card>
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col items-center mb-8">
            <Avatar className="w-32 h-32 mb-4">
              <AvatarImage src="https://randomuser.me/api/portraits/women/65.jpg" alt="Emma Anderson" />
              <AvatarFallback>EA</AvatarFallback>
            </Avatar>
            <h1 className="text-3xl font-bold mb-2">Emma Anderson</h1>
            <p className="text-muted-foreground mb-4">Content Creator & Digital Strategist</p>
            <div className="flex space-x-3">
              <Button size="icon" variant="ghost" className="rounded-full text-[#3b5998] hover:text-[#3b5998]/80 hover:bg-[#3b5998]/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full text-[#1da1f2] hover:text-[#1da1f2]/80 hover:bg-[#1da1f2]/10">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full text-[#e4405f] hover:text-[#e4405f]/80 hover:bg-[#e4405f]/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full text-primary hover:text-primary/80 hover:bg-primary/10">
                <Mail className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full text-primary hover:text-primary/80 hover:bg-primary/10">
                <Globe className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <Separator className="mb-8" />

          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">About Me</h2>
            <div className="space-y-4 font-serif text-foreground/80">
              <p>
                Welcome to CreatorSpace! I'm Emma Anderson, a passionate content creator and digital strategist 
                with over 8 years of experience in the content marketing industry.
              </p>
              <p>
                I started this blog as a place to share insights, strategies, and lessons I've learned throughout 
                my journey as a content creator. My goal is to help other creators navigate the ever-changing 
                digital landscape and build sustainable online businesses.
              </p>
              <p>
                My expertise includes content strategy, social media marketing, SEO, audience building, and 
                content monetization. I've worked with brands of all sizes, from startups to Fortune 500 
                companies, helping them tell their stories and connect with their audiences in meaningful ways.
              </p>
              <p>
                When I'm not creating content or strategizing, you can find me hiking with my dog Max, exploring 
                local coffee shops, or getting lost in a good book. I believe in continuous learning and am currently 
                pursuing a certification in advanced digital analytics.
              </p>
              <p>
                I'm thrilled you're here, and I hope you find value in the resources, articles, and podcasts I share. 
                If you have any questions or just want to connect, don't hesitate to reach out through the contact form 
                or social media.
              </p>
            </div>

            <Separator className="my-8" />

            <h2 className="text-2xl font-bold mb-4">My Mission</h2>
            <p className="font-serif text-foreground/80 mb-8">
              To empower content creators with the knowledge, tools, and strategies they need to create 
              meaningful content, build engaged communities, and develop sustainable business models that 
              allow them to pursue their creative passions full-time.
            </p>

            <Separator className="my-8" />

            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="font-serif text-foreground/80 mb-4">
              Have a question or want to collaborate? Feel free to reach out! I'm always open to 
              new opportunities and connections.
            </p>
            <div className="flex items-center mb-2">
              <Mail className="h-5 w-5 mr-2 text-primary" />
              <span>hello@creatorspace.com</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default About;
