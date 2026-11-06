import React, { useState } from 'react';
import { 
  X, Heart, Sparkles, Sun, Droplets, Thermometer, Shovel, 
  Scissors, ShieldAlert, ShieldCheck, Sprout, Bug, Calendar, 
  Share2, Check, BookmarkPlus, Eye, RotateCcw, Sliders
} from 'lucide-react';
import { Flower } from '../types/flower';
import { AESTHETIC_FILTERS, AestheticFilterId, AestheticFilter } from '../types/filter';
import { BotanicalImage } from './BotanicalImage';

interface FlowerDetailModalProps {
  flower: Flower | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onOpenStudio: (flower: Flower, filter?: AestheticFilter) => void;
  onAddCareReminder: (flower: Flower) => void;
}

export const FlowerDetailModal: React.FC<FlowerDetailModalProps> = ({
  flower,
  onClose,
  isSaved,
  onToggleSave,
  onOpenStudio,
  onAddCareReminder,
}) => {
  const [activeTab, setActiveTab] = useState<'lore' | 'care' | 'timeline'>('lore');
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedFilterId, setSelectedFilterId] = useState<AestheticFilterId>('natural');
  const [isComparingOriginal, setIsComparingOriginal] = useState(false);

  if (!flower) return null;

  const activeFilter: AestheticFilter = 
    AESTHETIC_FILTERS.find(f => f.id === selectedFilterId) || AESTHETIC_FILTERS[0];

  const effectiveFilter = isComparingOriginal ? 'none' : activeFilter.cssFilter;
  const effectiveOverlay = isComparingOriginal ? undefined : activeFilter.overlayClass;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-4xl sm:rounded-lg shadow-2xl border-0 sm:border border-stone-200 overflow-hidden flex flex-col h-full sm:h-auto max-h-screen sm:max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Title and Close Button */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-stone-200 bg-[#faf9f5] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <span
              className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
              style={{ backgroundColor: flower.colorHex }}
              aria-hidden="true"
            />
            <div className="min-w-0">
              <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-serif-sc font-bold text-stone-900 tracking-tight truncate">
                  {flower.name}
                </h2>
                <span className="text-[11px] sm:text-xs font-serif-cormorant italic text-stone-500 truncate">
                  {flower.latinName}
                </span>
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-stone-400 truncate">
                {flower.family} · 属：{flower.genus}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => onToggleSave(flower.id)}
              className={`p-2 rounded border transition-colors touch-manipulation min-w-[36px] min-h-[36px] flex items-center justify-center ${
                isSaved
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-stone-200 text-stone-600 hover:text-stone-900'
              }`}
              title={isSaved ? '从花园移除' : '收藏入花园'}
              aria-label="收藏花卉"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded border border-stone-200 bg-white text-stone-600 hover:text-stone-900 transition-colors touch-manipulation min-w-[36px] min-h-[36px] flex items-center justify-center"
              title="复制图鉴分享链接"
              aria-label="分享"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded border border-stone-200 bg-white text-stone-600 hover:text-stone-900 transition-colors touch-manipulation min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label="关闭"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6 flex-1">
          {/* Top Gallery Split Frame */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left Column: Image Specimen Photo + Aesthetic Filter Preview Controls */}
            <div className="md:col-span-5 flex flex-col space-y-3">
              <div className="rounded-lg overflow-hidden border border-stone-200 bg-stone-100 relative group aspect-4/3 md:aspect-auto md:min-h-[290px]">
                <BotanicalImage
                  src={flower.imageUrl}
                  alt={flower.name}
                  flowerName={flower.name}
                  colorHex={flower.colorHex}
                  cssFilter={effectiveFilter}
                  overlayClass={effectiveOverlay}
                  containerClassName="w-full h-full relative overflow-hidden"
                  className="w-full h-full object-cover"
                />

                {/* Bottom Specimen Label */}
                <div className="absolute bottom-2 left-2 right-2 p-2 bg-stone-900/80 backdrop-blur-xs rounded text-[11px] font-mono text-stone-300 flex items-center justify-between pointer-events-none">
                  <span>标本色彩：<strong className="text-white font-medium">{flower.colorName}</strong></span>
                  <span className="text-amber-200 text-[10px]">
                    {isComparingOriginal ? '原图对照' : activeFilter.name}
                  </span>
                </div>
              </div>

              {/* Aesthetic Filter Selector Strip (CSS Filters) */}
              <div className="p-3 bg-[#faf9f5] border border-stone-200 rounded-lg space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-mono text-stone-600 font-semibold text-[11px]">
                    <Sliders className="w-3.5 h-3.5 text-amber-700" />
                    <span>美学滤镜预览</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {selectedFilterId !== 'natural' && (
                      <button
                        onClick={() => setSelectedFilterId('natural')}
                        className="inline-flex items-center gap-1 text-[10px] text-stone-500 hover:text-stone-800 transition-colors"
                        title="恢复原生标本色彩"
                      >
                        <RotateCcw className="w-2.5 h-2.5" />
                        <span>重置</span>
                      </button>
                    )}

                    <button
                      onMouseDown={() => setIsComparingOriginal(true)}
                      onMouseUp={() => setIsComparingOriginal(false)}
                      onTouchStart={() => setIsComparingOriginal(true)}
                      onTouchEnd={() => setIsComparingOriginal(false)}
                      className={`px-2 py-0.5 text-[10px] font-mono rounded border transition-colors select-none ${
                        isComparingOriginal 
                          ? 'bg-stone-900 text-white border-stone-900' 
                          : 'bg-white border-stone-200 text-stone-600 hover:text-stone-900'
                      }`}
                      title="按住对比原图"
                    >
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>按住看原片</span>
                      </span>
                    </button>
                  </div>
                </div>

                {/* 6 Filter Buttons */}
                <div className="grid grid-cols-3 gap-1.5">
                  {AESTHETIC_FILTERS.map((filt) => {
                    const isSelected = selectedFilterId === filt.id;
                    return (
                      <button
                        key={filt.id}
                        onClick={() => setSelectedFilterId(filt.id)}
                        className={`px-2 py-1.5 text-left rounded border transition-all text-[11px] font-serif-sc flex items-center justify-between ${
                          isSelected
                            ? 'bg-stone-900 border-stone-900 text-white font-medium shadow-2xs'
                            : 'bg-white border-stone-200 hover:border-stone-300 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <span className="truncate">{filt.name}</span>
                        <span 
                          className="w-2 h-2 rounded-full shrink-0 ml-1" 
                          style={{ backgroundColor: filt.accentColor }} 
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Active Filter Mood Description */}
                <p className="text-[11px] text-stone-500 font-serif-sc italic leading-tight">
                  意境：{activeFilter.description}
                </p>
              </div>
            </div>

            {/* Right Column: Curatorial Identification Card */}
            <div className="md:col-span-7 bg-[#faf9f5] border border-stone-200 rounded-lg p-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="text-[11px] font-mono text-amber-800 tracking-wider uppercase mb-1">
                  BOTANICAL SPECIMEN DOSSIER · 馆藏标本档案
                </div>
                <h3 className="text-lg font-serif-sc font-medium text-stone-900">
                  {flower.name} · {flower.colorName}
                </h3>
                <p className="text-xs font-serif-sc text-stone-600 mt-1 italic">
                  “{flower.curatorNote}”
                </p>
              </div>

              {/* Taxonomy Key-Value Definition List */}
              <div className="grid grid-cols-2 gap-3 text-xs border-y border-stone-200/80 py-3 font-mono">
                <div>
                  <span className="text-stone-400 block text-[10px]">科属门类</span>
                  <span className="text-stone-800 font-medium">{flower.family}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">拉丁学名</span>
                  <span className="text-stone-800 font-serif-cormorant italic">{flower.latinName}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">古籍民间别称</span>
                  <span className="text-stone-800">{flower.alias.join('、')}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">自然花期</span>
                  <span className="text-stone-800">{flower.bloomPeriod}</span>
                </div>
              </div>

              {/* Quick Action Ribbon */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => onAddCareReminder(flower)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors"
                >
                  <BookmarkPlus className="w-3.5 h-3.5 text-amber-200" />
                  <span>加入我的养护计划与提醒</span>
                </button>

                <button
                  onClick={() => onOpenStudio(flower, activeFilter)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded transition-colors"
                  title="以此花与当前美学滤镜生成定制诗笺"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>以此滤镜制作诗笺</span>
                </button>
              </div>
            </div>
          </div>


          {/* Tab Navigation for Detailed Sections */}
          <div className="border-b border-stone-200 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium whitespace-nowrap min-w-max">
              <button
                onClick={() => setActiveTab('lore')}
                className={`pb-2.5 border-b-2 transition-colors touch-manipulation ${
                  activeTab === 'lore'
                    ? 'border-stone-900 text-stone-900 font-semibold'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                花语文化与古典意象
              </button>

              <button
                onClick={() => setActiveTab('care')}
                className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'care'
                    ? 'border-stone-900 text-stone-900 font-semibold'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                <span>360° 全要素养护指南</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              </button>

              <button
                onClick={() => setActiveTab('timeline')}
                className={`pb-2.5 border-b-2 transition-colors ${
                  activeTab === 'timeline'
                    ? 'border-stone-900 text-stone-900 font-semibold'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                物候时令与种植提醒
              </button>
            </div>
          </div>

          {/* Tab 1: Floriography & Lore */}
          {activeTab === 'lore' && (
            <div className="space-y-6">
              {/* Floriography Statement */}
              <div className="p-5 bg-amber-50/40 border border-amber-200/60 rounded-lg space-y-2">
                <span className="text-xs font-mono text-amber-800 tracking-wider uppercase">
                  FLORIOGRAPHY SUMMARY · 花语核心寓意
                </span>
                <p className="text-base font-serif-sc font-medium text-stone-900 leading-relaxed">
                  {flower.language.summary}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {flower.language.keywords.map((kw, idx) => (
                    <span 
                      key={idx}
                      className="text-xs text-stone-600 font-serif-sc"
                    >
                      #{kw} {idx < flower.language.keywords.length - 1 ? '·' : ''}
                    </span>
                  ))}
                </div>
              </div>

              {/* Classical Poetry */}
              <div className="p-5 bg-white border border-stone-200 rounded-lg space-y-2">
                <span className="text-xs font-mono text-stone-500 uppercase tracking-wider">
                  CLASSICAL POETRY CITATION · 历代名篇吟咏
                </span>
                <blockquote className="text-base font-serif-sc italic text-stone-800 border-l-2 border-stone-400 pl-4 py-1 leading-relaxed">
                  {flower.language.quotes}
                </blockquote>
              </div>

              {/* Cultural Lore & History */}
              <div className="space-y-2">
                <h4 className="text-sm font-serif-sc font-semibold text-stone-900">
                  文化流变与神话典故
                </h4>
                <p className="text-sm font-serif-sc text-stone-700 leading-relaxed">
                  {flower.language.lore}
                </p>
              </div>

              {/* Suitable Occasions */}
              <div className="space-y-2 pt-2 border-t border-stone-200">
                <span className="text-xs font-mono text-stone-500 uppercase">
                  SUITABLE OCCASIONS · 适宜赠礼与陈列场景：
                </span>
                <div className="flex flex-wrap gap-2">
                  {flower.language.suitableOccasions.map((occ, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs bg-stone-100 text-stone-700 rounded border border-stone-200"
                    >
                      {occ}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Detailed Care Guide */}
          {activeTab === 'care' && (
            <div className="space-y-6">
              {/* Pet Safety Alert Box */}
              <div className={`p-4 rounded-lg border flex items-start gap-3 ${
                flower.careGuide.petFriendly
                  ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50/50 border-rose-200 text-rose-900'
              }`}>
                {flower.careGuide.petFriendly ? (
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div className="text-xs space-y-0.5">
                  <div className="font-semibold text-sm">
                    {flower.careGuide.petFriendly ? '宠物安全友好植物（犬猫可放心共处）' : '宠物安全警示（含对猫狗有害成分）'}
                  </div>
                  <p className="opacity-90 leading-relaxed font-serif-sc">
                    {flower.careGuide.toxicityNote || '请避免宠物误食植物叶片、种球或浸泡植物的花瓶水源。'}
                  </p>
                </div>
              </div>

              {/* Core 4 Dimensions: Light, Water, Temp, Soil */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Sunlight */}
                <div className="p-4 bg-[#faf9f5] border border-stone-200 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-stone-900 font-semibold text-xs font-mono">
                    <Sun className="w-4 h-4 text-amber-600" />
                    <span>光照需求：{flower.careGuide.sunlight === 'full_sun' ? '全日照（强光）' : flower.careGuide.sunlight === 'partial_shade' ? '半阴散射光' : '耐阴喜凉'}</span>
                  </div>
                  <p className="text-xs text-stone-600 font-serif-sc leading-relaxed">
                    {flower.careGuide.sunlightText}
                  </p>
                </div>

                {/* Watering */}
                <div className="p-4 bg-[#faf9f5] border border-stone-200 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-stone-900 font-semibold text-xs font-mono">
                    <Droplets className="w-4 h-4 text-sky-600" />
                    <span>浇水法则：{flower.careGuide.watering === 'low' ? '耐旱控制浇水' : flower.careGuide.watering === 'moderate' ? '见干见湿' : '喜多水湿润'}</span>
                  </div>
                  <p className="text-xs text-stone-600 font-serif-sc leading-relaxed">
                    {flower.careGuide.wateringText}
                  </p>
                </div>

                {/* Temperature */}
                <div className="p-4 bg-[#faf9f5] border border-stone-200 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-stone-900 font-semibold text-xs font-mono">
                    <Thermometer className="w-4 h-4 text-rose-600" />
                    <span>适生温度与越冬防冻</span>
                  </div>
                  <p className="text-xs text-stone-600 font-serif-sc leading-relaxed">
                    {flower.careGuide.temperature}
                  </p>
                </div>

                {/* Soil */}
                <div className="p-4 bg-[#faf9f5] border border-stone-200 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-stone-900 font-semibold text-xs font-mono">
                    <Shovel className="w-4 h-4 text-stone-600" />
                    <span>土壤配比与透气酸碱度</span>
                  </div>
                  <p className="text-xs text-stone-600 font-serif-sc leading-relaxed">
                    {flower.careGuide.soil}
                  </p>
                </div>
              </div>

              {/* Advanced Operations: Pruning, Fertilizer, Pest, Propagation */}
              <div className="space-y-4 pt-2 border-t border-stone-200">
                <h4 className="text-sm font-serif-sc font-semibold text-stone-900">
                  专业园艺操作与病虫害防范
                </h4>

                <div className="space-y-3 text-xs font-serif-sc text-stone-700">
                  <div className="flex items-start gap-2.5 p-3 bg-stone-50 rounded border border-stone-200">
                    <Scissors className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-900 font-medium">修剪与促花要决：</strong>
                      <span className="leading-relaxed">{flower.careGuide.pruning}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 bg-stone-50 rounded border border-stone-200">
                    <Sprout className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-900 font-medium">施肥营养方案：</strong>
                      <span className="leading-relaxed">{flower.careGuide.fertilization}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 bg-stone-50 rounded border border-stone-200">
                    <Bug className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-900 font-medium">常见病虫害预警：</strong>
                      <span className="leading-relaxed">{flower.careGuide.pestsAndDiseases}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 bg-stone-50 rounded border border-stone-200">
                    <Sparkles className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-900 font-medium">繁育与繁殖途径：</strong>
                      <span className="leading-relaxed">{flower.careGuide.propagation}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Seasonal Timeline */}
          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-3 font-serif-sc">
                <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
                  <Calendar className="w-4 h-4 text-amber-800" />
                  <span>周年物候周期与关键节令</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-white rounded border border-stone-200 space-y-1">
                    <span className="text-[10px] font-mono text-stone-400 block">推荐种植 / 翻盆播种期</span>
                    <strong className="text-stone-900 text-sm">{flower.plantingTime}</strong>
                  </div>

                  <div className="p-3 bg-white rounded border border-stone-200 space-y-1">
                    <span className="text-[10px] font-mono text-stone-400 block">自然盛花花期</span>
                    <strong className="text-stone-900 text-sm">{flower.bloomPeriod}</strong>
                  </div>
                </div>
              </div>

              {/* 4 Seasons Care Compass for this Flower */}
              <div className="space-y-3">
                <h4 className="text-sm font-serif-sc font-semibold text-stone-900">
                  四季养护要点罗盘
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-emerald-50/50 border border-emerald-200/80 rounded space-y-1 font-serif-sc">
                    <span className="font-semibold text-emerald-900">春季 (萌芽/开花)</span>
                    <p className="text-emerald-800 text-[11px] leading-relaxed">
                      苏醒唤醒，补充高氮发芽肥，充足光照防倒春寒。
                    </p>
                  </div>

                  <div className="p-3 bg-amber-50/50 border border-amber-200/80 rounded space-y-1 font-serif-sc">
                    <span className="font-semibold text-amber-900">夏季 (度夏/防晒)</span>
                    <p className="text-amber-800 text-[11px] leading-relaxed">
                      晨昏浇水防积水烫根，喜阴品种遮阳50%，通风防红蜘蛛。
                    </p>
                  </div>

                  <div className="p-3 bg-orange-50/50 border border-orange-200/80 rounded space-y-1 font-serif-sc">
                    <span className="font-semibold text-orange-900">秋季 (壮球/秋剪)</span>
                    <p className="text-orange-800 text-[11px] leading-relaxed">
                      贴秋膘补充磷钾肥，及时剪除残花，秋植球根抓紧下地。
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50/50 border border-blue-200/80 rounded space-y-1 font-serif-sc">
                    <span className="font-semibold text-blue-900">冬季 (休眠/防冻)</span>
                    <p className="text-blue-800 text-[11px] leading-relaxed">
                      控水停肥，落叶灌木修剪定型，喜温盆栽及早搬入室内。
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-50/40 border border-amber-200 rounded-md flex items-center justify-between gap-4">
                <div className="text-xs text-amber-900 font-serif-sc">
                  <strong>想在合适的时间收到提醒？</strong>
                  <p className="text-[11px] text-amber-800/80 mt-0.5">
                    一键将《{flower.name}》的修剪、施肥、浇水备忘加入您的个人花园提醒日程。
                  </p>
                </div>
                <button
                  onClick={() => onAddCareReminder(flower)}
                  className="px-3.5 py-2 text-xs font-medium text-white bg-amber-800 hover:bg-amber-900 rounded shrink-0 transition-colors shadow-2xs"
                >
                  添加养护提醒
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="px-6 py-3 border-t border-stone-200 bg-[#faf9f5] flex items-center justify-between text-xs text-stone-500 font-mono shrink-0">
          <span>SPECIMEN ID: {flower.id.toUpperCase()}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs text-stone-700 hover:text-stone-900 border border-stone-300 rounded bg-white transition-colors"
          >
            返回图鉴
          </button>
        </div>
      </div>
    </div>
  );
};
