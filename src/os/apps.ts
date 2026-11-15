import { lazy } from 'react';
import type { AppId } from '../store/osStore';
import type { IconName } from '../components/OS/PixelIcons';

export interface AppMeta {
  id: AppId;
  title: string;
  icon: IconName;
  size: { w: number; h: number };
  component: React.LazyExoticComponent<React.ComponentType>;
}

export const APPS: Record<AppId, AppMeta> = {
  about: {
    id: 'about',
    title: 'About Me',
    icon: 'about',
    size: { w: 720, h: 480 },
    component: lazy(() => import('../components/apps/About')),
  },
  projects: {
    id: 'projects',
    title: 'Projects',
    icon: 'projects',
    size: { w: 760, h: 520 },
    component: lazy(() => import('../components/apps/Projects')),
  },
  cv: {
    id: 'cv',
    title: 'CV',
    icon: 'cv',
    size: { w: 800, h: 560 },
    component: lazy(() => import('../components/apps/CV')),
  },
  skills: {
    id: 'skills',
    title: 'Skills',
    icon: 'skills',
    size: { w: 680, h: 520 },
    component: lazy(() => import('../components/apps/Skills')),
  },
  contact: {
    id: 'contact',
    title: 'Contact',
    icon: 'contact',
    size: { w: 560, h: 580 },
    component: lazy(() => import('../components/apps/Contact')),
  },
  terminal: {
    id: 'terminal',
    title: 'Terminal',
    icon: 'terminal',
    size: { w: 680, h: 420 },
    component: lazy(() => import('../components/apps/Terminal')),
  },
  settings: {
    id: 'settings',
    title: 'Settings',
    icon: 'settings',
    size: { w: 640, h: 560 },
    component: lazy(() => import('../components/apps/Settings')),
  },
  trash: {
    id: 'trash',
    title: 'Trash',
    icon: 'trash',
    size: { w: 480, h: 380 },
    component: lazy(() => import('../components/apps/Trash')),
  },
};

export const APP_IDS = Object.keys(APPS) as AppId[];

// Prefetch while the boot screen is shown (React.lazy modules resolve to the
// same module on later lazy render).
export const prefetchApps = () => {
  void import('../components/apps/About');
  void import('../components/apps/Projects');
  void import('../components/apps/CV');
  void import('../components/apps/Skills');
  void import('../components/apps/Contact');
  void import('../components/apps/Terminal');
  void import('../components/apps/Settings');
  void import('../components/apps/Trash');
};
