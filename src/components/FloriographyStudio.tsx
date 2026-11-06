import React, { useState, useEffect } from 'react';
import { Sparkles, Copy, Check, Printer, Heart, Quote, RefreshCw, Sliders } from 'lucide-react';
import { Flower } from '../types/flower';
import { AESTHETIC_FILTERS, AestheticFilter, AestheticFilterId } from '../types/filter';
import { BotanicalImage } from './BotanicalImage';

interface FloriographyStudioProps {
  flowers: Flower[];
  initialFlower?: Flower | null;
  initialFilter?: AestheticFilter | null;
  onSelectFlowerDetail: (flower: Flower) => void;
}

const OCCASION_TEMPLATES: {
  id: string;
  label: string;
  salutation: string;
  defaultMessage: string;
}[] = [
  {
    id: 'love',
    label: '爱意告白',
    salutation: '致吾所爱：',
    defaultMessage: '世间草木万千，唯愿与你共度每一个晨昏。愿此花的纯真与炽热，如我心般恒久陪伴在你身旁。'
  },
  {
    id: 'friendship',
    label: '挚友相惜',
    salutation: '致知己好友：',
    defaultMessage: '浮云游子意，落日故人情。赠君一枝清幽，愿山高水长，初心不改，岁岁平安常喜乐。'
  },
  {
    id: 'gratitude',
    label: '恩情致谢',
    salutation: '敬致长辈/恩师：',
    defaultMessage: '春风化雨，润物无声。愿此花瓣凝结的芬芳，带去我最崇高的敬意与绵长康泰的诚挚祝愿。'
  },
  {
    id: 'healing',
    label: '抚慰治愈',
    salutation: '致亲爱的你：',
    defaultMessage: '寒冬纵然漫长，破土的种子终将拥抱暖阳。愿花朵的生机为你拂去疲惫，静候万物复苏。'
  },
  {
    id: 'congrats',
    label: '前程祝祷',
    salutation: '致奔赴山海的你：',
    defaultMessage: '长风破浪会有时，直挂云帆济沧海。愿你的梦想如夏花般灿烂绚丽，步履所向皆为锦绣坦途。'
  }
];

