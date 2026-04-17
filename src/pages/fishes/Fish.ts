import { Boid } from 'boids';
import { Texture } from 'pixi.js';
import { BaseFish, type FishEffectTextures } from './BaseFish';

export class Fish extends BaseFish {
  private boid: Boid;

  constructor(
    texture: Texture,
    frameSize: [number, number],
    fishSize: number,
    effectTextures: FishEffectTextures,
    boid: Boid
  ) {
    super(texture, frameSize, fishSize, effectTextures);

    this.boid = boid;
  }

  update(direction = 1) {
    this.x = this.boid[0];
    this.y = this.boid[1];
    this.setDirection(direction);
  }
}
