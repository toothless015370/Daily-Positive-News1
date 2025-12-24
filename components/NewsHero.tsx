import React from 'react';
import { Link } from 'react-router-dom';
import { NewsArticle } from '../types';
import { formatDistanceToNow, subDays, isAfter } from 'date-fns';

interface NewsHeroProps {
  articles: NewsArticle[];
}

const NewsHero: React.FC<NewsHeroProps> = ({ articles }) => {
  if (articles.length === 0) return null;

  // 1. Identify the Main (Hero) Article
  const now = new Date();
  const sevenDaysAgo = subDays(now, 7);

  // Filter for articles from the last 7 days
  const recentArticles = articles.filter(a => isAfter(new Date(a.created_at), sevenDaysAgo));

  let mainArticle: NewsArticle;

  if (recentArticles.length > 0) {
    // Top viewed of the LAST 7 DAYS
    mainArticle = [...recentArticles].sort((a, b) => b.views - a.views)[0];
  } else {
    // Fallback: Top viewed of ALL TIME
    mainArticle = [...articles].sort((a, b) => b.views - a.views)[0];
  }

  // 2. Identify Side Articles (Latest articles excluding the main one)
  const sideArticles = [...articles]
    .filter(a => a.id !== mainArticle.id)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
      {/* Main Big Card */}
      <div className="lg:col-span-8 group relative overflow-hidden rounded-2xl bg-gray-900 aspect-video lg:aspect-auto">
        <img 
          src={`https://picsum.photos/seed/${mainArticle.id}/1200/800`} 
          alt={mainArticle.headline}
          className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 p-4 sm:p-6 lg:p-8 w-full">
          <Link to={`/news/${mainArticle.id}`}>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 hover:underline line-clamp-3 break-words">
              {mainArticle.headline}
            </h1>
          </Link>

          <div className="flex gap-2 mb-4 flex-wrap">
            {mainArticle.categories.slice(0, 3).map(cat => (
              <span key={cat} className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                {cat}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-gray-300 text-sm flex-wrap">
            <span className="font-medium text-blue-400">TRENDING</span>
            <span>•</span>
            <span>{mainArticle.countries}</span>
            <span>•</span>
            <span>{formatDistanceToNow(new Date(mainArticle.created_at))} ago</span>
            <span>•</span>
            <span>{mainArticle.views.toLocaleString()} views</span>
          </div>
        </div>
      </div>

      {/* Side Small Cards */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        {sideArticles.map(article => (
          <div key={article.id} className="flex gap-4 group">
            <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
              <img 
                src={`https://picsum.photos/seed/${article.id}/200/200`} 
                alt={article.headline}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-blue-600 text-[10px] font-bold uppercase mb-1">
                {article.categories[0]}
              </span>
              <Link to={`/news/${article.id}`}>
                <h3 className="text-gray-900 font-bold leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                  {article.headline}
                </h3>
              </Link>
              <p className="text-gray-500 text-xs mt-1">
                {formatDistanceToNow(new Date(article.created_at))} ago
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsHero;