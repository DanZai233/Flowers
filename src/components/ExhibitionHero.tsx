import React from 'react';
import { Sparkles, Calendar, BookOpen, Compass, ArrowRight } from 'lucide-react';
import { Flower } from '../types/flower';
import { BotanicalImage } from './BotanicalImage';

interface ExhibitionHeroProps {
  onExploreCatalog: () => void;
  onExploreCalendar: () => void;
  onSelectFeaturedFlower: (flowerId: string) => void;
  featuredFlowers: Flower[];
}

export const ExhibitionHero: React.FC<ExhibitionHeroProps> = ({
  onExploreCatalog,
  onExploreCalendar,
  onSelectFeaturedFlower,
  featuredFlowers,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-stone-200 bg-[#faf9f5]">
      {/* Visual Canvas Split Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 lg:pt-12 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Curatorial Header & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500 tracking-wider">
              <span>VOL. 2026 · FLORAL HERBARIUM & EXHIBITION</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-800">自然美学馆藏</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-sc font-semibold tracking-tight text-stone-900 text-balance leading-tight">
              芳华录 · 植物花卉数字展览馆
              <span className="block mt-2 font-serif-cormorant italic text-stone-600 font-normal text-2xl sm:text-3xl lg:text-4xl">
                The Poetics of Flowers & Curatorial Care Archive
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 font-serif-sc leading-relaxed max-w-2xl text-pretty">
              一花一世界，一叶一菩提。汇聚自然界瑰丽花卉，解构其<strong className="text-stone-900 font-medium">科属分类</strong>与<strong className="text-stone-900 font-medium">色彩光谱</strong>，
              探寻历代文人笔下的唯美花语与文化传奇；并为每一种植物配备详实严谨的光、温、水、土、修剪与四季种植提醒。
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreCatalog}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors shadow-xs"
              >
                <BookOpen className="w-4 h-4 text-amber-200" />
                <span>进入花卉图鉴展厅</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreCalendar}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-md transition-colors"
              >
                <Calendar className="w-4 h-4 text-amber-700" />
                <span>查阅节气种植年历</span>
              </button>
            </div>

            {/* Curatorial Highlights Row */}
            <div className="pt-4 border-t border-stone-200/80">
              <span className="text-xs uppercase tracking-wider font-mono text-stone-400 block mb-2.5">
                EXHIBITION CURATOR HIGHLIGHTS · 馆藏镇馆名品
              </span>
              <div className="flex flex-wrap gap-2">
                {featuredFlowers.map((flower) => (
                  <button
                    key={flower.id}
                    onClick={() => onSelectFeaturedFlower(flower.id)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-xs bg-white hover:bg-amber-50/60 border border-stone-200 rounded text-stone-800 transition-colors shadow-2xs"
                  >
                    <span 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: flower.colorHex }} 
                      aria-hidden="true" 
                    />
                    <span className="font-medium">{flower.name}</span>
                    <span className="text-stone-400 font-mono text-[11px] hidden sm:inline">
                      {flower.alias[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Specimen Exhibition Showcase Frame */}
          <div className="lg:col-span-5">
            <div className="relative group rounded-lg overflow-hidden border border-stone-300 shadow-md bg-stone-100 aspect-4/3">
              <BotanicalImage
                src="/src/assets/images/flower_exhibition_hero_1793783868911.jpg"
                alt="芳华录植物花卉展览温室大厅"
                flowerName="维多利亚玻璃暖房"
                containerClassName="w-full h-full relative overflow-hidden"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
                <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-amber-200 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>NATURAL GREENHOUSE ARCHIVE</span>
                </div>
                <h3 className="text-lg font-serif-sc font-medium text-white">
                  维多利亚玻璃暖房植物标本展
                </h3>
                <p className="text-xs text-stone-300 font-serif-sc line-clamp-2 mt-1">
                  采集自全球自然生境的珍奇花木，以科学的植物解剖与人文叙事，重新诠释生命的盛大与凋零。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Ribbon (Section 3 Pattern A) */}
        <div className="mt-10 py-3.5 px-5 bg-white border border-stone-200 rounded-md text-xs text-stone-600 flex flex-wrap items-center justify-between gap-4 shadow-2xs font-mono">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-stone-500" />
            <span className="font-sans font-medium text-stone-900">展览总览：</span>
            <span>32 种经典名花物种典藏</span>
            <span aria-hidden="true">·</span>
            <span>17 大核心植物科属</span>
            <span aria-hidden="true">·</span>
            <span>8 大色彩情绪解构</span>
          </div>
          <div className="flex items-center gap-3">
            <span>节令指南：365天全周期物候历</span>
            <span aria-hidden="true">·</span>
            <span>养护罗盘：光温水土修剪全案</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-700 font-sans font-medium">支持离线养护提醒</span>
          </div>
        </div>
      </div>
    </section>
  );
};
