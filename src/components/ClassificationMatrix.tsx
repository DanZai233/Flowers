import React, { useState } from 'react';
import { Palette, Layers, Check, Filter, RotateCcw } from 'lucide-react';
import { BotanicalFamily, ColorCategory, CareDifficulty, SunlightLevel, FlowerSeason } from '../types/flower';
import { BOTANICAL_FAMILIES, COLOR_CATEGORIES } from '../data/flowers';

interface ClassificationMatrixProps {
  selectedFamily: BotanicalFamily | 'all';
  onSelectFamily: (family: BotanicalFamily | 'all') => void;
  selectedColor: ColorCategory | 'all';
  onSelectColor: (color: ColorCategory | 'all') => void;
  selectedSeason: FlowerSeason | 'all';
  onSelectSeason: (season: FlowerSeason | 'all') => void;
  selectedDifficulty: CareDifficulty | 'all';
  onSelectDifficulty: (difficulty: CareDifficulty | 'all') => void;
  selectedSunlight: SunlightLevel | 'all';
  onSelectSunlight: (sunlight: SunlightLevel | 'all') => void;
  petFriendlyOnly: boolean;
  onTogglePetFriendly: (val: boolean) => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
}

export const ClassificationMatrix: React.FC<ClassificationMatrixProps> = ({
  selectedFamily,
  onSelectFamily,
  selectedColor,
  onSelectColor,
  selectedSeason,
  onSelectSeason,
  selectedDifficulty,
  onSelectDifficulty,
  selectedSunlight,
  onSelectSunlight,
  petFriendlyOnly,
  onTogglePetFriendly,
  onResetFilters,
  totalFilteredCount,
}) => {
  const [activeMatrixView, setActiveMatrixView] = useState<'family' | 'color'>('family');

  const hasActiveFilters = 
    selectedFamily !== 'all' || 
    selectedColor !== 'all' || 
    selectedSeason !== 'all' || 
    selectedDifficulty !== 'all' || 
    selectedSunlight !== 'all' || 
    petFriendlyOnly;

  return (
    <div className="bg-white border border-stone-200 rounded-lg p-5 sm:p-6 shadow-xs space-y-6">
      {/* Top Header of the Matrix */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-wider mb-1">
            <Filter className="w-3.5 h-3.5 text-stone-400" />
            <span>CLASSIFICATION & CURATION MATRIX</span>
          </div>
          <h2 className="text-xl font-serif-sc font-semibold text-stone-900">
            双维植物分类与筛选体系
          </h2>
          <p className="text-xs text-stone-500 font-serif-sc mt-0.5">
            从严谨的植物学科属系统，到感性的色彩光谱情绪，精准定位您心仪的花卉。
          </p>
        </div>

        {/* View Switcher: Family vs Color */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-md shrink-0">
          <button
            onClick={() => setActiveMatrixView('family')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors flex items-center gap-1.5 ${
              activeMatrixView === 'family'
                ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>按科属分类 ({BOTANICAL_FAMILIES.length})</span>
          </button>

          <button
            onClick={() => setActiveMatrixView('color')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors flex items-center gap-1.5 ${
              activeMatrixView === 'color'
                ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>按色彩分类 ({COLOR_CATEGORIES.length})</span>
          </button>
        </div>
      </div>

      {/* Main Dimension 1: Botanical Families View */}
      {activeMatrixView === 'family' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-stone-500">
              BOTANICAL FAMILY SELECTOR · 点击选择特定科属：
            </span>
            {selectedFamily !== 'all' && (
              <button
                onClick={() => onSelectFamily('all')}
                className="text-xs text-amber-700 hover:text-amber-800 font-medium"
              >
                清除科属选择 (显示全部)
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
            <button
              onClick={() => onSelectFamily('all')}
              className={`p-3 text-left rounded-md border transition-all ${
                selectedFamily === 'all'
                  ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                  : 'border-stone-200 bg-stone-50/60 hover:bg-stone-100/80 text-stone-800'
              }`}
            >
              <div className="text-xs font-semibold">全部科属</div>
              <div className={`text-[10px] mt-1 ${selectedFamily === 'all' ? 'text-stone-300' : 'text-stone-500'}`}>
                全馆典藏标本
              </div>
            </button>

            {BOTANICAL_FAMILIES.map((family) => {
              const isSelected = selectedFamily === family.id;
              return (
                <button
                  key={family.id}
                  onClick={() => onSelectFamily(isSelected ? 'all' : family.id)}
                  className={`p-2.5 text-left rounded-md border transition-all group ${
                    isSelected
                      ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                      : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/70 text-stone-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium font-serif-sc">{family.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-300 shrink-0" />}
                  </div>
                  <div className={`text-[10px] truncate mt-1 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                    {family.countDesc}
                  </div>
                </button>
              );
            })}
          </div>

          {selectedFamily !== 'all' && (
            <div className="mt-2 p-3 bg-stone-50 border border-stone-200 rounded text-xs text-stone-600 font-serif-sc">
              <strong className="text-stone-900 font-medium">
                {BOTANICAL_FAMILIES.find(f => f.id === selectedFamily)?.label}特点：
              </strong>{' '}
              {BOTANICAL_FAMILIES.find(f => f.id === selectedFamily)?.desc}
            </div>
          )}
        </div>
      )}

      {/* Main Dimension 2: Color Palette View */}
      {activeMatrixView === 'color' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-stone-500">
              COLOR SPECTRUM SELECTOR · 按视觉色谱与自然情绪探索：
            </span>
            {selectedColor !== 'all' && (
              <button
                onClick={() => onSelectColor('all')}
                className="text-xs text-amber-700 hover:text-amber-800 font-medium"
              >
                清除色彩选择 (显示全部)
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            <button
              onClick={() => onSelectColor('all')}
              className={`p-3 text-left rounded-md border transition-all ${
                selectedColor === 'all'
                  ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                  : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
              }`}
            >
              <div className="text-xs font-semibold">全部色彩</div>
              <div className={`text-[10px] mt-1 ${selectedColor === 'all' ? 'text-stone-300' : 'text-stone-500'}`}>
                天然五彩绚烂
              </div>
            </button>

            {COLOR_CATEGORIES.map((color) => {
              const isSelected = selectedColor === color.id;
              return (
                <button
                  key={color.id}
                  onClick={() => onSelectColor(isSelected ? 'all' : color.id)}
                  className={`p-2.5 text-left rounded-md border transition-all ${
                    isSelected
                      ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                      : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/70 text-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-xs font-medium font-serif-sc truncate">{color.label}</span>
                  </div>
                  <div className={`text-[10px] truncate mt-1 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                    {color.desc.split('、')[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {selectedColor !== 'all' && (
            <div className="mt-2 p-3 bg-stone-50 border border-stone-200 rounded text-xs text-stone-600 font-serif-sc">
              <strong className="text-stone-900 font-medium">
                {COLOR_CATEGORIES.find(c => c.id === selectedColor)?.label}之意境：
              </strong>{' '}
              {COLOR_CATEGORIES.find(c => c.id === selectedColor)?.desc}
            </div>
          )}
        </div>
      )}

      {/* Secondary Multi-Criteria Filter Bar */}
      <div className="pt-4 border-t border-stone-200/80 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="font-mono text-stone-500 uppercase">
            CARE CRITERIA FILTER · 养护条件筛选：
          </span>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-xs text-rose-700 hover:text-rose-800 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>重置全部筛选</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Season Filter */}
          <div className="flex items-center gap-2">
            <span className="text-stone-500 shrink-0">盛花季节:</span>
            <select
              value={selectedSeason}
              onChange={(e) => onSelectSeason(e.target.value as FlowerSeason | 'all')}
              className="w-full bg-stone-50 border border-stone-300 rounded px-2.5 py-1.5 text-stone-800 focus:outline-hidden focus:border-stone-900"
            >
              <option value="all">全部季节</option>
              <option value="spring">春季盛放 (3-5月)</option>
              <option value="summer">夏季盛放 (6-8月)</option>
              <option value="autumn">秋季盛放 (9-11月)</option>
              <option value="winter">冬季盛放 (12-2月)</option>
              <option value="all_year">四季长青 / 常年花期</option>
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-2">
            <span className="text-stone-500 shrink-0">养护难度:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => onSelectDifficulty(e.target.value as CareDifficulty | 'all')}
              className="w-full bg-stone-50 border border-stone-300 rounded px-2.5 py-1.5 text-stone-800 focus:outline-hidden focus:border-stone-900"
            >
              <option value="all">不限难度</option>
              <option value="easy">新手友好 (耐活易打理)</option>
              <option value="medium">进阶推荐 (稍加打理即开花)</option>
              <option value="expert">专家挑战 (需精密环境调控)</option>
            </select>
          </div>

          {/* Sunlight Level */}
          <div className="flex items-center gap-2">
            <span className="text-stone-500 shrink-0">光照需求:</span>
            <select
              value={selectedSunlight}
              onChange={(e) => onSelectSunlight(e.target.value as SunlightLevel | 'all')}
              className="w-full bg-stone-50 border border-stone-300 rounded px-2.5 py-1.5 text-stone-800 focus:outline-hidden focus:border-stone-900"
            >
              <option value="all">不限光照</option>
              <option value="full_sun">全日照 (喜强光耐晒)</option>
              <option value="partial_shade">半阴/散射光 (明亮不暴晒)</option>
              <option value="shade">耐阴喜凉 (室内暗处亦可)</option>
            </select>
          </div>

          {/* Pet Friendly Checkbox */}
          <div className="flex items-center">
            <label className="flex items-center gap-2 cursor-pointer select-none px-2 py-1.5 rounded hover:bg-stone-50">
              <input
                type="checkbox"
                checked={petFriendlyOnly}
                onChange={(e) => onTogglePetFriendly(e.target.checked)}
                className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-0"
              />
              <span className="text-stone-700 font-medium">仅查看宠物友好 (猫狗安全)</span>
            </label>
          </div>
        </div>

        {/* Current Matches Bar */}
        <div className="pt-2 flex items-center justify-between text-xs text-stone-500 font-mono">
          <span>MATCHED SPECIMENS: 当前共找到 {totalFilteredCount} 种符合条件的花卉标本</span>
          {hasActiveFilters && (
            <span className="text-amber-800">已激活个性化过滤</span>
          )}
        </div>
      </div>
    </div>
  );
};
