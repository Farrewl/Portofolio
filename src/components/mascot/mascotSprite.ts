// Mascot sprite sheet: pre-rendered pixel frames from a 32x32 matrix.
// Built once at module load into a single PNG data URL (no runtime re-render).

const C = {
  coral: '#FD796C',
  coralDark: '#CA6155',
  peach: '#FEBA8B',
  ink: '#2E2F31',
  outline: '#1E1F21',
  gray: '#444547',
  white: '#FFFFFF',
};

type FrameFn = (ctx: CanvasRenderingContext2D) => void;

const D = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, c: string) => {
  ctx.fillStyle = c;
  ctx.fillRect(x, y, w, h);
};

const drawHead = (ctx: CanvasRenderingContext2D) => {
  // antennas
  D(ctx, 8, 3, 1, 5, C.outline);
  D(ctx, 7, 1, 3, 3, C.outline);
  D(ctx, 7, 2, 1, 1, C.gray);
  D(ctx, 23, 3, 1, 5, C.outline);
  D(ctx, 22, 1, 3, 3, C.outline);
  D(ctx, 22, 2, 1, 1, C.gray);

  // head shell
  D(ctx, 5, 6, 22, 2, C.outline);
  D(ctx, 6, 8, 20, 12, C.outline);
  D(ctx, 6, 20, 20, 2, C.outline);
  D(ctx, 8, 7, 16, 1, C.coral);
  D(ctx, 6, 8, 20, 12, C.coral);
  D(ctx, 8, 20, 16, 1, C.coral);

  // peach highlights
  D(ctx, 8, 9, 4, 2, C.peach);
  D(ctx, 7, 11, 2, 5, C.peach);
  D(ctx, 8, 12, 1, 3, C.coralDark);
  D(ctx, 22, 18, 2, 2, C.coralDark);

  // visor
  D(ctx, 8, 10, 16, 8, C.ink);

  // base eyes (overlay replaces them for expressions)
  D(ctx, 10, 11, 4, 5, C.white);
  D(ctx, 18, 11, 4, 5, C.white);
};

const drawBody = (ctx: CanvasRenderingContext2D, legL: number, legR: number) => {
  D(ctx, 8, legL, 4, 5, C.ink);
  D(ctx, 20, legR, 4, 5, C.ink);
  D(ctx, 9, 18, 14, 7, C.coral);
  D(ctx, 10, 19, 12, 3, C.white);
  D(ctx, 9, 22, 14, 2, C.coral);
  D(ctx, 3, 18, 2, 6, C.ink);
  D(ctx, 27, 18, 2, 6, C.ink);
};

const FRAMES: FrameFn[] = [
  // 0 idle A
  (ctx) => {
    drawHead(ctx);
    drawBody(ctx, 25, 25);
  },
  // 1 idle B (breathe)
  (ctx) => {
    drawHead(ctx);
    drawBody(ctx, 24, 26);
  },
  // 2 walk A
  (ctx) => {
    drawHead(ctx);
    drawBody(ctx, 23, 25);
  },
  // 3 walk B
  (ctx) => {
    drawHead(ctx);
    drawBody(ctx, 25, 23);
  },
  // 4 wave
  (ctx) => {
    drawHead(ctx);
    drawBody(ctx, 25, 25);
    D(ctx, 3, 8, 2, 8, C.ink); // raised arm
    D(ctx, 2, 7, 4, 2, C.coral);
  },
  // 5 dizzy
  (ctx) => {
    drawHead(ctx);
    drawBody(ctx, 23, 26);
  },
];

const FRAME_W = 32;

const buildSheet = (): string => {
  if (typeof document === 'undefined') return '';
  const canvas = document.createElement('canvas');
  canvas.width = FRAME_W * FRAMES.length;
  canvas.height = FRAME_W;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  ctx.imageSmoothingEnabled = false;
  FRAMES.forEach((draw, i) => {
    ctx.save();
    ctx.translate(i * FRAME_W, 0);
    draw(ctx);
    ctx.restore();
  });
  return canvas.toDataURL('image/png');
};

export const MASCOT_SHEET_URL = buildSheet();
export const MASCOT_SHEET_FRAMES = FRAMES.length;
export const MASCOT_SPRITE_SIZE = FRAME_W;
