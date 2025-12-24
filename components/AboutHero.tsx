import type React from "react"
import { useState, useEffect } from "react"
import { newsService } from "../services/api"

interface TrendingData {
  category: string;
  totalViews: number;
}

const AboutHero: React.FC = () => {
  const [trendingCategory, setTrendingCategory] = useState<TrendingData | null>(null);

  useEffect(() => {
    const fetchTrendingCategory = async () => {
      try {
        const articles = await newsService.getAllNews();
        
        // Calculate views per category
        const categoryViews: { [key: string]: number } = {};
        
        articles.forEach((article: any) => {
          article.categories?.forEach((cat: string) => {
            if (!categoryViews[cat]) {
              categoryViews[cat] = 0;
            }
            categoryViews[cat] += article.views;
          });
        });

        // Find the category with most views
        let maxCategory = '';
        let maxViews = 0;

        Object.entries(categoryViews).forEach(([category, views]) => {
          if (views > maxViews) {
            maxViews = views;
            maxCategory = category;
          }
        });

        if (maxCategory) {
          setTrendingCategory({
            category: maxCategory,
            totalViews: maxViews
          });
        }
      } catch (error) {
        console.error('Error fetching trending category:', error);
      }
    };

    fetchTrendingCategory();
  }, []);

  return (
    <div className="relative overflow-hidden bg-white pt-12 sm:pt-16 pb-8 sm:pb-12 border-b border-gray-100 mb-4">
      {/* Background Decorative Elements */}
      <div className="hidden md:block absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-10">
        <div className="aspect-square h-96 rounded-full bg-blue-600" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest mb-4 sm:mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            The Science of Optimism
          </div>

          {/* Heading & Image Section */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12 mb-8 sm:mb-10 lg:mb-12">
            <div className="lg:w-3/5">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9] text-balance">
                Extraordinary <span className="text-blue-600 italic">Breakthroughs</span>, <br />
                Delivered Daily.
              </h1>
            </div>

            {/* Image visible only on Desktop (lg and up) */}
            <div className="hidden lg:block lg:w-2/5">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-100 shadow-2xl">
                  <img
                    src="https://picsum.photos/seed/science-hero/800/600"
                    alt="Scientific breakthrough visualization"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mission Statement section based on Project Proposal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start">
            <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium leading-relaxed">
              Daily Positive (D+) is a global initiative dedicated to
              <span className="text-gray-900 font-bold"> capturing uplifting news </span>
              from every culture. We use intelligent AI to identify real-time trend news categories.
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              <div className="bg-gray-50 border border-gray-100 p-3 sm:p-4 rounded-2xl flex-1 min-w-[140px] sm:min-w-[160px]">
                <div className="text-xl sm:text-2xl font-black text-blue-600 mb-1">365</div>
                <div className="text-[10px] font-black uppercase tracking-wider text-gray-400">Days of Positivity</div>
              </div>
              
              <div className="bg-gray-50 border border-gray-100 p-3 sm:p-4 rounded-2xl flex-1 min-w-[140px] sm:min-w-[160px]">
                <div className="text-xl sm:text-2xl font-black text-blue-600 mb-1">Global</div>
                <div className="text-[10px] font-black uppercase tracking-wider text-gray-400">Network Tracking</div>
              </div>

              
              {/* Trending Category Box - Professional Tech Style */}
              <div className="relative flex-1 min-w-[140px] sm:min-w-[200px] group">
                {/* Glowing background effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                
                <div className="relative bg-white border border-blue-50 p-4 rounded-2xl h-full flex flex-col justify-between overflow-hidden">
                  {/* Top Row: Label and Live Icon */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-black uppercase tracking-[0.15em] text-blue-600/80 bg-blue-50 px-2 py-0.5 rounded-md">
                      Live Insights
                    </span>
                    <div className="flex gap-1">
                      <span className="w-1 h-3 bg-blue-200 rounded-full animate-[pulse_1s_ease-in-out_infinite]"></span>
                      <span className="w-1 h-3 bg-blue-400 rounded-full animate-[pulse_1.2s_ease-in-out_infinite]"></span>
                      <span className="w-1 h-3 bg-blue-600 rounded-full animate-[pulse_1.4s_ease-in-out_infinite]"></span>
                    </div>
                  </div>

                  {trendingCategory ? (
                    <>
                      <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">Trending category</div>
                        <div className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-none truncate">
                          {trendingCategory.category}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center gap-2">
                        <div className="flex -space-x-1">
                          <div className="w-4 h-4 rounded-full bg-blue-100 border border-white flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-ping"></div>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-blue-600/70">
                          {trendingCategory.totalViews.toLocaleString()} views
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-gray-100 animate-pulse rounded"></div>
                      <div className="h-6 w-full bg-gray-50 animate-pulse rounded"></div>
                    </div>
                  )}
                  
                  {/* Decorative Grid background */}
                  <div className="absolute bottom-0 right-0 opacity-[0.03] pointer-events-none">
                    <svg width="60" height="60" viewBox="0 0 60 60">
                      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                      </pattern>
                      <rect width="60" height="60" fill="url(#grid)" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutHero