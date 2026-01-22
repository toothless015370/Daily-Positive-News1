import React, { useState, useEffect } from 'react';
import { newsService } from '../services/api';
import { NewsArticle } from '../types';
import { format } from 'date-fns';

const AdminDashboard: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentEdit, setCurrentEdit] = useState<NewsArticle | null>(null);
  
  // Updated Form State: Removed categories, added created_at
  const [formData, setFormData] = useState({
    headline: '',
    body: '',
    countries: '',
    created_at: new Date().toISOString().split('T')[0], // Default to today
  });

  const fetchAllNews = async () => {
    try {
      setLoading(true);
      const data = await newsService.getAllNews();
      setNews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllNews();
  }, []);

  const openCreateModal = () => {
    setCurrentEdit(null);
    setFormData({ 
      headline: '', 
      body: '', 
      countries: '', 
      created_at: new Date().toISOString().split('T')[0] 
    });
    setShowModal(true);
  };

  const openEditModal = (article: NewsArticle) => {
    setCurrentEdit(article);
    setFormData({
      headline: article.headline,
      body: article.body,
      countries: Array.isArray(article.countries) ? article.countries.join(', ') : article.countries,
      // Format existing date to YYYY-MM-DD for the date input
      created_at: new Date(article.created_at).toISOString().split('T')[0],
    });
    setShowModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Prepare payload (categories omitted so backend AI can fill it)
    const payload = {
      ...formData,
      countries: formData.countries.split(',').map(c => c.trim()).filter(c => c !== ""),
      created_at: new Date(formData.created_at).toISOString(),
      views: currentEdit ? currentEdit.views : 0,
    };

    try {
      if (currentEdit) {
        await newsService.updateNews(currentEdit.id, payload);
      } else {
        await newsService.createNews(payload);
      }
      setShowModal(false);
      fetchAllNews();
    } catch (err) {
      alert('Error saving article. Please try again.');
    } finally {
    setIsSaving(false); // Stop "Thinking" state
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await newsService.deleteNews(id);
      fetchAllNews();
    } catch (err) {
      alert('Error deleting article.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* ... Header remains same ... */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Manage your portal content</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
        >
          + Create New Article
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Headline</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Country</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Categories</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Views</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {news.map(article => (
                <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900 line-clamp-1">{article.headline}</div>
                    <div className="flex gap-1 mt-1">
                      {article.categories?.map(c => (
                        <span key={c} className="text-[10px] text-gray-400 font-medium">#{c}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{article.countries}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {format(new Date(article.created_at), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {article.categories?.map(c => (
                        <span key={c} className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase">
                          {c}
                        </span>
                      ))}
                      {(!article.categories || article.categories.length === 0) && (
                        <span className="text-gray-400 text-xs italic">Processing...</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{article.views}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openEditModal(article)} className="text-blue-600 hover:text-blue-800 font-bold text-sm mr-4">Edit</button>
                    <button onClick={() => handleDelete(article.id)} className="text-red-500 hover:text-red-700 font-bold text-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-black text-gray-900">{currentEdit ? 'Edit Article' : 'New Article'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Headline</label>
                <input 
                  type="text"
                  name="headline"
                  required
                  value={formData.headline}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Country</label>
                  <input 
                    type="text"
                    name="countries"
                    required
                    value={formData.countries}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                {/* NEW DATE INPUT FIELD */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Publish Date</label>
                  <input 
                    type="date"
                    name="created_at"
                    required
                    value={formData.created_at}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Body Content</label>
                <textarea 
                  name="body"
                  required
                  rows={8}
                  value={formData.body}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  disabled={isSaving}
                  onClick={() => setShowModal(false)} 
                  className="flex-1 px-6 py-3 rounded-xl border border-gray-200 font-bold hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className={`flex-1 px-6 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
                    isSaving 
                      ? 'bg-purple-600 text-white cursor-wait shadow-purple-200' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'
                  }`}
                >
                  {isSaving ? (
                    <>
                      {/* Simple Loading Spinner */}
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {currentEdit ? 'Updating...' : 'AI is generating categories...'}
                    </>
                  ) : (
                    currentEdit ? 'Update Article' : 'Publish Article'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
