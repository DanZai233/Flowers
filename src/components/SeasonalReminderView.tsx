import React, { useState } from 'react';
import { 
  Calendar, AlertTriangle, Plus, Check, Sprout, ArrowRight,
  Sun, ShieldAlert, Sparkles, Clock
} from 'lucide-react';
import { SEASONAL_CALENDAR_DATA, MonthlyCarePlan } from '../data/seasonalCalendar';
import { Flower } from '../types/flower';

interface SeasonalReminderViewProps {
  onAddReminderFromPreset: (item: {
    title: string;
    flowerName: string;
    taskType: 'water' | 'fertilize' | 'prune' | 'sun' | 'plant' | 'check';
    notes: string;
  }) => void;
  onSelectFlowerByName: (flowerName: string) => void;
  allFlowers: Flower[];
}

export const SeasonalReminderView: React.FC<SeasonalReminderViewProps> = ({
  onAddReminderFromPreset,
  onSelectFlowerByName,
}) => {
  // Current month default: local time or default to 3 (Spring)
  const currentRealMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState<number>(currentRealMonth);
  const [addedPresetTitles, setAddedPresetTitles] = useState<string[]>([]);

  const currentPlan: MonthlyCarePlan = 
    SEASONAL_CALENDAR_DATA.find(p => p.month === selectedMonth) || SEASONAL_CALENDAR_DATA[2];

  const handleAddPreset = (preset: {
    title: string;
    flowerName: string;
    taskType: 'water' | 'fertilize' | 'prune' | 'sun' | 'plant' | 'check';
    notes: string;
  }) => {
    onAddReminderFromPreset(preset);
    setAddedPresetTitles(prev => [...prev, preset.title]);
  };

  const getSeasonBadgeColor = (season: string) => {
    switch (season) {
      case 'spring': return 'text-emerald-800 bg-emerald-50 border-emerald-200';
      case 'summer': return 'text-amber-800 bg-amber-50 border-amber-200';
      case 'autumn': return 'text-orange-800 bg-orange-50 border-orange-200';
      case 'winter': return 'text-sky-800 bg-sky-50 border-sky-200';
      default: return 'text-stone-800 bg-stone-50 border-stone-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-wider">
          <Calendar className="w-4 h-4 text-amber-800" />
          <span>SEASONAL PHENOLOGY & PLANTING CALENDAR</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-serif-sc font-semibold text-stone-900">
              二十四节气花卉种植与四季养护提醒
            </h2>
            <p className="text-sm font-serif-sc text-stone-600 mt-1 max-w-3xl">
              花开有时，草木有灵。依照大自然的物候时钟，掌握每个月份的适播适栽花种、修剪施肥黄金期与避坑警报，
              支持一键将节令农事任务导入个人养护日程。
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-stone-500 font-mono">当前物候：</span>
            <span className="px-3 py-1 text-xs font-serif-sc font-medium bg-amber-100/70 text-amber-900 border border-amber-300 rounded">
              本月 · {SEASONAL_CALENDAR_DATA.find(p => p.month === currentRealMonth)?.monthName}
            </span>
          </div>
        </div>

        {/* 12-Month Interactive Horizontal Selector Rail */}
        <div className="pt-4 border-t border-stone-200">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-1.5">
            {SEASONAL_CALENDAR_DATA.map((plan) => {
              const isSelected = selectedMonth === plan.month;
              const isCurrent = currentRealMonth === plan.month;

              return (
                <button
                  key={plan.month}
                  onClick={() => setSelectedMonth(plan.month)}
                  className={`p-2.5 rounded text-center transition-all border relative flex flex-col items-center justify-between min-h-[64px] ${
                    isSelected
                      ? 'bg-stone-900 border-stone-900 text-white shadow-xs'
                      : isCurrent
                      ? 'bg-amber-50/80 border-amber-300 text-stone-900 hover:bg-amber-100'
                      : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                  }`}
                >
                  {isCurrent && (
                    <span className="absolute -top-1.5 right-1 px-1 py-0.2 bg-amber-600 text-white text-[9px] font-mono rounded">
                      今
                    </span>
                  )}
                  <span className="text-xs font-bold font-mono">{plan.month}月</span>
                  <span className={`text-[10px] font-serif-sc truncate w-full ${
                    isSelected ? 'text-amber-200' : 'text-stone-500'
                  }`}>
                    {plan.lunarTerm.split('·')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Month Deep Care Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Month Overview & Core Tasks (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Month Banner */}
          <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-serif-sc font-bold text-stone-900">
                  {currentPlan.monthName}
                </span>
                <span className={`px-2.5 py-1 text-xs font-serif-sc font-medium rounded border ${getSeasonBadgeColor(currentPlan.season)}`}>
                  {currentPlan.season === 'spring' ? '春季生发' : currentPlan.season === 'summer' ? '盛夏繁花' : currentPlan.season === 'autumn' ? '金秋收获' : '寒冬蕴蓄'}
                </span>
              </div>
              <span className="text-xs font-mono text-stone-400">
                节气交接：{currentPlan.lunarTerm}
              </span>
            </div>

            <div className="p-3.5 bg-stone-50 border border-stone-200 rounded text-stone-800 font-serif-sc text-sm leading-relaxed">
              <strong className="text-stone-900 block mb-0.5">时令寄语：{currentPlan.headline}</strong>
              <p className="text-xs text-stone-600">{currentPlan.climateOverview}</p>
            </div>

            {/* Core Tasks of the Month */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-wider">
                <Sprout className="w-3.5 h-3.5 text-emerald-700" />
                <span>CORE MONTHLY GARDEN OPERATIONS · 本月核心养护行动：</span>
              </div>

              <div className="space-y-3">
                {currentPlan.coreTasks.map((task, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#faf9f5] border border-stone-200 rounded-md space-y-1.5 transition-colors hover:border-stone-300"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-serif-sc font-semibold text-stone-900">
                        {idx + 1}. {task.title}
                      </h4>
                      <span className="px-2 py-0.5 text-[10px] font-mono bg-white border border-stone-200 rounded text-stone-600">
                        {task.tag}
                      </span>
                    </div>
                    <p className="text-xs font-serif-sc text-stone-700 leading-relaxed">
                      {task.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Watch-Out Alert Box */}
            <div className="p-4 bg-amber-50/70 border border-amber-300 rounded-md flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs space-y-0.5">
                <div className="font-semibold text-amber-950 font-serif-sc">
                  【本月养护避坑警报】
                </div>
                <p className="text-amber-900/90 leading-relaxed font-serif-sc">
                  {currentPlan.watchOutAlert}
                </p>
              </div>
            </div>
          </div>

          {/* Recommended Flowers to Plant This Month */}
          <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif-sc font-semibold text-stone-900">
                  本月适播适栽花卉推荐
                </h3>
                <p className="text-xs text-stone-500 font-serif-sc">
                  顺应物候期，此时定植成活率高、生长迅速
                </p>
              </div>
              <span className="text-xs font-mono text-stone-400">
                RECOMMENDED SPECIES
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentPlan.recommendedFlowers.map((rec, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[#faf9f5] border border-stone-200 rounded-md flex flex-col justify-between space-y-2 hover:border-stone-300 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-serif-sc font-semibold text-stone-900 text-sm">
                        {rec.name}
                      </span>
                      <span className="text-[10px] font-mono text-stone-400">
                        {rec.type}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 font-serif-sc mt-1">
                      {rec.action}
                    </p>
                  </div>

                  <button
                    onClick={() => onSelectFlowerByName(rec.name)}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-800 hover:text-amber-800 pt-2 border-t border-stone-200/60"
                  >
                    <span>查阅此花完整档案</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: One-Click Preset Reminder Assistant (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-800 uppercase tracking-wider">
              <Clock className="w-4 h-4 text-amber-700" />
              <span>GARDEN REMINDER DISPATCH</span>
            </div>
            
            <h3 className="text-lg font-serif-sc font-semibold text-stone-900">
              一键添加本月种植备忘
            </h3>
            
            <p className="text-xs text-stone-600 font-serif-sc leading-relaxed">
              基于《{currentPlan.monthName}》节令规律制定的快捷养护提醒，点击即可同步至您的“我的养护花园”待办列表中。
            </p>

            <div className="space-y-3 pt-2">
              {currentPlan.suggestedPresetReminders.map((preset, idx) => {
                const isAdded = addedPresetTitles.includes(preset.title);

                return (
                  <div
                    key={idx}
                    className="p-3.5 bg-stone-50 border border-stone-200 rounded-md space-y-2 transition-all hover:border-stone-300"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="text-xs font-serif-sc font-medium text-stone-900 block">
                          {preset.title}
                        </span>
                        <span className="text-[10px] font-mono text-stone-400">
                          关联：{preset.flowerName}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAddPreset(preset)}
                        disabled={isAdded}
                        className={`p-1.5 rounded transition-colors shrink-0 ${
                          isAdded
                            ? 'bg-emerald-100 text-emerald-800 cursor-default'
                            : 'bg-stone-900 text-white hover:bg-stone-800 shadow-2xs'
                        }`}
                        title={isAdded ? '已加入提醒' : '加入养护待办'}
                      >
                        {isAdded ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Plus className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-stone-500 font-serif-sc leading-tight">
                      备注：{preset.notes}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Seasonal Gardening Philosophy Card */}
          <div className="p-5 bg-[#faf9f5] border border-stone-200 rounded-lg space-y-3 font-serif-sc text-xs text-stone-700">
            <div className="flex items-center gap-1.5 text-stone-900 font-semibold">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>古法二十四节气栽植智慧</span>
            </div>
            <p className="leading-relaxed text-stone-600">
              “春分栽花，秋分分根；夏至避日，大寒封园。”
              植物养护绝非机械重复，唯有与天时地利契合，方能四季见花，满园清芬。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
