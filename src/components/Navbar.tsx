import React from 'react';
import { Flower as FlowerIcon, Calendar, Bookmark, Heart, Sparkles, Search } from 'lucide-react';

interface NavbarProps {
  activeTab: 'catalog' | 'matrix' | 'calendar' | 'studio' | 'garden';
  setActiveTab: (tab: 'catalog' | 'matrix' | 'calendar' | 'studio' | 'garden') => void;
  savedCount: number;
  reminderCount: number;
  onOpenQuickSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  reminderCount,
  onOpenQuickSearch,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#faf9f5]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title wordmark */}
        <div 
          onClick={() => setActiveTab('catalog')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-full bg-stone-900 text-stone-100 flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105">
            <FlowerIcon className="w-5 h-5 text-amber-200" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif-sc text-xl tracking-wider font-semibold text-stone-900 whitespace-nowrap">
              芳华录
            </span>
            <span className="text-[10px] tracking-widest uppercase font-mono text-stone-400 whitespace-nowrap">
              Botanical Exhibition & Care
            </span>
          </div>
        </div>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`whitespace-nowrap transition-colors pb-1 border-b-2 ${
              activeTab === 'catalog'
                ? 'text-stone-900 border-stone-900 font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            花卉展厅
          </button>

          <button
            onClick={() => setActiveTab('matrix')}
            className={`whitespace-nowrap transition-colors pb-1 border-b-2 ${
              activeTab === 'matrix'
                ? 'text-stone-900 border-stone-900 font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            科属色彩分类
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`whitespace-nowrap transition-colors pb-1 border-b-2 flex items-center gap-1.5 ${
              activeTab === 'calendar'
                ? 'text-stone-900 border-stone-900 font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Calendar className="w-4 h-4 text-stone-400" />
            <span>节令种植年历</span>
          </button>

          <button
            onClick={() => setActiveTab('studio')}
            className={`whitespace-nowrap transition-colors pb-1 border-b-2 flex items-center gap-1.5 ${
              activeTab === 'studio'
                ? 'text-stone-900 border-stone-900 font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>花语诗笺工坊</span>
          </button>

          <button
            onClick={() => setActiveTab('garden')}
            className={`whitespace-nowrap transition-colors pb-1 border-b-2 flex items-center gap-1.5 ${
              activeTab === 'garden'
                ? 'text-stone-900 border-stone-900 font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Bookmark className="w-4 h-4 text-stone-400" />
            <span>我的养护花园</span>
            {reminderCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-[10px] font-mono font-medium bg-amber-100 text-amber-800 rounded-sm">
                {reminderCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenQuickSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-stone-600 bg-stone-100/80 hover:bg-stone-200/80 rounded-md border border-stone-200 transition-colors whitespace-nowrap"
            title="搜索花卉、学名、花语"
          >
            <Search className="w-3.5 h-3.5 text-stone-500" />
            <span className="hidden sm:inline">在线图鉴检索</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white text-stone-500 border border-stone-200 rounded">
              /
            </kbd>
          </button>

          <button
            onClick={() => setActiveTab('garden')}
            className="px-4 py-2 text-xs font-medium text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-md transition-colors whitespace-nowrap hidden sm:flex items-center gap-1.5"
          >
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
            <span>藏花 ({savedCount})</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar row */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-200/60 py-2.5 px-3 bg-[#faf9f5] text-xs">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-2 py-1 rounded ${activeTab === 'catalog' ? 'font-semibold text-stone-900 bg-stone-200/60' : 'text-stone-600'}`}
        >
          图鉴
        </button>
        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-2 py-1 rounded ${activeTab === 'matrix' ? 'font-semibold text-stone-900 bg-stone-200/60' : 'text-stone-600'}`}
        >
          分类
        </button>
        <button
          onClick={() => setActiveTab('calendar')}
          className={`px-2 py-1 rounded ${activeTab === 'calendar' ? 'font-semibold text-stone-900 bg-stone-200/60' : 'text-stone-600'}`}
        >
          年历
        </button>
        <button
          onClick={() => setActiveTab('studio')}
          className={`px-2 py-1 rounded ${activeTab === 'studio' ? 'font-semibold text-stone-900 bg-stone-200/60' : 'text-stone-600'}`}
        >
          诗笺
        </button>
        <button
          onClick={() => setActiveTab('garden')}
          className={`px-2 py-1 rounded relative ${activeTab === 'garden' ? 'font-semibold text-stone-900 bg-stone-200/60' : 'text-stone-600'}`}
        >
          花园
          {reminderCount > 0 && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-600 rounded-full" />
          )}
        </button>
      </div>
    </header>
  );
};
