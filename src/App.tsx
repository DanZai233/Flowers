/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { ExhibitionHero } from './components/ExhibitionHero';
import { ClassificationMatrix } from './components/ClassificationMatrix';
import { FlowerCatalog } from './components/FlowerCatalog';
import { FlowerDetailModal } from './components/FlowerDetailModal';
import { SeasonalReminderView } from './components/SeasonalReminderView';
import { FloriographyStudio } from './components/FloriographyStudio';
import { MyGardenReminders } from './components/MyGardenReminders';
import { Footer } from './components/Footer';

import { FLOWERS_DATABASE } from './data/flowers';
import { Flower, BotanicalFamily, ColorCategory, FlowerSeason, CareDifficulty, SunlightLevel, CareReminderItem } from './types/flower';
import { AestheticFilter } from './types/filter';

const STORAGE_SAVED_KEY = 'fanghualu_saved_flowers';
const STORAGE_REMINDERS_KEY = 'fanghualu_reminders';

const DEFAULT_INITIAL_REMINDERS: CareReminderItem[] = [
  {
    id: 'rem-1',
    flowerName: '蝴蝶兰',
    title: '观察气生根水苔湿度并浸盆给水',
    taskType: 'water',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    completed: false,
    notes: '水苔发干且根系泛银白时方可微量补充温水',
    createdAt: new Date().toISOString()
  },
  {
    id: 'rem-2',
    flowerName: '大花绣球',
    title: '春季土壤调蓝剂（硫酸铝）稀释灌根',
    taskType: 'fertilize',
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    completed: false,
    notes: '萌芽期施用，促使花色呈现克莱因天青蓝',
    createdAt: new Date().toISOString()
  },
  {
    id: 'rem-3',
    flowerName: '月季',
    title: '剪除早春细弱盲枝与交叉内膛枝',
    taskType: 'prune',
    dueDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
    completed: true,
    notes: '保留向外饱满芽点，剪口涂抹愈合剂',
    createdAt: new Date().toISOString()
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'matrix' | 'calendar' | 'studio' | 'garden'>('catalog');

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFamily, setSelectedFamily] = useState<BotanicalFamily | 'all'>('all');
  const [selectedColor, setSelectedColor] = useState<ColorCategory | 'all'>('all');
  const [selectedSeason, setSelectedSeason] = useState<FlowerSeason | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<CareDifficulty | 'all'>('all');
  const [selectedSunlight, setSelectedSunlight] = useState<SunlightLevel | 'all'>('all');
  const [petFriendlyOnly, setPetFriendlyOnly] = useState<boolean>(false);

  // Modals & detail views
  const [selectedFlowerForDetail, setSelectedFlowerForDetail] = useState<Flower | null>(null);
  const [flowerForStudio, setFlowerForStudio] = useState<Flower | null>(null);
  const [filterForStudio, setFilterForStudio] = useState<AestheticFilter | null>(null);

  // Persistence: Saved flowers (favorites)
  const [savedFlowerIds, setSavedFlowerIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_SAVED_KEY);
      return stored ? JSON.parse(stored) : ['flower-rose', 'flower-orchid-moth', 'flower-hydrangea'];
    } catch {
      return ['flower-rose', 'flower-orchid-moth', 'flower-hydrangea'];
    }
  });

  // Persistence: Care Reminders
  const [reminders, setReminders] = useState<CareReminderItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_REMINDERS_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_INITIAL_REMINDERS;
    } catch {
      return DEFAULT_INITIAL_REMINDERS;
    }
  });

  // Save to localStorage when changed
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SAVED_KEY, JSON.stringify(savedFlowerIds));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }, [savedFlowerIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_REMINDERS_KEY, JSON.stringify(reminders));
    } catch (e) {
      console.warn('Failed to save reminders to localStorage', e);
    }
  }, [reminders]);

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && (e.target as HTMLElement)?.tagName !== 'INPUT' && (e.target as HTMLElement)?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setActiveTab('catalog');
        const input = document.querySelector('input[type="text"]') as HTMLInputElement;
        input?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered flowers calculation
  const filteredFlowers = useMemo(() => {
    return FLOWERS_DATABASE.filter((flower) => {
      // 1. Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchesName = flower.name.toLowerCase().includes(query);
        const matchesLatin = flower.latinName.toLowerCase().includes(query);
        const matchesAlias = flower.alias.some(a => a.toLowerCase().includes(query));
        const matchesFamily = flower.family.toLowerCase().includes(query);
        const matchesGenus = flower.genus.toLowerCase().includes(query);
        const matchesLore = flower.language.summary.toLowerCase().includes(query) ||
          flower.language.keywords.some(k => k.toLowerCase().includes(query)) ||
          flower.language.quotes.toLowerCase().includes(query);

        if (!matchesName && !matchesLatin && !matchesAlias && !matchesFamily && !matchesGenus && !matchesLore) {
          return false;
        }
      }

      // 2. Botanical Family filter
      if (selectedFamily !== 'all' && flower.family !== selectedFamily) {
        return false;
      }

      // 3. Color category filter
      if (selectedColor !== 'all' && !flower.colors.includes(selectedColor)) {
        return false;
      }

      // 4. Season filter
      if (selectedSeason !== 'all' && flower.season !== selectedSeason && flower.season !== 'all_year') {
        return false;
      }

      // 5. Difficulty filter
      if (selectedDifficulty !== 'all' && flower.careGuide.difficulty !== selectedDifficulty) {
        return false;
      }

      // 6. Sunlight filter
      if (selectedSunlight !== 'all' && flower.careGuide.sunlight !== selectedSunlight) {
        return false;
      }

      // 7. Pet friendly filter
      if (petFriendlyOnly && !flower.careGuide.petFriendly) {
        return false;
      }

      return true;
    });
  }, [
    searchQuery,
    selectedFamily,
    selectedColor,
    selectedSeason,
    selectedDifficulty,
    selectedSunlight,
    petFriendlyOnly,
  ]);

  // Featured flowers for Hero
  const featuredFlowers = useMemo(() => {
    return FLOWERS_DATABASE.filter(f => f.featured);
  }, []);

  // Saved flower objects
  const savedFlowers = useMemo(() => {
    return FLOWERS_DATABASE.filter(f => savedFlowerIds.includes(f.id));
  }, [savedFlowerIds]);

  const handleToggleSaveFlower = (flowerId: string) => {
    setSavedFlowerIds(prev => 
      prev.includes(flowerId) ? prev.filter(id => id !== flowerId) : [...prev, flowerId]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedFamily('all');
    setSelectedColor('all');
    setSelectedSeason('all');
    setSelectedDifficulty('all');
    setSelectedSunlight('all');
    setPetFriendlyOnly(false);
  };

  // Reminder handlers
  const handleToggleCompleteReminder = (id: string) => {
    setReminders(prev =>
      prev.map(r => (r.id === id ? { ...r, completed: !r.completed } : r))
    );
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const handleAddCustomReminder = (item: Omit<CareReminderItem, 'id' | 'createdAt'>) => {
    const newReminder: CareReminderItem = {
      ...item,
      id: `rem-custom-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setReminders(prev => [newReminder, ...prev]);
  };

  const handleAddReminderFromPreset = (preset: {
    title: string;
    flowerName: string;
    taskType: CareReminderItem['taskType'];
    notes: string;
  }) => {
    const newReminder: CareReminderItem = {
      id: `rem-preset-${Date.now()}`,
      title: preset.title,
      flowerName: preset.flowerName,
      taskType: preset.taskType,
      dueDate: new Date().toISOString().split('T')[0],
      completed: false,
      notes: preset.notes,
      createdAt: new Date().toISOString()
    };
    setReminders(prev => [newReminder, ...prev]);
  };

  const handleAddCareReminderForFlower = (flower: Flower) => {
    const newReminder: CareReminderItem = {
      id: `rem-flower-${Date.now()}`,
      title: `《${flower.name}》花期巡查与水肥调控`,
      flowerName: flower.name,
      flowerId: flower.id,
      taskType: flower.careGuide.watering === 'low' ? 'water' : 'fertilize',
      dueDate: new Date().toISOString().split('T')[0],
      completed: false,
      notes: `${flower.careGuide.wateringText} ${flower.careGuide.sunlightText}`,
      createdAt: new Date().toISOString()
    };
    setReminders(prev => [newReminder, ...prev]);
    setSelectedFlowerForDetail(null);
    setActiveTab('garden');
  };

  const handleOpenStudioForFlower = (flower: Flower, filter?: AestheticFilter) => {
    setFlowerForStudio(flower);
    if (filter) {
      setFilterForStudio(filter);
    }
    setSelectedFlowerForDetail(null);
    setActiveTab('studio');
  };

  const handleSelectFeaturedFlower = (flowerId: string) => {
    const target = FLOWERS_DATABASE.find(f => f.id === flowerId);
    if (target) {
      setSelectedFlowerForDetail(target);
    }
  };

  const handleSelectFlowerByName = (flowerName: string) => {
    const found = FLOWERS_DATABASE.find(f => f.name.includes(flowerName) || flowerName.includes(f.name));
    if (found) {
      setSelectedFlowerForDetail(found);
    } else {
      setSearchQuery(flowerName);
      setActiveTab('catalog');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] flex flex-col text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedFlowerIds.length}
        reminderCount={reminders.filter(r => !r.completed).length}
        onOpenQuickSearch={() => {
          setActiveTab('catalog');
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Curatorial Hero is shown on catalog & matrix views */}
        {(activeTab === 'catalog' || activeTab === 'matrix') && (
          <ExhibitionHero
            onExploreCatalog={() => {
              setActiveTab('catalog');
              const el = document.getElementById('catalog-content-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            onExploreCalendar={() => setActiveTab('calendar')}
            onSelectFeaturedFlower={handleSelectFeaturedFlower}
            featuredFlowers={featuredFlowers}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="catalog-content-section">
          {/* TAB 1: Main Catalog View */}
          {activeTab === 'catalog' && (
            <div className="space-y-8">
              {/* Dual-Axis Matrix Filter */}
              <ClassificationMatrix
                selectedFamily={selectedFamily}
                onSelectFamily={setSelectedFamily}
                selectedColor={selectedColor}
                onSelectColor={setSelectedColor}
                selectedSeason={selectedSeason}
                onSelectSeason={setSelectedSeason}
                selectedDifficulty={selectedDifficulty}
                onSelectDifficulty={setSelectedDifficulty}
                selectedSunlight={selectedSunlight}
                onSelectSunlight={setSelectedSunlight}
                petFriendlyOnly={petFriendlyOnly}
                onTogglePetFriendly={setPetFriendlyOnly}
                onResetFilters={handleResetFilters}
                totalFilteredCount={filteredFlowers.length}
              />

              {/* Online Specimen Gallery */}
              <FlowerCatalog
                flowers={filteredFlowers}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSelectFlower={(flower) => setSelectedFlowerForDetail(flower)}
                onToggleSaveFlower={handleToggleSaveFlower}
                savedFlowerIds={savedFlowerIds}
                onOpenStudioForFlower={handleOpenStudioForFlower}
                onResetFilters={handleResetFilters}
              />
            </div>
          )}

          {/* TAB 2: Full Classification Matrix Focus */}
          {activeTab === 'matrix' && (
            <div className="space-y-8">
              <ClassificationMatrix
                selectedFamily={selectedFamily}
                onSelectFamily={setSelectedFamily}
                selectedColor={selectedColor}
                onSelectColor={setSelectedColor}
                selectedSeason={selectedSeason}
                onSelectSeason={setSelectedSeason}
                selectedDifficulty={selectedDifficulty}
                onSelectDifficulty={setSelectedDifficulty}
                selectedSunlight={selectedSunlight}
                onSelectSunlight={setSelectedSunlight}
                petFriendlyOnly={petFriendlyOnly}
                onTogglePetFriendly={setPetFriendlyOnly}
                onResetFilters={handleResetFilters}
                totalFilteredCount={filteredFlowers.length}
              />

              <div className="pt-2">
                <FlowerCatalog
                  flowers={filteredFlowers}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onSelectFlower={(flower) => setSelectedFlowerForDetail(flower)}
                  onToggleSaveFlower={handleToggleSaveFlower}
                  savedFlowerIds={savedFlowerIds}
                  onOpenStudioForFlower={handleOpenStudioForFlower}
                  onResetFilters={handleResetFilters}
                />
              </div>
            </div>
          )}

          {/* TAB 3: 24 Solar Terms Seasonal Calendar */}
          {activeTab === 'calendar' && (
            <SeasonalReminderView
              onAddReminderFromPreset={handleAddReminderFromPreset}
              onSelectFlowerByName={handleSelectFlowerByName}
              allFlowers={FLOWERS_DATABASE}
            />
          )}

          {/* TAB 4: Floriography Card Maker Studio */}
          {activeTab === 'studio' && (
            <FloriographyStudio
              flowers={FLOWERS_DATABASE}
              initialFlower={flowerForStudio}
              initialFilter={filterForStudio}
              onSelectFlowerDetail={(flower) => setSelectedFlowerForDetail(flower)}
            />
          )}

          {/* TAB 5: My Garden & Care Reminders Dashboard */}
          {activeTab === 'garden' && (
            <MyGardenReminders
              reminders={reminders}
              onToggleCompleteReminder={handleToggleCompleteReminder}
              onDeleteReminder={handleDeleteReminder}
              onAddCustomReminder={handleAddCustomReminder}
              savedFlowers={savedFlowers}
              onSelectFlower={(flower) => setSelectedFlowerForDetail(flower)}
              onRemoveSavedFlower={handleToggleSaveFlower}
              onNavigateToCatalog={() => setActiveTab('catalog')}
            />
          )}
        </div>
      </main>

      {/* Flower Specimen Detail Modal */}
      <FlowerDetailModal
        flower={selectedFlowerForDetail}
        onClose={() => setSelectedFlowerForDetail(null)}
        isSaved={selectedFlowerForDetail ? savedFlowerIds.includes(selectedFlowerForDetail.id) : false}
        onToggleSave={handleToggleSaveFlower}
        onOpenStudio={handleOpenStudioForFlower}
        onAddCareReminder={handleAddCareReminderForFlower}
      />

      {/* Footer */}
      <Footer onSelectTab={setActiveTab} />
    </div>
  );
}
