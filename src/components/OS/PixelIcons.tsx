import React from 'react';

// Tiny pixel SVG icons (16x16 grid) rendered with crispEdges.
const R = ({ x, y, w = 1, h = 1, c }: { x: number; y: number; w?: number; h?: number; c: string }) => (
  <rect x={x} y={y} width={w} height={h} fill={c} />
);

const PAL = {
  coral: '#FD796C',
  coral2: '#CA6155',
  peach: '#FEBA8B',
  ink: '#2E2F31',
  outline: '#1E1F21',
  gray: '#444547',
  white: '#FFFFFF',
  gold: '#F5C542',
  green: '#7BD88F',
  blue: '#7AA2F7',
};

export type IconName =
  | 'about'
  | 'projects'
  | 'cv'
  | 'skills'
  | 'contact'
  | 'terminal'
  | 'settings'
  | 'trash'
  | 'folder'
  | 'logo';

export const AppIcon: React.FC<{ name: IconName; size?: number; className?: string }> = ({
  name,
  size = 32,
  className,
}) => {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 16 16',
    shapeRendering: 'crispEdges' as const,
    className,
    'aria-hidden': true,
  };

  switch (name) {
    case 'about':
      return (
        <svg {...common}>
          <R x={0} y={0} w={16} h={16} c={PAL.outline} />
          <R x={1} y={1} w={14} h={14} c={PAL.coral} />
          <R x={4} y={4} w={8} h={5} c={PAL.ink} />
          <R x={5} y={5} w={2} h={2} c={PAL.white} />
          <R x={9} y={5} w={2} h={2} c={PAL.white} />
          <R x={6} y={10} w={4} h={2} c={PAL.peach} />
          <R x={7} y={2} w={1} h={2} c={PAL.ink} />
          <R x={8} y={1} w={2} h={2} c={PAL.ink} />
        </svg>
      );
    case 'projects':
      return (
        <svg {...common}>
          <R x={0} y={0} w={16} h={16} c={PAL.outline} />
          <R x={1} y={1} w={14} h={14} c={PAL.peach} />
          <R x={2} y={4} w={5} h={2} c={PAL.coral2} />
          <R x={2} y={6} w={12} h={8} c={PAL.coral} />
          <R x={3} y={8} w={4} h={1} c={PAL.white} />
          <R x={3} y={10} w={6} h={1} c={PAL.coral2} />
        </svg>
      );
    case 'cv':
      return (
        <svg {...common}>
          <R x={0} y={0} w={16} h={16} c={PAL.outline} />
          <R x={1} y={1} w={14} h={14} c={PAL.white} />
          <R x={3} y={3} w={5} h={6} c={PAL.gray} />
          <R x={9} y={3} w={4} h={1} c={PAL.coral} />
          <R x={9} y={5} w={4} h={1} c={PAL.gray} />
          <R x={9} y={7} w={3} h={1} c={PAL.gray} />
          <R x={3} y={11} w={10} h={1} c={PAL.gray} />
          <R x={3} y={12} w={8} h={1} c={PAL.gray} />
        </svg>
      );
    case 'skills':
      return (
        <svg {...common}>
          <R x={0} y={0} w={16} h={16} c={PAL.outline} />
          <R x={1} y={1} w={14} h={14} c={PAL.ink} />
          <R x={2} y={3} w={12} h={2} c={PAL.green} />
          <R x={2} y={7} w={8} h={2} c={PAL.blue} />
          <R x={2} y={11} w={10} h={2} c={PAL.coral} />
        </svg>
      );
    case 'contact':
      return (
        <svg {...common}>
          <R x={0} y={0} w={16} h={16} c={PAL.outline} />
          <R x={1} y={2} w={14} h={12} c={PAL.white} />
          <R x={2} y={3} w={1} h={1} c={PAL.coral} />
          <R x={3} y={4} w={1} h={1} c={PAL.coral} />
          <R x={4} y={5} w={8} h={1} c={PAL.coral2} />
          <R x={3} y={11} w={10} h={1} c={PAL.gray} />
        </svg>
      );
    case 'terminal':
      return (
        <svg {...common}>
          <R x={0} y={0} w={16} h={16} c={PAL.outline} />
          <R x={1} y={1} w={14} h={14} c="#0B0C0E" />
          <R x={2} y={2} w={12} h={2} c={PAL.gray} />
          <R x={2} y={5} w={1} h={2} c={PAL.green} />
          <R x={4} y={5} w={2} h={1} c={PAL.green} />
          <R x={6} y={5} w={1} h={1} c={PAL.green} />
          <R x={2} y={8} w={1} h={2} c={PAL.white} />
          <R x={4} y={8} w={4} h={1} c={PAL.gray} />
        </svg>
      );
    case 'settings':
      return (
        <svg {...common}>
          <R x={0} y={0} w={16} h={16} c={PAL.outline} />
          <R x={1} y={1} w={14} h={14} c={PAL.gray} />
          <R x={6} y={2} w={4} h={12} c={PAL.white} />
          <R x={2} y={6} w={12} h={4} c={PAL.white} />
          <R x={6} y={6} w={4} h={4} c={PAL.coral} />
          <R x={7} y={7} w={2} h={2} c={PAL.coral2} />
        </svg>
      );
    case 'trash':
      return (
        <svg {...common}>
          <R x={0} y={0} w={16} h={16} c={PAL.outline} />
          <R x={1} y={1} w={14} h={14} c="transparent" />
          <R x={5} y={2} w={6} h={2} c={PAL.gray} />
          <R x={4} y={4} w={8} h={10} c={PAL.gray} />
          <R x={6} y={6} w={1} h={6} c={PAL.ink} />
          <R x={9} y={6} w={1} h={6} c={PAL.ink} />
        </svg>
      );
    case 'folder':
      return (
        <svg {...common}>
          <R x={0} y={0} w={16} h={16} c={PAL.outline} />
          <R x={1} y={1} w={14} h={14} c={PAL.peach} />
          <R x={2} y={3} w={6} h={2} c={PAL.coral2} />
          <R x={2} y={5} w={12} h={9} c={PAL.coral} />
        </svg>
      );
    case 'logo':
    default:
      return (
        <svg {...common}>
          <R x={0} y={0} w={16} h={16} c={PAL.outline} />
          <R x={1} y={1} w={14} h={14} c={PAL.coral} />
          <R x={3} y={4} w={10} h={7} c={PAL.ink} />
          <R x={5} y={6} w={2} h={2} c={PAL.white} />
          <R x={9} y={6} w={2} h={2} c={PAL.white} />
          <R x={6} y={9} w={4} h={1} c={PAL.coral} />
        </svg>
      );
  }
};

export const iconLabel: Record<IconName, string> = {
  about: 'About Me',
  projects: 'Projects',
  cv: 'CV',
  skills: 'Skills',
  contact: 'Contact',
  terminal: 'Terminal',
  settings: 'Settings',
  trash: 'Trash',
  folder: 'Folder',
  logo: 'Portfolio OS',
};
