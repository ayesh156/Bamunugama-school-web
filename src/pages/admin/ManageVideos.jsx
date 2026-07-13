import { useState } from 'react';
import { Video, Plus, Trash2, ExternalLink, Calendar, Search, AlertCircle, X, Film } from 'lucide-react';

const initialVideos = [
  {
    id: 1,
    title: 'Annual Concert Highlights',
    description: 'Best performances from the school concert',
    category: 'Events',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    addedAt: '2025-12-05',
  },
  {
    id: 2,
    title: 'Sports Day Recap',
    description: 'Highlights from the inter-house sports meet',
    category: 'Sports',
    link: 'https://www.youtube.com/watch?v=abc123def45',
    addedAt: '2025-11-28',
  },
  {
    id: 3,
    title: 'Science Fair Presentations',
    description: 'Student project demonstrations',
    category: 'Academics',
    link: 'https://www.youtube.com/watch?v=ghi789jkl01',
    addedAt: '2025-11-18',
  },
];

function extractVideoId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return url.trim();
}

export default function ManageVideos() {
  const [videos, setVideos] = useState(initialVideos);
  const [form, setForm] = useState({ title: '', description: '', category: 'Events', link: '' });
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.link.trim()) {
      showToast('Title and YouTube link are required.', 'error');
      return;
    }

    const newVideo = {
      id: Date.now(),
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      link: form.link.trim(),
      addedAt: new Date().toISOString().split('T')[0],
    };

    setVideos([newVideo, ...videos]);
    setForm({ title: '', description: '', category: 'Events', link: '' });
    setShowForm(false);
    showToast('Video added successfully!');
  };

  const handleDelete = (id) => {
    setVideos(videos.filter((v) => v.id !== id));
    setDeleteConfirm(null);
    showToast('Video deleted successfully.');
  };

  const filteredVideos = videos.filter(
    (v) =>
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase())
  );

  const getThumbnail = (link) => {
    const id = extractVideoId(link);
    if (id && id.length === 11) {
      return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
    }
    return null;
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl text-sm font-medium animate-slide-down ${
            toast.type === 'error'
              ? 'bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400'
              : 'bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400'
          }`}
        >
          {toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 shrink-0" />
          ) : (
            <Video className="w-5 h-5 shrink-0" />
          )}
          <span>{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 hover:opacity-70">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
            Manage Videos
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Add and manage YouTube video links for school events and activities.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium transition-all duration-200 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30"
        >
          <Plus className="w-5 h-5" />
          {showForm ? 'Cancel' : 'Add Video'}
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 animate-slide-down">
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Title *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Graduation Ceremony 2025"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Event Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              >
                <option value="Events">Events</option>
                <option value="Sports">Sports</option>
                <option value="Academics">Academics</option>
                <option value="General">General</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Description
              </label>
              <input
                type="text"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Brief description of the video content"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                YouTube Video Link *
              </label>
              <input
                type="url"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
              <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
                Supports youtube.com/watch?v=..., youtu.be/..., or youtube.com/embed/... formats
              </p>
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                Add to Videos
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search & Count */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing <span className="font-semibold text-slate-900 dark:text-white">{filteredVideos.length}</span> of{' '}
          <span className="font-semibold text-slate-900 dark:text-white">{videos.length}</span> videos
        </p>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search videos..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-sm"
          />
        </div>
      </div>

      {/* Videos Grid / Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Preview</th>
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Title</th>
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Category</th>
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Date Added</th>
                <th className="text-right px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredVideos.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Video className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                    <p className="text-slate-500 dark:text-slate-400 text-sm">No videos found</p>
                  </td>
                </tr>
              ) : (
                filteredVideos.map((video) => {
                  const thumbnail = getThumbnail(video.link);
                  return (
                    <tr key={video.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4">
                        {thumbnail ? (
                          <div className="relative w-20 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 group">
                            <img
                              src={thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                            <Film className="w-5 h-5 text-white drop-shadow-lg" />
                            </div>
                          </div>
                        ) : (
                          <div className="w-20 h-12 rounded-xl bg-gradient-to-br from-rose-100 to-primary-100 dark:from-rose-500/20 dark:to-primary-500/20 flex items-center justify-center">
                            <Video className="w-5 h-5 text-rose-500" />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{video.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{video.description}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300">
                          {video.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                          <Calendar className="w-4 h-4" />
                          {video.addedAt}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={video.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-rose-500 transition-all"
                            title="Open video"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          {deleteConfirm === video.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(video.id)}
                                className="px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-medium transition-colors"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-xs font-medium transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(video.id)}
                              className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-all"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}