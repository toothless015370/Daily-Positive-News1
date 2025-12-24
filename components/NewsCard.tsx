
import React from 'react';
import { Link } from 'react-router-dom';
import { NewsArticle } from '../types';
import { format } from 'date-fns';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={`https://picsum.photos/seed/${article.id}/600/400`} 
          alt={article.headline}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-1">
          {article.categories.map(cat => (
            <span key={cat} className="bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
              {cat}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span className="font-semibold text-blue-600">{article.countries}</span>
          <span>•</span>
          <span>{format(new Date(article.created_at), 'MMM dd, yyyy')}</span>
        </div>
        
        <Link to={`/news/${article.id}`}>
          <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-snug hover:text-blue-600 transition-colors">
            {article.headline}
          </h2>
        </Link>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {article.body}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <span className="text-gray-400 text-xs font-medium">
            {article.views.toLocaleString()} views
          </span>
          <Link 
            to={`/news/${article.id}`} 
            className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all"
          >
            Read Full Story <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
