import Phaser from "phaser";

import { Entity, InputComponent, System } from "kanji-ecs";

export class KeyboardSystem implements System {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene) {
    if (scene.input.keyboard) {
      this.cursors = scene.input.keyboard.createCursorKeys();
      return;
    }
    throw new Error("Error: Missing Keyboard Input in the Scene");
  }

  update(entities: Entity[]) {
    entities.forEach((entity) => {
      const inputComponent = entity.get<InputComponent>("input");

      if (!inputComponent) {
        throw new Error("Error: Missing Component Dependency");
      }

      inputComponent.keys.clear();

      if (this.cursors.left?.isDown) {
        inputComponent.keys.add("ArrowLeft");
      }

      if (this.cursors.right?.isDown) {
        inputComponent.keys.add("ArrowRight");
      }

      if (this.cursors.up?.isDown) {
        inputComponent.keys.add("ArrowUp");
      }

      if (this.cursors.down?.isDown) {
        inputComponent.keys.add("ArrowDown");
      }
    });
  }
}
