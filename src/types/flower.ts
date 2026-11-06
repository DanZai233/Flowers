export type ColorCategory = 
  | 'pink' 
  | 'red' 
  | 'white' 
  | 'yellow' 
  | 'orange' 
  | 'blue' 
  | 'purple' 
  | 'green_bicolor';

export type BotanicalFamily = 
  | '蔷薇科 Rosaceae'
  | '百合科 Liliaceae'
  | '兰科 Orchidaceae'
  | '绣球花科 Hydrangeaceae'
  | '毛茛科 Ranunculaceae'
  | '菊科 Asteraceae'
  | '石蒜科 Amaryllidaceae'
  | '木犀科 Oleaceae'
  | '杜鹃花科 Ericaceae'
  | '锦葵科 Malvaceae'
  | '紫草科 Boraginaceae'
  | '睡莲科 Nymphaeaceae'
  | '罂粟科 Papaveraceae'
  | '天南星科 Araceae'
  | '茜草科 Rubiaceae'
  | '堇菜科 Violaceae'
  | '豆科 Fabaceae';

export type FlowerSeason = 'spring' | 'summer' | 'autumn' | 'winter' | 'all_year';

export type CareDifficulty = 'easy' | 'medium' | 'expert';

export type SunlightLevel = 'full_sun' | 'partial_shade' | 'shade';

export type WateringLevel = 'low' | 'moderate' | 'high';

export interface FlowerCareGuide {
  difficulty: CareDifficulty;
  sunlight: SunlightLevel;
  sunlightText: string;
  watering: WateringLevel;
  wateringText: string;
  temperature: string;
  soil: string;
  pruning: string;
  fertilization: string;
  pestsAndDiseases: string;
  petFriendly: boolean;
  toxicityNote?: string;
  propagation: string;
}

export interface FlowerLanguage {
  summary: string;
  keywords: string[];
  quotes: string;
  lore: string;
  suitableOccasions: string[];
}

export interface Flower {
  id: string;
  name: string;
  latinName: string;
  alias: string[];
  family: BotanicalFamily;
  genus: string;
  colors: ColorCategory[];
  colorHex: string;
  colorName: string;
  language: FlowerLanguage;
  season: FlowerSeason;
  bloomPeriod: string;
  plantingTime: string;
  careGuide: FlowerCareGuide;
  imageUrl: string;
  curatorNote: string;
  featured?: boolean;
}

export interface CareReminderItem {
  id: string;
  flowerId?: string;
  flowerName: string;
  title: string;
  taskType: 'water' | 'fertilize' | 'prune' | 'sun' | 'plant' | 'check';
  dueDate: string;
  frequencyDays?: number;
  completed: boolean;
  notes?: string;
  createdAt: string;
}
