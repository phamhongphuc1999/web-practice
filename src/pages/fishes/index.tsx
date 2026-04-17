import createBoids, { type Flock } from 'boids';
import { Application, Assets, Container } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { FishStatusEnum } from 'src/global';
import { Fish } from './Fish';
import { fishList } from './config';

export type FishClickPayload = {
  index: number;
  fish: Fish;
  status: FishStatusEnum;
  position: {
    x: number;
    y: number;
  };
  velocity: {
    x: number;
    y: number;
  };
};

type FishExampleViewProps = {
  fishSize?: number;
  onFishClickAction?: (payload: FishClickPayload) => void;
};

type FishState = {
  index: number;
  fish: Fish;
  width: number;
  height: number;
  direction: number;
  flock: Flock;
  speedPhase: number;
  spriteSpeed: number;
  isPaused: boolean;
  status: FishStatusEnum;
  bubble: {
    activeType: 'bubble' | 'point' | null;
    hideAt: number;
    nextShowAt: number;
  };
};

export default function Fishes({ fishSize = 100, onFishClickAction }: FishExampleViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fishesRef = useRef<Fish[]>([]);

  useEffect(() => {
    let app: Application;
    const fishStates: FishState[] = [];

    const init = async () => {
      app = new Application();

      if (!containerRef.current) return;

      await app.init({
        resizeTo: containerRef.current,
        antialias: true,
        backgroundAlpha: 0,
        autoDensity: true,
      });

      // attach canvas
      containerRef.current?.appendChild(app.canvas);

      // load assets
      await Assets.load(fishList);
      await Assets.load([
        'https://cdn.basefish.app/assets/effects/bubble.png',
        'https://cdn.basefish.app/assets/effects/point.png',
      ]);

      const pondContainer = new Container();
      app.stage.addChild(pondContainer);

      const textures = fishList.map((fish) => Assets.get(fish));
      const effectTextures = {
        bubble: Assets.get('https://cdn.basefish.app/assets/effects/bubble.png'),
        point: Assets.get('https://cdn.basefish.app/assets/effects/point.png'),
      };

      fishesRef.current = [];
      fishStates.length = 0;

      for (let i = 0; i < fishList.length; i++) {
        const spawnX = randomInRange(fishSize / 2, app.screen.width - fishSize / 2);
        const spawnY = randomInRange(fishSize / 2, app.screen.height - fishSize / 2);
        const status =
          i % 6 === 0
            ? FishStatusEnum.HEALTHY
            : i % 5 === 0
              ? FishStatusEnum.HUNGRY
              : FishStatusEnum.NORMAL;
        const flock = createFishFlock(spawnX, spawnY, status);
        const boid = flock.boids[0];

        const fish = new Fish(
          textures[i % textures.length],
          [app.screen.width, app.screen.height],
          fishSize,
          effectTextures,
          boid
        );

        fish.x = spawnX;
        fish.y = spawnY;

        const fishState: FishState = {
          index: i,
          fish,
          width: fishSize,
          height: fishSize,
          direction: 1,
          flock,
          speedPhase: Math.random() * Math.PI * 2,
          spriteSpeed: getSpriteSpeed(status),
          isPaused: false,
          status,
          bubble: {
            activeType: null,
            hideAt: 0,
            nextShowAt: Date.now() + 1000 + Math.random() * 2000,
          },
        };

        fish.setClickHandler(() => {
          onFishClickAction?.({
            index: fishState.index,
            fish,
            status: fishState.status,
            position: { x: fish.x, y: fish.y },
            velocity: { x: boid[2], y: boid[3] },
          });
        });

        fishesRef.current.push(fish);
        pondContainer.addChild(fish);
        fishStates.push(fishState);
      }

      app.ticker.add(() => {
        const now = Date.now();
        fishStates.forEach((state) => {
          updateFishState(state, app.screen.width, app.screen.height);
          updateBubbleState(state, now);
          state.fish.fishView.animationSpeed = state.fish.isHovered ? 0 : 0.12 * state.spriteSpeed;
          state.fish.setEffect(state.bubble.activeType);
          state.fish.update(state.direction);
        });
      });
    };

    init();

    return () => {
      app?.destroy(true, { children: true });
    };
  }, [fishSize, onFishClickAction]);

  return <div ref={containerRef} className="flex h-screen w-full items-center justify-center" />;
}

