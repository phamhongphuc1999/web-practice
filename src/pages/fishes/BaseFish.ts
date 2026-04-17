import { AnimatedSprite, Container, Rectangle, Texture } from 'pixi.js';

function createFrames(texture: Texture, cols = 3, rows = 3) {
  const frames: Texture[] = [];
  const base = texture.source;
  const frameWidth = texture.width / cols;
  const frameHeight = texture.height / rows;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      frames.push(
        new Texture({
          source: base,
          frame: new Rectangle(x * frameWidth, y * frameHeight, frameWidth, frameHeight),
        })
      );
    }
  }
  return frames;
}

export type FishEffectTextures = {
  bubble: Texture;
  point: Texture;
};

export class BaseFish extends Container {
  _speed = 1;
  _direction = Math.random() * Math.PI * 2;
  _isHovered = false;
  private clickHandler?: () => void;

  fishView: AnimatedSprite;
  protected bubbleView: AnimatedSprite;
  protected pointView: AnimatedSprite;
  protected effectOffsetRightX: number;
  protected effectOffsetLeftX: number;
  protected effectOffsetY: number;
  protected frameWidth: number;
  protected frameHeight: number;

  constructor(
    texture: Texture,
    frameSize: [number, number],
    fishSize: number,
    effectTextures: FishEffectTextures
  ) {
    super();

    this.frameWidth = frameSize[0];
    this.frameHeight = frameSize[1];

    const frames = createFrames(texture, 3, 3);
    this.fishView = new AnimatedSprite(frames);

    this.fishView.anchor.set(0.5);
    this.fishView.animationSpeed = 0.12;
    this.fishView.width = fishSize;
    this.fishView.height = fishSize;
    this.fishView.play();

    this.bubbleView = createEffectView(effectTextures.bubble, fishSize);
    this.pointView = createEffectView(effectTextures.point, fishSize);
    this.effectOffsetRightX = fishSize * 0.2;
    this.effectOffsetLeftX = fishSize * 0.34;
    this.effectOffsetY = -fishSize * 0.15;

    this.addChild(this.fishView);
    this.addChild(this.bubbleView);
    this.addChild(this.pointView);

    this.eventMode = 'static';
    this.cursor = 'pointer';

    // Hover events
    this.on('pointerover', this.onHoverStart.bind(this));
    this.on('pointerout', this.onHoverEnd.bind(this));
    this.on('pointertap', this.onClick.bind(this));
  }

  protected onHoverStart() {
    this._isHovered = true;
    this.fishView.animationSpeed = 0;
    this.fishView.gotoAndStop(4);
  }

  protected onHoverEnd() {
    this._isHovered = false;
    this.fishView.animationSpeed = 0.12;
    this.fishView.rotation = 0;
  }

  get isHovered() {
    return this._isHovered;
  }

  setClickHandler(handler?: () => void) {
    this.clickHandler = handler;
  }

  protected onClick() {
    this.clickHandler?.();
  }

  setEffect(type: 'bubble' | 'point' | null) {
    this.bubbleView.visible = type === 'bubble';
    this.pointView.visible = type === 'point';
  }

  setDirection(direction: number) {
    const normalizedDirection = direction < 0 ? -1 : 1;
    const effectOffsetX =
      normalizedDirection < 0 ? -this.effectOffsetLeftX : this.effectOffsetRightX;

    this.fishView.scale.x = Math.abs(this.fishView.scale.x) * normalizedDirection;
    this.bubbleView.x = effectOffsetX;
    this.pointView.x = effectOffsetX;
    this.bubbleView.y = this.effectOffsetY;
    this.pointView.y = this.effectOffsetY;
  }

  update() {
    if (this._isHovered) return;

    this._direction += 0.001;

    this.x += this._speed * Math.cos(-this._direction);
    this.y += this._speed * Math.sin(-this._direction);

    const padding = 100;

    if (this.x > this.frameWidth + padding) this.x -= this.frameWidth + padding * 2;
    if (this.x < -padding) this.x += this.frameWidth + padding * 2;
    if (this.y > this.frameHeight + padding) this.y -= this.frameHeight + padding * 2;
    if (this.y < -padding) this.y += this.frameHeight + padding * 2;
  }
}

function createEffectView(texture: Texture, fishSize: number) {
  const effectView = new AnimatedSprite(createFrames(texture, 3, 3));
  const effectSize = fishSize * 0.7;

  effectView.anchor.set(0.5);
  effectView.width = effectSize;
  effectView.height = effectSize;
  effectView.animationSpeed = 0.12;
  effectView.visible = false;
  effectView.play();

  return effectView;
}
