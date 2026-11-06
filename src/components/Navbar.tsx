import React from 'react';
import { 
  Flower as FlowerIcon, Calendar, Bookmark, Heart, Sparkles, 
  Search, Layers, BookOpen 
} from 'lucide-react';

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
    <>
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#faf9f5]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-18 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Brand title wordmark */}
          <div 
            onClick={() => setActiveTab('catalog')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-stone-900 text-stone-100 flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105">
              <FlowerIcon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif-sc text-lg sm:text-xl tracking-wider font-semibold text-stone-900 whitespace-nowrap">
                  芳华录
                </span>
                <span className="text-[10px] sm:text-xs font-serif-sc text-stone-500 hidden xs:inline">
                  植物标本馆
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-mono text-stone-400 whitespace-nowrap hidden sm:block">
                Botanical Exhibition & Care
              </span>
            </div>
          </div>

          {/* Zone 2: Desktop text navigation links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-stone-600">
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

          {/* Zone 3: Quick Search & Favorites actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onOpenQuickSearch}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-xs text-stone-700 bg-stone-100/90 hover:bg-stone-200/90 rounded-md border border-stone-200 transition-colors active:scale-95 touch-manipulation"
              title="搜索花卉、学名、花语"
              aria-label="搜索花卉"
            >
              <Search className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden sm:inline">图鉴检索</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white text-stone-500 border border-stone-200 rounded">
                /
              </kbd>
            </button>

            <button
              onClick={() => setActiveTab('garden')}
              className="px-2.5 py-1.5 sm:px-4 sm:py-2 text-xs font-medium text-stone-900 bg-white sm:bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-md transition-colors flex items-center gap-1 sm:gap-1.5 active:scale-95 touch-manipulation"
              title="我的收藏花卉"
            >
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
              <span className="text-xs">{savedCount}</span>
              <span className="hidden sm:inline">朵</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (iOS/Android native app aesthetic) */}
      <nav 
        aria-label="移动端底部导航"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#faf9f5]/96 backdrop-blur-md border-t border-stone-200/90 shadow-lg px-2 pt-1 pb-[calc(env(safe-area-inset-bottom,0px)+0.35rem)] flex items-center justify-around"
      >
        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex-1 flex flex-col items-center justify-center py-1 rounded-md transition-colors touch-manipulation min-h-[44px] ${
            activeTab === 'catalog'
              ? 'text-stone-950 font-semibold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <div className={`p-1 rounded-full transition-transform ${activeTab === 'catalog' ? 'scale-110 bg-stone-200/70' : ''}`}>
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-serif-sc mt-0.5 tracking-tight">展厅</span>
        </button>

        <button
          onClick={() => setActiveTab('matrix')}
          className={`flex-1 flex flex-col items-center justify-center py-1 rounded-md transition-colors touch-manipulation min-h-[44px] ${
            activeTab === 'matrix'
              ? 'text-stone-950 font-semibold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <div className={`p-1 rounded-full transition-transform ${activeTab === 'matrix' ? 'scale-110 bg-stone-200/70' : ''}`}>
            <Layers className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-serif-sc mt-0.5 tracking-tight">分类</span>
        </button>

        <button
          onClick={() => setActiveTab('calendar')}
          className={`flex-1 flex flex-col items-center justify-center py-1 rounded-md transition-colors touch-manipulation min-h-[44px] ${
            activeTab === 'calendar'
              ? 'text-stone-950 font-semibold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <div className={`p-1 rounded-full transition-transform ${activeTab === 'calendar' ? 'scale-110 bg-stone-200/70' : ''}`}>
            <Calendar className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-serif-sc mt-0.5 tracking-tight">年历</span>
        </button>

        <button
          onClick={() => setActiveTab('studio')}
          className={`flex-1 flex flex-col items-center justify-center py-1 rounded-md transition-colors touch-manipulation min-h-[44px] ${
            activeTab === 'studio'
              ? 'text-stone-950 font-semibold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <div className={`p-1 rounded-full transition-transform ${activeTab === 'studio' ? 'scale-110 bg-stone-200/70' : ''}`}>
            <Sparkles className="w-4 h-4 text-amber-700" />
          </div>
          <span className="text-[10px] font-serif-sc mt-0.5 tracking-tight">诗笺</span>
        </button>

        <button
          onClick={() => setActiveTab('garden')}
          className={`flex-1 flex flex-col items-center justify-center py-1 rounded-md transition-colors touch-manipulation min-h-[44px] relative ${
            activeTab === 'garden'
              ? 'text-stone-950 font-semibold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <div className={`p-1 rounded-full transition-transform relative ${activeTab === 'garden' ? 'scale-110 bg-stone-200/70' : ''}`}>
            <Bookmark className="w-4 h-4" />
            {reminderCount > 0 && (
              <span className="absolute -top-0.5 -right-1 w-2 h-2 bg-amber-600 rounded-full animate-pulse" />
            )}
          </div>
          <span className="text-[10px] font-serif-sc mt-0.5 tracking-tight">花园</span>
        </button>
      </nav>
    </>
  );
};