function calculateActualSpeed(status: FishStatusEnum) {
  const isHealthy = status === FishStatusEnum.HEALTHY;
  const isHungry = status === FishStatusEnum.HUNGRY;
  const baseSpeed = 1.2;
  const speedMultiplier = isHealthy ? 1.8 : isHungry ? 0.35 : 1;
  const accelMultiplier = isHealthy ? 1.2 : isHungry ? 0.2 : 0.8;
  const actualSpeed = baseSpeed * speedMultiplier;
  return { accelMultiplier, actualSpeed };
}

function createFishFlock(initialX: number, initialY: number, status: FishStatusEnum) {
  const { accelMultiplier, actualSpeed } = calculateActualSpeed(status);

  const flock = createBoids({
    boids: 1,
    speedLimit: actualSpeed * 2.5,
    accelerationLimit: 0.1 * accelMultiplier,
  });

  flock.boids[0][0] = initialX;
  flock.boids[0][1] = initialY;
  flock.boids[0][2] = (Math.random() - 0.5) * actualSpeed;
  flock.boids[0][3] = (Math.random() - 0.5) * actualSpeed * 0.5;

  return flock;
}

function getSpriteSpeed(status: FishStatusEnum) {
  if (status === FishStatusEnum.HEALTHY) return 1.8;
  if (status === FishStatusEnum.HUNGRY) return 0.35;
  return 1;
}

function updateFishState(state: FishState, parentWidth: number, parentHeight: number) {
  if (state.isPaused) return;

  const { flock, status } = state;
  const boid = flock.boids[0];

  if (state.fish.isHovered) {
    boid[0] = state.fish.x;
    boid[1] = state.fish.y;
    boid[2] = 0;
    boid[3] = 0;
    return;
  }

  flock.tick();

  let [x, y, vx, vy] = boid;

  const isHealthy = status === FishStatusEnum.HEALTHY;
  const isHungry = status === FishStatusEnum.HUNGRY;

  state.speedPhase += isHealthy ? 0.02 : 0.01;

  const driftX = Math.sin(state.speedPhase * 0.7) * 0.15;
  const driftY = Math.cos(state.speedPhase * 1.1) * 0.15;

  vx += driftX;
  vy += driftY;

  const friction = isHungry ? 0.98 : 0.99;
  vx *= friction;
  vy *= friction;

  const minVelocity = isHealthy ? 1.5 : 0.6;
  const speed = Math.sqrt(vx * vx + vy * vy);
  if (speed < minVelocity) {
    vx = (vx / speed) * minVelocity || Math.random() - 0.5;
    vy = (vy / speed) * minVelocity || Math.random() - 0.5;
  }

  const margin = 100;
  const turnForce = 0.15;

  if (x < margin) vx += turnForce;
  if (x > parentWidth - state.width - margin) vx -= turnForce;
  if (y < margin) vy += turnForce;
  if (y > parentHeight - state.height - margin) vy -= turnForce;

  x = Math.max(0, Math.min(x, parentWidth - state.width));
  y = Math.max(0, Math.min(y, parentHeight - state.height));

  boid[0] = x;
  boid[1] = y;
  boid[2] = vx;
  boid[3] = vy;

  if (Math.abs(vx) > 0.1) {
    state.direction = vx > 0 ? 1 : -1;
  }
}

function randomInRange(min: number, max: number) {
  if (max <= min) return min;
  return min + Math.random() * (max - min);
}

function updateBubbleState(state: FishState, now: number) {
  if (state.bubble.activeType) {
    if (now >= state.bubble.hideAt) {
      state.bubble.activeType = null;
      state.bubble.hideAt = 0;
      state.bubble.nextShowAt = now + 1000;
    }
    return;
  }

  if (now >= state.bubble.nextShowAt) {
    state.bubble.activeType = Math.random() < 0.75 ? 'bubble' : 'point';
    state.bubble.hideAt = now + 2000;
  }
}
