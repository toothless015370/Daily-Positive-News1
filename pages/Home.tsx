import React, { useState, useEffect, useMemo } from 'react';
import { newsService } from '../services/api';
import NewsHero from '../components/NewsHero';
import NewsCard from '../components/NewsCard';
import NewsFilters from '../components/NewsFilters';
import Footer from '../components/Footer';
import AboutHero from '../components/AboutHero';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // NEW: Date states
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await newsService.getAllNews();
        setArticles(data);
      } catch (err) {
        setError('Failed to load news. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set();
    articles.forEach(a => a.categories.forEach(c => cats.add(c)));
    return Array.from(cats);
  }, [articles]);

  const countries = useMemo(() => {
    const ctrs = new Set();
    articles.forEach(a => ctrs.add(a.countries));
    return Array.from(ctrs);
  }, [articles]);

  const filteredArticles = useMemo(() => {
    let result = [...articles];

    // Filter Category
    if (selectedCategory !== 'All') {
      result = result.filter(a => a.categories.includes(selectedCategory));
    }

    // Filter Country
    if (selectedCountry !== 'All') {
      result = result.filter(a => a.countries === selectedCountry);
    }

    // Filter Date Range
    if (fromDate) {
      result = result.filter(a => new Date(a.created_at) >= new Date(fromDate));
    }
    if (toDate) {
      const endOfToDay = new Date(toDate);
      endOfToDay.setHours(23, 59, 59, 999);
      result = result.filter(a => new Date(a.created_at) <= endOfToDay);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (sortBy === 'oldest') return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      if (sortBy === 'popular') return b.views - a.views;
      return 0;
    });

    return result;
  }, [articles, selectedCategory, selectedCountry, sortBy, fromDate, toDate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-500 font-medium">Fetching latest stories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-6 rounded-xl border border-red-200 text-center">
        <p className="font-bold mb-2">Error</p>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 bg-red-100 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors">
          Try Reloading
        </button>
      </div>
    );
  }

  return (
    <div>
      <AboutHero/>
      <NewsHero articles={articles} />
      
      <div className="flex items-baseline justify-between mb-4 mt-8">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Browse Feed</h2>
        <span className="text-sm text-gray-400 font-medium">{filteredArticles.length} articles found</span>
      </div>

      <NewsFilters 
        categories={categories}
        countries={countries}
        selectedCategory={selectedCategory}
        selectedCountry={selectedCountry}
        sortBy={sortBy}
        fromDate={fromDate}
        toDate={toDate}
        onCategoryChange={setSelectedCategory}
        onCountryChange={setSelectedCountry}
        onSortChange={setSortBy}
        onFromDateChange={setFromDate}
        onToDateChange={setToDate}
      />

      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArticles.map(article => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-2xl">
          <p className="text-gray-400 text-lg">No articles match your filters.</p>
          <button 
            onClick={() => { 
              setSelectedCategory('All'); 
              setSelectedCountry('All'); 
              setFromDate(''); 
              setToDate(''); 
            }}
            className="text-blue-600 font-bold mt-2 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default Home;