import React from 'react';

const NewsFilters = ({
  categories,
  countries,
  selectedCategory,
  selectedCountry,
  sortBy,
  fromDate,
  toDate,
  onCategoryChange,
  onCountryChange,
  onSortChange,
  onFromDateChange,
  onToDateChange
}) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-wrap gap-4 items-end justify-between mb-8">
      <div className="flex flex-wrap gap-4 items-center">
        
        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Category</label>
          <select 
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none min-w-[150px] h-[40px]"
          >
            <option value="All">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Region */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Region</label>
          <select 
            value={selectedCountry}
            onChange={(e) => onCountryChange(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none min-w-[150px] h-[40px]"
          >
            <option value="All">All Countries</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        {/* From Date */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">From Date</label>
          <input 
            type="date"
            value={fromDate}
            onChange={(e) => onFromDateChange(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none h-[40px] text-gray-700"
          />
        </div>

        {/* To Date */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">To Date</label>
          <div className="relative">
            <input 
              type="date"
              value={toDate}
              onChange={(e) => onToDateChange(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none h-[40px] text-gray-700"
            />
            {/* Clear Button integrated into the 'To' field area or right next to it */}
            {(fromDate || toDate) && (
              <button 
                onClick={() => { onFromDateChange(''); onToDateChange(''); }}
                className="absolute -right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 font-bold"
                title="Clear Dates"
              >
                &times;
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sort By */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Sort By</label>
        <select 
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none h-[40px]"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>
    </div>
  );
};

export default NewsFilters;