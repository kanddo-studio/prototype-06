import Phaser from "phaser";

export class Sprite {
  public x: number;
  public y: number;
  public texture: { key: string };
  public setTexture: jest.Mock;
  public setPosition: jest.Mock;

  constructor(_scene: Phaser.Scene, x: number, y: number, texture: string) {
    this.x = x;
    this.y = y;
    this.texture = { key: texture };
    this.setTexture = jest.fn();
    this.setPosition = jest.fn();
  }
}

export class Scene {
  public add: { sprite: jest.Mock };
  public input: { on: jest.Mock };
  public cameras: {
    main: {
      scrollX: number;
      scrollY: number;
      stopFollow: jest.Mock;
      startFollow: jest.Mock;
      setZoom: jest.Mock;
    };
  };

  constructor() {
    this.add = { sprite: jest.fn() };
    this.input = { on: jest.fn() };
    this.cameras = {
      main: {
        scrollX: 0,
        scrollY: 0,
        stopFollow: jest.fn(),
        startFollow: jest.fn(),
        setZoom: jest.fn(),
      },
    };
  }
}

export class Game {
  constructor() {}
}

const PhaserMock = {
  GameObjects: { Sprite },
  Scene,
  Game,
  Math: {
    Clamp: (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max),
  },
};

export default PhaserMock;
