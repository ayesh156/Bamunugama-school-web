import { useState, useEffect } from 'react';
import {
  Image,
  Video,
  Activity,
  ShieldCheck,
  TrendingUp,
  Clock,
  HardDrive,
  Users,
} from 'lucide-react';

const initialStats = {
  totalImages: 24,
  totalVideos: 18,
  systemUptime: '99.7%',
  storageUsed: '2.4 GB',
  activeUsers: 8,
  pendingItems: 3,
};

const recentActivity = [
  { id: 1, action: 'New image added', item: 'School Sports Day', time: '2 min ago', type: 'image' },
  { id: 2, action: 'Video uploaded', item: 'Annual Concert Highlights', time: '15 min ago', type: 'video' },
  { id: 3, action: 'Image deleted', item: 'Old Classroom Photo', time: '1 hr ago', type: 'delete' },
  { id: 4, action: 'Video link updated', item: 'Graduation Ceremony', time: '3 hr ago', type: 'video' },
  { id: 5, action: 'New image added', item: 'Library Renovation', time: '5 hr ago', type: 'image' },
];

const categoryDistribution = [
  { label: 'Events', count: 14, color: 'bg-primary-500' },
  { label: 'Sports', count: 10, color: 'bg-accent-500' },
  { label: 'Academics', count: 8, color: 'bg-gold-500' },
  { label: 'General', count: 10, color: 'bg-emerald-500' },
];

export default function Dashboard() {
  const [stats] = useState(initialStats);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const statCards = [
    { label: 'Total Images', value: stats.totalImages, icon: Image, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10' },
    { label: 'Total Videos', value: stats.totalVideos, icon: Video, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-500/10' },
    { label: 'System Status', value: stats.systemUptime, icon: Activity, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    { label: 'Storage Used', value: stats.storageUsed, icon: HardDrive, color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-500/10' },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
          {greeting}, Admin
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
          Here's what's happening with your school content today.
        </p>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="relative group bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {card.label}
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                  {card.value}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Stable</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts / Distribution + Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Distribution */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Content Distribution
          </h3>
          <div className="space-y-4">
            {categoryDistribution.map((cat) => (
              <div key={cat.label}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-slate-600 dark:text-slate-300">{cat.label}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{cat.count} items</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${cat.color} transition-all duration-500`}
                    style={{ width: `${(cat.count / 42) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Recent Activity
            </h3>
            <Clock className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-3">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <div className={`p-2 rounded-lg ${
                  item.type === 'image'
                    ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                    : item.type === 'video'
                    ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                    : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                }`}>
                  {item.type === 'image' ? <Image className="w-4 h-4" /> : item.type === 'video' ? <Video className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {item.action}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {item.item}
                  </p>
                </div>
                <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick System Health */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            System Health
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10">
            <Users className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            <div>
              <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{stats.activeUsers}</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">Active Admins</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-500/5 border border-amber-100 dark:border-amber-500/10">
            <Clock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            <div>
              <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">{stats.pendingItems}</p>
              <p className="text-xs text-amber-600 dark:text-amber-400">Pending Reviews</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/10">
            <Activity className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">Online</p>
              <p className="text-xs text-blue-600 dark:text-blue-400">System Status</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}