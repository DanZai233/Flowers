import React from 'react';

export type AestheticFilterId = 
  | 'natural' 
  | 'warm_sun' 
  | 'cool_nordic' 
  | 'vintage_film' 
  | 'ethereal_pastel' 
  | 'twilight_noir';

export interface AestheticFilter {
  id: AestheticFilterId;
  name: string;
  enName: string;
  cssFilter: string;
  overlayClass?: string;
  description: string;
  accentColor: string;
}

export const AESTHETIC_FILTERS: AestheticFilter[] = [
  {
    id: 'natural',
    name: '原色典藏',
    enName: 'Natural Archive',
    cssFilter: 'none',
    description: '真实馆藏标本原色，忠实还原花卉微观肌理与自然光谱。',
    accentColor: '#78716c'
  },
  {
    id: 'warm_sun',
    name: '暖阳漫射',
    enName: 'Golden Warmth',
    cssFilter: 'sepia(0.22) contrast(1.06) saturate(1.22) brightness(1.02)',
    overlayClass: 'bg-amber-500/10 mix-blend-color-burn pointer-events-none',
    description: '如金秋午后阳光透过玻璃暖房，渲染温暖治愈的柔和光晕。',
    accentColor: '#d97706'
  },
  {
    id: 'cool_nordic',
    name: '幽谷冷萃',
    enName: 'Cool Mist',
    cssFilter: 'contrast(1.12) brightness(1.04) saturate(0.9) hue-rotate(-10deg)',
    overlayClass: 'bg-cyan-900/10 mix-blend-overlay pointer-events-none',
    description: '清冷高山晨雾意境，褪去浮华，赋予花卉静穆高洁之感。',
    accentColor: '#0284c7'
  },
  {
    id: 'vintage_film',
    name: '复古胶片',
    enName: 'Vintage Portra',
    cssFilter: 'sepia(0.35) contrast(1.18) saturate(1.15) brightness(0.96)',
    overlayClass: 'bg-orange-950/10 mix-blend-multiply pointer-events-none',
    description: '浓郁经典胶片色调与厚重暗部，散发十九世纪植物图谱的古典回甘。',
    accentColor: '#9a3412'
  },
  {
    id: 'ethereal_pastel',
    name: '浮世淡雅',
    enName: 'Ethereal Muted',
    cssFilter: 'contrast(0.94) brightness(1.12) saturate(0.82) sepia(0.08)',
    overlayClass: 'bg-rose-100/15 mix-blend-screen pointer-events-none',
    description: '低饱和度奶油调柔光，如工笔熟宣上的素雅描摹，空灵通透。',
    accentColor: '#ec4899'
  },
  {
    id: 'twilight_noir',
    name: '暮色浓郁',
    enName: 'Twilight Noir',
    cssFilter: 'contrast(1.3) brightness(0.9) saturate(1.28)',
    overlayClass: 'bg-stone-950/20 mix-blend-multiply pointer-events-none',
    description: '高反差戏剧性暗调油画质感，凸显花瓣在幽暗背景下的强烈轮廓。',
    accentColor: '#4f46e5'
  }
];
