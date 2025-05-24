import Phaser from "phaser";

function createGrid(scene: Phaser.Scene, worldSize: number) {
  const graphics = scene.add.graphics();
  graphics.lineStyle(1, 0x444444);

  for (let y = 0; y <= worldSize; y += 100) {
    graphics.moveTo(0, y);
    graphics.lineTo(worldSize, y);
  }

  for (let x = 0; x <= worldSize; x += 100) {
    graphics.moveTo(x, 0);
    graphics.lineTo(x, worldSize);
  }

  graphics.strokePath();
}

export { createGrid };
