import React from 'react';
import { Flower, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: 'catalog' | 'matrix' | 'calendar' | 'studio' | 'garden') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="border-t border-stone-200 bg-[#faf9f5] mt-20 text-stone-600 text-xs font-serif-sc">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-stone-900 font-semibold text-base font-serif-sc">
              <Flower className="w-5 h-5 text-amber-700" />
              <span>芳华录</span>
            </div>
            <p className="text-stone-500 leading-relaxed text-xs">
              立足严谨植物学系统与东方诗性美学，呈现多维科属分类、天然色谱解构、详尽科学养护与四季物候种植提醒。
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <h4 className="font-semibold text-stone-900 text-xs font-mono uppercase tracking-wider">
              展览馆藏
            </h4>
            <ul className="space-y-1.5 text-stone-600">
              <li>
                <button onClick={() => onSelectTab('catalog')} className="hover:text-stone-900 transition-colors">
                  花卉图鉴总展厅
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('matrix')} className="hover:text-stone-900 transition-colors">
                  科属与色彩双维矩阵
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('calendar')} className="hover:text-stone-900 transition-colors">
                  二十四节气种植年历
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('studio')} className="hover:text-stone-900 transition-colors">
                  花语诗笺定制工坊
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Botanical Families Index */}
          <div className="space-y-2">
            <h4 className="font-semibold text-stone-900 text-xs font-mono uppercase tracking-wider">
              重点科属检索
            </h4>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-stone-600 text-[11px]">
              <span>蔷薇科 Rosaceae</span>
              <span>百合科 Liliaceae</span>
              <span>兰科 Orchidaceae</span>
              <span>绣球花科 Hydrangeaceae</span>
              <span>毛茛科 Ranunculaceae</span>
              <span>菊科 Asteraceae</span>
              <span>石蒜科 Amaryllidaceae</span>
              <span>木犀科 Oleaceae</span>
            </div>
          </div>

          {/* Col 4: Botanical Care Caution */}
          <div className="space-y-2">
            <h4 className="font-semibold text-stone-900 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>严谨园艺提醒</span>
            </h4>
            <p className="text-stone-500 text-[11px] leading-relaxed">
              部分花卉（如百合科、石蒜科）含有对猫犬具有潜在刺激或毒性的天然生物碱，养宠家庭请务必查阅标本详情中的“宠物安全”提示。
            </p>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 mt-8 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-400 text-[11px] font-mono">
          <div>
            © {new Date().getFullYear()} 芳华录 · 自然植物标本馆与花语养护指南
          </div>
          <div className="flex items-center gap-1">
            <span>用心培育，静待春风</span>
            <Heart className="w-3 h-3 text-rose-500 inline fill-rose-500/20" />
          </div>
        </div>
      </div>
    </footer>
  );
};
