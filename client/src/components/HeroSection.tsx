import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

type SiteSettings = {
  site_title: string;
  site_description: string;
};

interface HeroSectionProps {
  title?: string;
  description?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  title, 
  description 
}) => {
  const { data: settings } = useQuery<SiteSettings>({
    queryKey: ['/api/settings'],
  });

  const heroTitle = title || "Share Your Story with the World";
  const heroDescription = description || settings?.site_description || "A simple, elegant platform for content creators, bloggers, and podcasters to publish their work without the technical hassle";

  return (
    <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading leading-tight">
            {heroTitle}
          </h1>
          <p className="mt-4 text-xl text-primary-100 max-w-3xl mx-auto">
            {heroDescription}
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/articles">
              <a className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-gray-50 transition-colors duration-300">
                Create New Content
              </a>
            </Link>
            <Link href="/about">
              <a className="ml-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500 transition-colors duration-300">
                Learn More
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