export const FloriographyStudio: React.FC<FloriographyStudioProps> = ({
  flowers,
  initialFlower,
  initialFilter,
  onSelectFlowerDetail,
}) => {
  const [selectedFlowerId, setSelectedFlowerId] = useState<string>(
    initialFlower?.id || (flowers.length > 0 ? flowers[0].id : '')
  );
  const [selectedFilterId, setSelectedFilterId] = useState<AestheticFilterId>(
    initialFilter?.id || 'natural'
  );
  const [selectedOccasionId, setSelectedOccasionId] = useState<string>('love');
  const [recipient, setRecipient] = useState<string>('心上人');
  const [customBody, setCustomBody] = useState<string>(OCCASION_TEMPLATES[0].defaultMessage);
  const [sender, setSender] = useState<string>('采花之人');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (initialFlower) {
      setSelectedFlowerId(initialFlower.id);
    }
  }, [initialFlower]);

  useEffect(() => {
    if (initialFilter) {
      setSelectedFilterId(initialFilter.id);
    }
  }, [initialFilter]);

  const selectedFlower = flowers.find(f => f.id === selectedFlowerId) || flowers[0];
  const activeFilter: AestheticFilter = 
    AESTHETIC_FILTERS.find(f => f.id === selectedFilterId) || AESTHETIC_FILTERS[0];

  const handleOccasionChange = (occId: string) => {
    setSelectedOccasionId(occId);
    const tmpl = OCCASION_TEMPLATES.find(o => o.id === occId);
    if (tmpl) {
      setCustomBody(tmpl.defaultMessage);
    }
  };

  const handleCopyText = () => {
    if (!selectedFlower) return;
    const fullText = `【${selectedFlower.name} · 花语诗笺（${activeFilter.name}）】\n\n致${recipient}：\n\n${customBody}\n\n《${selectedFlower.language.quotes}》\n花语象征：${selectedFlower.language.summary}\n\n—— ${sender} 敬赠`;
    navigator.clipboard?.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!selectedFlower) return null;

  return (
    <div className="space-y-8">
      {/* Studio Header */}
      <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-700" />
          <span>BOTANICAL FLORIOGRAPHY LETTERPRESS STUDIO</span>
        </div>
        <h2 className="text-2xl font-serif-sc font-semibold text-stone-900">
          花语诗笺工坊 · 以花寄意
        </h2>
        <p className="text-xs text-stone-500 font-serif-sc max-w-2xl">
          挑选一朵富有哲思的名花，调节美学光色滤镜，配以古典诗意与真挚文字，定制独一无二的植物美学明信片。
        </p>
      </div>

      {/* Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Customization Controls (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-lg p-4 sm:p-6 shadow-xs space-y-4 sm:space-y-5 text-xs font-serif-sc">
          <h3 className="text-base font-semibold text-stone-900 pb-2 border-b border-stone-200">
            定制选项
          </h3>

          {/* Flower Selector */}
          <div>
            <label className="block text-stone-700 font-medium mb-1.5">
              1. 挑选寄情花卉
            </label>
            <select
              value={selectedFlowerId}
              onChange={(e) => setSelectedFlowerId(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded bg-stone-50 text-stone-900 font-serif-sc focus:outline-hidden focus:border-stone-900"
            >
              {flowers.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.colorName} · {f.language.summary.split('、')[0]})
                </option>
              ))}
            </select>
          </div>

          {/* Aesthetic Filter Selector */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-stone-700 font-medium flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-700" />
                <span>2. 选择诗笺美学滤镜</span>
              </label>
              <span className="text-[10px] font-mono text-stone-400">
                当前：{activeFilter.name}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {AESTHETIC_FILTERS.map((filt) => {
                const isSelected = selectedFilterId === filt.id;
                return (
                  <button
                    key={filt.id}
                    onClick={() => setSelectedFilterId(filt.id)}
                    className={`px-2 py-1.5 rounded border text-center transition-all text-[11px] font-serif-sc flex items-center justify-between ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900 font-semibold shadow-2xs'
                        : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
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
          </div>

          {/* Occasion Template Selector */}
          <div>
            <label className="block text-stone-700 font-medium mb-1.5">
              3. 赠礼意图与情感基调
            </label>
            <div className="grid grid-cols-3 gap-2">
              {OCCASION_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => handleOccasionChange(tmpl.id)}
                  className={`p-2 rounded border text-center transition-colors ${
                    selectedOccasionId === tmpl.id
                      ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                      : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                  }`}
                >
                  {tmpl.label}
                </button>
              ))}
            </div>
          </div>

          {/* Recipient & Sender */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                收信人称谓
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="例如：知己、母亲、吾爱"
                className="w-full px-3 py-2 border border-stone-300 rounded bg-stone-50 focus:bg-white focus:outline-hidden focus:border-stone-900"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                寄信人署名
              </label>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="您的署名"
                className="w-full px-3 py-2 border border-stone-300 rounded bg-stone-50 focus:bg-white focus:outline-hidden focus:border-stone-900"
              />
            </div>
          </div>

          {/* Message Body */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-stone-700 font-medium">
                信笺正文正文
              </label>
              <button
                onClick={() => handleOccasionChange(selectedOccasionId)}
                className="text-[11px] text-amber-800 hover:text-amber-900 inline-flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>重置模板文字</span>
              </button>
            </div>
            <textarea
              rows={4}
              value={customBody}
              onChange={(e) => setCustomBody(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded bg-stone-50 focus:bg-white focus:outline-hidden focus:border-stone-900 leading-relaxed"
            />
          </div>

          {/* Operations Toolbar */}
          <div className="pt-2 border-t border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded text-stone-800 transition-colors touch-manipulation"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '已复制文字' : '复制诗笺全文'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded transition-colors touch-manipulation"
            >
              <Printer className="w-3.5 h-3.5 text-amber-300" />
              <span>打印或保存明信片</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Archival Letterpress Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#fbf9f5] border-2 border-stone-300 rounded-xl p-4 sm:p-8 md:p-10 shadow-lg relative overflow-hidden print:border-none print:shadow-none print:p-0">
            {/* Archival Decorative Hairline Corners */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-stone-400" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-stone-400" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-stone-400" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-stone-400" />

            {/* Letterpress Top Header */}
            <div className="flex items-center justify-between pb-6 border-b border-stone-300/80">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono tracking-widest uppercase text-stone-400 block">
                  HERBARIUM FLORIOGRAPHY POSTCARD · 芳华诗笺
                </span>
                <span className="font-serif-sc text-sm text-stone-700">
                  第 {selectedFlower.id.replace('flower-', '').toUpperCase()} 号典藏 · 调式：{activeFilter.name}
                </span>
              </div>

              {/* Botanical Color Seal */}
              <div className="flex items-center gap-2 px-2.5 py-1 bg-white border border-stone-300 rounded-full shadow-2xs">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: selectedFlower.colorHex }}
                />
                <span className="text-xs font-serif-sc text-stone-800">
                  {selectedFlower.colorName}
                </span>
              </div>
            </div>

            {/* Visual Specimen Portrait & Plant Title with Filter & Skeleton */}
            <div className="py-6 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-32 h-32 rounded-lg overflow-hidden border border-stone-300 shrink-0 bg-stone-100 shadow-2xs relative">
                <BotanicalImage
                  src={selectedFlower.imageUrl}
                  alt={selectedFlower.name}
                  flowerName={selectedFlower.name}
                  colorHex={selectedFlower.colorHex}
                  cssFilter={activeFilter.cssFilter}
                  overlayClass={activeFilter.overlayClass}
                  containerClassName="w-full h-full relative overflow-hidden"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-3xl font-serif-sc font-bold text-stone-900 tracking-wider">
                    {selectedFlower.name}
                  </h3>
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-stone-100 border border-stone-200 rounded text-stone-600">
                    {activeFilter.name}
                  </span>
                </div>
                <div className="text-xs font-serif-cormorant italic text-stone-500">
                  {selectedFlower.latinName}
                </div>
                <div className="text-xs font-mono text-amber-800 pt-1">
                  花语：{selectedFlower.language.summary}
                </div>
              </div>
            </div>

            {/* Main Letter Content Area */}
            <div className="py-6 border-y border-stone-300/80 space-y-4 font-serif-sc">
              <div className="text-base text-stone-900 font-medium">
                致 {recipient}：
              </div>

              <p className="text-sm sm:text-base text-stone-800 leading-loose indent-8 text-pretty">
                {customBody}
              </p>

              {/* Classical Poetry Quote Inset */}
              <div className="p-3.5 bg-white/70 border border-stone-200 rounded-md my-2">
                <div className="flex items-center gap-1.5 text-stone-400 text-xs mb-1">
                  <Quote className="w-3.5 h-3.5 text-amber-800" />
                  <span className="font-mono text-[10px] uppercase">CLASSICAL INSCRIPTION</span>
                </div>
                <blockquote className="text-xs sm:text-sm italic text-stone-700 leading-relaxed">
                  {selectedFlower.language.quotes}
                </blockquote>
              </div>

              <div className="pt-4 text-right">
                <span className="text-xs font-mono text-stone-400 block">
                  寄信人
                </span>
                <span className="text-base font-semibold text-stone-900">
                  {sender}
                </span>
              </div>
            </div>

            {/* Bottom Postal Postmark */}
            <div className="pt-6 flex items-center justify-between text-[11px] font-mono text-stone-400">
              <span>DATE: {new Date().toLocaleDateString('zh-CN')}</span>
              <span className="font-serif-sc text-stone-500">
                芳华录 · 植物花卉数字展览馆出品
              </span>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => onSelectFlowerDetail(selectedFlower)}
              className="text-xs text-stone-500 hover:text-stone-900 font-serif-sc underline underline-offset-4"
            >
              深入查阅《{selectedFlower.name}》的科学物种与养护全貌 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
