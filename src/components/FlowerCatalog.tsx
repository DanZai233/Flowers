import React, { useState, useEffect } from 'react';
import { 
  Search, Heart, Sparkles, Sun, Droplets, ShieldAlert, ShieldCheck, 
  ArrowUpRight, X, ChevronDown, Layers, Loader2 
} from 'lucide-react';
import { Flower } from '../types/flower';
import { BotanicalImage } from './BotanicalImage';

interface FlowerCatalogProps {
  flowers: Flower[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectFlower: (flower: Flower) => void;
  onToggleSaveFlower: (flowerId: string) => void;
  savedFlowerIds: string[];
  onOpenStudioForFlower: (flower: Flower) => void;
  onResetFilters: () => void;
}

const INITIAL_PAGE_SIZE = 9;
const LOAD_MORE_STEP = 6;

export const FlowerCatalog: React.FC<FlowerCatalogProps> = ({
  flowers,
  searchQuery,
  onSearchChange,
  onSelectFlower,
  onToggleSaveFlower,
  savedFlowerIds,
  onOpenStudioForFlower,
  onResetFilters,
}) => {
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  // Reset pagination count when search query or filter count changes
  useEffect(() => {
    setVisibleCount(INITIAL_PAGE_SIZE);
  }, [searchQuery, flowers.length]);

  const visibleFlowers = flowers.slice(0, visibleCount);
  const hasMore = visibleCount < flowers.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Smooth micro-delay simulating museum catalog index paging
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + LOAD_MORE_STEP, flowers.length));
      setIsLoadingMore(false);
    }, 250);
  };

  const handleShowAll = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(flowers.length);
      setIsLoadingMore(false);
    }, 250);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar & Catalog Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search Input Box */}
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="搜索花名、学名、别名、科属、花语寓意..."
            className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-white border border-stone-200 rounded-md text-stone-900 placeholder-stone-400 focus:outline-hidden focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1.5 touch-manipulation"
              aria-label="清空搜索"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Count and sorting info */}
        <div className="flex items-center gap-3 text-xs text-stone-500 font-mono self-end sm:self-center">
          <span>
            已展出 <strong className="text-stone-800 font-semibold">{Math.min(visibleCount, flowers.length)}</strong> / 共 {flowers.length} 种经典名花
          </span>
        </div>
      </div>

      {/* Grid of Flowers */}
      {flowers.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleFlowers.map((flower, index) => {
              const isSaved = savedFlowerIds.includes(flower.id);

              return (
                <article
                  key={flower.id}
                  style={{ animationDelay: `${(index % 6) * 55}ms` }}
                  className="group bg-white border border-stone-200 rounded-lg overflow-hidden flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-xl hover:border-stone-300 hover:ring-1 hover:ring-stone-300/40 animate-fade-in-up"
                >
                  {/* Visual Thumbnail Area with Museum Skeleton & Hover Zoom */}
                  <div 
                    onClick={() => onSelectFlower(flower)}
                    className="relative aspect-4/3 bg-stone-100 overflow-hidden cursor-pointer"
                  >
                    <BotanicalImage
                      src={flower.imageUrl}
                      alt={flower.name}
                      flowerName={flower.name}
                      colorHex={flower.colorHex}
                      containerClassName="w-full h-full relative overflow-hidden"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                    />
                    
                    {/* Subtle Top Gradient for actions */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent opacity-80 group-hover:opacity-95 transition-opacity pointer-events-none" />

                    {/* Top Badges (clean unboxed icons) */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white text-xs z-20">
                      <div className="flex items-center gap-1.5 bg-stone-950/70 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-mono border border-white/10 shadow-2xs">
                        <span
                          className="w-2 h-2 rounded-full border border-white/40"
                          style={{ backgroundColor: flower.colorHex }}
                          aria-hidden="true"
                        />
                        <span>{flower.colorName}</span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSaveFlower(flower.id);
                        }}
                        className={`p-2 rounded-full backdrop-blur-xs transition-all duration-200 hover:scale-110 active:scale-95 ${
                          isSaved
                            ? 'bg-rose-50 text-rose-600 shadow-xs'
                            : 'bg-stone-900/60 text-white hover:bg-stone-900/90'
                        }`}
                        title={isSaved ? '从我的花园移除' : '收藏入我的花园'}
                      >
                        <Heart
                          className={`w-4 h-4 transition-transform ${isSaved ? 'fill-rose-500 text-rose-500 scale-105' : ''}`}
                        />
                      </button>
                    </div>

                    {/* Bottom overlay info inside image */}
                    <div className="absolute bottom-3 left-3 right-3 text-white z-10 transition-transform duration-300 group-hover:-translate-y-0.5">
                      <div className="text-[11px] font-mono text-stone-300 tracking-wider">
                        {flower.family}
                      </div>
                      <div className="flex items-baseline justify-between mt-0.5">
                        <h3 className="text-xl font-serif-sc font-medium text-white tracking-wide group-hover:text-amber-100 transition-colors">
                          {flower.name}
                        </h3>
                        <span className="text-xs font-serif-cormorant italic text-stone-200">
                          {flower.latinName}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5 sm:space-y-4">
                    {/* Floriography & Lore teaser */}
                    <div className="space-y-2">
                      {/* Zero-Pill Metadata */}
                      <div className="flex items-center gap-2 text-xs text-stone-500 font-serif-sc flex-wrap">
                        <span>花期：{flower.bloomPeriod.split('（')[0]}</span>
                        <span aria-hidden="true">·</span>
                        <span>别名：{flower.alias.slice(0, 2).join('、')}</span>
                      </div>

                      {/* Floriography summary */}
                      <div className="pt-1">
                        <div className="text-xs font-mono uppercase text-amber-800 tracking-wider font-semibold">
                          花语象征
                        </div>
                        <p className="text-sm font-serif-sc text-stone-800 mt-0.5 line-clamp-2 leading-relaxed">
                          {flower.language.summary}
                        </p>
                      </div>

                      {/* Poetic quote */}
                      <blockquote className="text-xs font-serif-sc italic text-stone-600 border-l border-stone-300 pl-2.5 py-0.5 bg-stone-50/60 rounded-r">
                        {flower.language.quotes}
                      </blockquote>
                    </div>

                    {/* Botanical Care Quick Summary */}
                    <div className="pt-3 border-t border-stone-100 text-xs text-stone-600 space-y-1.5 font-mono">
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <Sun className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span className="truncate">
                            {flower.careGuide.sunlight === 'full_sun' ? '喜强光全日照' : flower.careGuide.sunlight === 'partial_shade' ? '喜散射光半阴' : '耐阴喜凉处'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Droplets className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                          <span className="truncate">
                            {flower.careGuide.watering === 'low' ? '耐旱见干见湿' : flower.careGuide.watering === 'moderate' ? '干透浇透' : '喜多水常湿润'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-[11px]">
                        <span className="text-stone-500">
                          难度：
                          <span className={`font-medium ${
                            flower.careGuide.difficulty === 'easy' ? 'text-emerald-700' : flower.careGuide.difficulty === 'medium' ? 'text-amber-700' : 'text-rose-700'
                          }`}>
                            {flower.careGuide.difficulty === 'easy' ? '新手友好' : flower.careGuide.difficulty === 'medium' ? '进阶栽培' : '专家挑战'}
                          </span>
                        </span>

                        <div className="flex items-center gap-1">
                          {flower.careGuide.petFriendly ? (
                            <span className="inline-flex items-center gap-1 text-emerald-700">
                              <ShieldCheck className="w-3 h-3" />
                              <span>猫狗安全</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-stone-400">
                              <ShieldAlert className="w-3 h-3 text-amber-600" />
                              <span>宠物需防食</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Bottom Actions */}
                    <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between gap-2">
                      <button
                        onClick={() => onSelectFlower(flower)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-stone-900 hover:text-amber-800 transition-colors group-hover:translate-x-0.5 duration-200"
                      >
                        <span>全息标本与养护指南</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onOpenStudioForFlower(flower)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200/60 rounded transition-colors"
                        title="以此花生成定制花语明信片"
                      >
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        <span>作诗笺</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Load More & Progressive Reveal Controls */}
          {hasMore && (
            <div className="pt-4 flex flex-col items-center justify-center space-y-3">
              {/* Progress bar track */}
              <div className="w-48 bg-stone-200 rounded-full h-1 overflow-hidden">
                <div 
                  className="bg-stone-900 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${(visibleCount / flowers.length) * 100}%` }}
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full sm:w-auto px-4 sm:px-0">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-medium text-stone-900 bg-white hover:bg-stone-100 border border-stone-300 rounded-md transition-all shadow-2xs hover:shadow-xs active:scale-98 touch-manipulation"
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 text-amber-700 animate-spin" />
                      <span>正在展开更多标本...</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3.5 h-3.5 text-amber-700" />
                      <span>加载更多馆藏标本（+6）</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleShowAll}
                  disabled={isLoadingMore}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-md transition-colors touch-manipulation"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>展出全部标本 ({flowers.length})</span>
                </button>
              </div>

              <span className="text-[11px] font-mono text-stone-400">
                HERBARIUM ARCHIVE PROGRESSION · 馆藏渐进式全览
              </span>
            </div>
          )}
        </div>
      ) : (
        /* Empty Search / Filter State */
        <div className="p-12 text-center bg-white border border-dashed border-stone-300 rounded-lg space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-serif-sc font-medium text-stone-900">
            未找到与当前检索或筛选匹配的花卉
          </h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto font-serif-sc">
            您可以尝试缩减筛选条件，或使用花朵中文名（如“月季”、“绣球”）、科属（如“蔷薇科”、“兰科”）进行搜索。
          </p>
          <div className="pt-2">
            <button
              onClick={onResetFilters}
              className="px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors"
            >
              清空搜索与重置条件
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
