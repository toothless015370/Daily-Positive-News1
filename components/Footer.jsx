import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h3 className="text-xl font-black text-gray-900 tracking-tighter">
              DAILY<span className="text-blue-600">POSITIVE</span>
            </h3>
            <p className="text-gray-500 max-w-xs text-sm leading-relaxed">
              Your intelligent source for global breakthroughs, powered by AI categorization and real-time updates.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Platform</h4>
            <ul className="space-y-2 text-sm font-bold text-gray-600">
              <li><a href="/" className="hover:text-blue-600">Browse News</a></li>
              <li><a href="/admin" className="hover:text-blue-600">Admin Dashboard</a></li>
              {/*  <li><a href="#" className="hover:text-blue-600">API Documentation</a></li>   */}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Contact</h4>
            <ul className="space-y-2 text-sm font-bold text-gray-600">
              <li>support@daily.com</li>
              <li>Help Center</li>
              <div className="flex gap-4 mt-4 text-gray-400">
                <span className="hover:text-blue-600 cursor-pointer text-lg">𝕏</span>
                <span className="hover:text-blue-600 cursor-pointer text-lg">in</span>
              </div>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 font-medium">
            © {new Date().getFullYear()} Daily Positive AI. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-400 font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-gray-900">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
