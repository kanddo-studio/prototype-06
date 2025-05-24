import Phaser from "phaser";

import { createGrid } from "../../../core/utils";

describe("createGrid", () => {
  let mockScene: Phaser.Scene;

  beforeEach(() => {
    mockScene = new Phaser.Scene();
    mockScene.add = {
      graphics: jest.fn().mockReturnValue({
        lineStyle: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        strokePath: jest.fn(),
      }),
    } as any;
  });

  it("should create a grid with the correct number of horizontal lines", () => {
    createGrid(mockScene, 400);

    const graphics = mockScene.add.graphics();
    expect(graphics.moveTo).toHaveBeenCalledTimes(10);
  });

  it("should create a grid with the correct number of vertical lines", () => {
    createGrid(mockScene, 500);

    const graphics = mockScene.add.graphics();
    expect(graphics.moveTo).toHaveBeenCalledTimes(12);
  });

  it("should call strokePath to draw the grid", () => {
    createGrid(mockScene, 500);

    const graphics = mockScene.add.graphics();
    expect(graphics.strokePath).toHaveBeenCalled();
  });
});
