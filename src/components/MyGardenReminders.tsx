import React, { useState } from 'react';
import { 
  CheckCircle2, Circle, Trash2, Plus, Calendar, Bell, 
  Droplets, Scissors, Sprout, Sun, Bug, Heart, 
  ExternalLink, Sparkles, Filter, X
} from 'lucide-react';
import { Flower, CareReminderItem } from '../types/flower';
import { BotanicalImage } from './BotanicalImage';

interface MyGardenRemindersProps {
  reminders: CareReminderItem[];
  onToggleCompleteReminder: (id: string) => void;
  onDeleteReminder: (id: string) => void;
  onAddCustomReminder: (item: Omit<CareReminderItem, 'id' | 'createdAt'>) => void;
  savedFlowers: Flower[];
  onSelectFlower: (flower: Flower) => void;
  onRemoveSavedFlower: (flowerId: string) => void;
  onNavigateToCatalog: () => void;
}

export const MyGardenReminders: React.FC<MyGardenRemindersProps> = ({
  reminders,
  onToggleCompleteReminder,
  onDeleteReminder,
  onAddCustomReminder,
  savedFlowers,
  onSelectFlower,
  onRemoveSavedFlower,
  onNavigateToCatalog,
}) => {
  const [filterState, setFilterState] = useState<'all' | 'pending' | 'completed'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [testNotificationFeedback, setTestNotificationFeedback] = useState<string | null>(null);

  // New Reminder Form State
  const [newTitle, setNewTitle] = useState('');
  const [newFlowerName, setNewFlowerName] = useState('');
  const [newTaskType, setNewTaskType] = useState<CareReminderItem['taskType']>('water');
  const [newDueDate, setNewDueDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [newNotes, setNewNotes] = useState('');

  const filteredReminders = reminders.filter((item) => {
    if (filterState === 'pending') return !item.completed;
    if (filterState === 'completed') return item.completed;
    return true;
  });

  const pendingCount = reminders.filter(r => !r.completed).length;

  const handleCreateReminderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddCustomReminder({
      flowerName: newFlowerName.trim() || '通用花园',
      title: newTitle.trim(),
      taskType: newTaskType,
      dueDate: newDueDate,
      completed: false,
      notes: newNotes.trim() || undefined,
    });

    setNewTitle('');
    setNewFlowerName('');
    setNewNotes('');
    setShowAddModal(false);
  };

  const handleTestBrowserNotification = () => {
    if (!('Notification' in window)) {
      setTestNotificationFeedback('当前浏览器环境不支持原生系统通知，但应用内提醒已就绪。');
      setTimeout(() => setTestNotificationFeedback(null), 4000);
      return;
    }

    if (Notification.permission === 'granted') {
      new Notification('芳华录 · 养护提醒', {
        body: '今天别忘了巡查您的爱花！检查盆土干湿度，适度通风。',
        icon: '/favicon.ico',
      });
      setTestNotificationFeedback('已成功触发养护测试通知！');
      setTimeout(() => setTestNotificationFeedback(null), 4000);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('芳华录 · 养护提醒开启', {
            body: '养护通知权限已开启，植物种植关键时令将在此提醒您。',
          });
          setTestNotificationFeedback('通知权限开启成功！');
        } else {
          setTestNotificationFeedback('已取消授权，您仍可在应用内随时查看日程。');
        }
        setTimeout(() => setTestNotificationFeedback(null), 4000);
      });
    } else {
      setTestNotificationFeedback('系统通知权限当前已被浏览器屏蔽，可在网页设置中解除阻止。');
      setTimeout(() => setTestNotificationFeedback(null), 4000);
    }
  };

  const getTaskIcon = (type: CareReminderItem['taskType']) => {
    switch (type) {
      case 'water': return <Droplets className="w-4 h-4 text-sky-600" />;
      case 'fertilize': return <Sprout className="w-4 h-4 text-emerald-600" />;
      case 'prune': return <Scissors className="w-4 h-4 text-amber-700" />;
      case 'sun': return <Sun className="w-4 h-4 text-amber-500" />;
      case 'plant': return <Calendar className="w-4 h-4 text-stone-600" />;
      case 'check': return <Bug className="w-4 h-4 text-rose-500" />;
      default: return <Bell className="w-4 h-4 text-stone-500" />;
    }
  };

  const getTaskTypeName = (type: CareReminderItem['taskType']) => {
    switch (type) {
      case 'water': return '浇水';
      case 'fertilize': return '施肥';
      case 'prune': return '修剪';
      case 'sun': return '光照';
      case 'plant': return '栽植';
      case 'check': return '巡检防虫';
      default: return '备忘';
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header Card */}
      <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-wider mb-1">
            <Bell className="w-4 h-4 text-amber-800" />
            <span>MY BOTANICAL GARDEN & CARE REMINDERS</span>
          </div>
          <h2 className="text-2xl font-serif-sc font-semibold text-stone-900">
            我的养护花园与时令待办
          </h2>
          <p className="text-xs text-stone-500 font-serif-sc mt-0.5">
            记录您家中植物的浇水、追肥、修剪日程，随时勾选完成状态，远离养护焦虑。
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5 text-amber-300" />
            <span>新建养护提醒</span>
          </button>

          <button
            onClick={handleTestBrowserNotification}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded transition-colors"
            title="测试系统通知推送"
          >
            <Bell className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden sm:inline">测试桌面提醒</span>
          </button>
        </div>
      </div>

      {/* Notification Feedback Toast */}
      {testNotificationFeedback && (
        <div className="p-3 bg-amber-50 border border-amber-300 rounded text-xs text-amber-900 font-serif-sc flex items-center justify-between animate-in fade-in">
          <span>{testNotificationFeedback}</span>
          <button onClick={() => setTestNotificationFeedback(null)}>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Section 1: Active Reminders Checklist */}
      <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-serif-sc font-semibold text-stone-900">
              养护备忘日程表
            </h3>
            <span className="text-xs font-mono text-stone-400">
              待办：{pendingCount} 项
            </span>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded text-xs">
            <button
              onClick={() => setFilterState('all')}
              className={`px-2.5 py-1 rounded transition-colors ${
                filterState === 'all'
                  ? 'bg-white text-stone-900 font-medium shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              全部 ({reminders.length})
            </button>
            <button
              onClick={() => setFilterState('pending')}
              className={`px-2.5 py-1 rounded transition-colors ${
                filterState === 'pending'
                  ? 'bg-white text-stone-900 font-medium shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              未完成 ({pendingCount})
            </button>
            <button
              onClick={() => setFilterState('completed')}
              className={`px-2.5 py-1 rounded transition-colors ${
                filterState === 'completed'
                  ? 'bg-white text-stone-900 font-medium shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              已打卡 ({reminders.length - pendingCount})
            </button>
          </div>
        </div>

        {/* Reminders List */}
        {filteredReminders.length > 0 ? (
          <div className="space-y-2.5">
            {filteredReminders.map((reminder) => (
              <div
                key={reminder.id}
                className={`p-3.5 rounded-md border transition-all flex items-start justify-between gap-3 ${
                  reminder.completed
                    ? 'bg-stone-50/70 border-stone-200 opacity-60'
                    : 'bg-[#faf9f5] border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => onToggleCompleteReminder(reminder.id)}
                    className="mt-0.5 text-stone-400 hover:text-stone-900 transition-colors"
                  >
                    {reminder.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-sm font-serif-sc font-medium ${
                        reminder.completed ? 'line-through text-stone-500' : 'text-stone-900'
                      }`}>
                        {reminder.title}
                      </span>

                      <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 bg-white border border-stone-200 rounded text-stone-600">
                        {getTaskIcon(reminder.taskType)}
                        <span>{getTaskTypeName(reminder.taskType)}</span>
                      </span>

                      <span className="text-[11px] font-mono text-amber-800">
                        {reminder.flowerName}
                      </span>
                    </div>

                    {reminder.notes && (
                      <p className="text-xs text-stone-500 font-serif-sc">
                        备忘：{reminder.notes}
                      </p>
                    )}

                    <div className="text-[10px] font-mono text-stone-400">
                      计划日期：{reminder.dueDate}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteReminder(reminder.id)}
                  className="text-stone-400 hover:text-rose-600 p-1.5 transition-colors"
                  title="删除此提醒"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-stone-50 border border-dashed border-stone-300 rounded-md space-y-2">
            <p className="text-sm font-serif-sc text-stone-600">
              {filterState === 'completed' ? '暂无已完成的养护任务' : '当前暂无待办养护提醒'}
            </p>
            <p className="text-xs text-stone-400 font-serif-sc">
              您可以前往“节令种植年历”一键导入本月推荐任务，或点击上方“新建养护提醒”。
            </p>
          </div>
        )}
      </div>

      {/* Section 2: Saved Flowers Showcase */}
      <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div>
            <h3 className="text-lg font-serif-sc font-semibold text-stone-900 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>我的植物藏馆 ({savedFlowers.length})</span>
            </h3>
            <p className="text-xs text-stone-500 font-serif-sc">
              点击花卉卡片可直接调取其完整养护档案
            </p>
          </div>

          <button
            onClick={onNavigateToCatalog}
            className="text-xs font-medium text-stone-800 hover:text-amber-800 flex items-center gap-1"
          >
            <span>去图鉴挑选更多</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {savedFlowers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {savedFlowers.map((flower) => (
              <div
                key={flower.id}
                className="group relative bg-[#faf9f5] border border-stone-200 rounded-md overflow-hidden hover:border-stone-400 transition-all cursor-pointer flex flex-col justify-between"
                onClick={() => onSelectFlower(flower)}
              >
                <div className="relative aspect-3/2 overflow-hidden bg-stone-100">
                  <BotanicalImage
                    src={flower.imageUrl}
                    alt={flower.name}
                    flowerName={flower.name}
                    colorHex={flower.colorHex}
                    containerClassName="w-full h-full relative overflow-hidden"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveSavedFlower(flower.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-stone-900/70 hover:bg-rose-700 text-white rounded-full transition-colors z-20"
                    title="移出藏馆"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>

                <div className="p-3 space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif-sc font-semibold text-stone-900 text-sm">
                      {flower.name}
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">
                      {flower.bloomPeriod.split('（')[0]}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 font-serif-sc truncate">
                    {flower.language.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-stone-50 border border-dashed border-stone-300 rounded-md space-y-2">
            <p className="text-sm font-serif-sc text-stone-600">
              您还没有收藏任何花卉标本
            </p>
            <p className="text-xs text-stone-400 font-serif-sc">
              在花卉图鉴展厅中点击爱心图标，即可收藏您钟爱的花卉，随时查看专属养护指南。
            </p>
            <div className="pt-2">
              <button
                onClick={onNavigateToCatalog}
                className="px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors"
              >
                浏览花卉图鉴
              </button>
            </div>
          </div>
        )}
      </div>

      {/* New Reminder Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div 
            className="bg-white w-full max-w-md rounded-lg shadow-xl border border-stone-200 p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="text-lg font-serif-sc font-semibold text-stone-900">
                新建植物养护提醒
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateReminderSubmit} className="space-y-4 text-xs font-serif-sc">
              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  提醒任务名称 *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="例如：给阳台月季剪残花并追施磷钾肥"
                  className="w-full px-3 py-2 border border-stone-300 rounded bg-stone-50 focus:bg-white focus:outline-hidden focus:border-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    植物名称
                  </label>
                  <input
                    type="text"
                    value={newFlowerName}
                    onChange={(e) => setNewFlowerName(e.target.value)}
                    placeholder="如：蝴蝶兰、大花绣球"
                    className="w-full px-3 py-2 border border-stone-300 rounded bg-stone-50 focus:bg-white focus:outline-hidden focus:border-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    任务类别
                  </label>
                  <select
                    value={newTaskType}
                    onChange={(e) => setNewTaskType(e.target.value as CareReminderItem['taskType'])}
                    className="w-full px-3 py-2 border border-stone-300 rounded bg-stone-50 focus:bg-white focus:outline-hidden focus:border-stone-900 font-mono"
                  >
                    <option value="water">浇水透盆</option>
                    <option value="fertilize">施肥追肥</option>
                    <option value="prune">修剪残花</option>
                    <option value="sun">晒太阳/遮阳</option>
                    <option value="plant">翻盆换土/播种</option>
                    <option value="check">巡视防虫防病</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  执行日期
                </label>
                <input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded bg-stone-50 focus:bg-white focus:outline-hidden focus:border-stone-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  养护注意事项备注
                </label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="如：水温需与室温一致，不可浇在花心上..."
                  className="w-full px-3 py-2 border border-stone-300 rounded bg-stone-50 focus:bg-white focus:outline-hidden focus:border-stone-900"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-stone-300 rounded text-stone-700 hover:bg-stone-100"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 text-white rounded hover:bg-stone-800"
                >
                  保存提醒
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
