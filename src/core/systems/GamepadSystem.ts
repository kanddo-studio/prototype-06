import Phaser from "phaser";
import { Entity, InputComponent, System } from "kanji-ecs";

export class GamepadSystem implements System {
  pad?: Phaser.Input.Gamepad.Gamepad;

  constructor(scene: Phaser.Scene) {
    if (scene.input?.gamepad) {
      scene.input.gamepad.once(
        "connected",
        this.handleGamepadConnected.bind(this),
      );
    }
  }

  handleGamepadConnected(pad: Phaser.Input.Gamepad.Gamepad) {
    this.pad = pad;
  }

  update(entities: Entity[]) {
    if (!this.pad) return;

    const threshold = 0.5;
    const x = this.pad.axes[0]?.getValue() || 0;
    const y = this.pad.axes[1]?.getValue() || 0;

    entities.forEach((entity) => {
      const inputComponent = entity.get<InputComponent>("input");

      if (!inputComponent) {
        throw new Error("Error: Missing Input Component");
      }

      if (!this.pad) {
        throw new Error("Error: Missing Gamepad");
      }

      inputComponent.keys.clear();

      if (this.pad.buttons[14]?.value) inputComponent.keys.add("ArrowLeft");
      if (this.pad.buttons[15]?.value) inputComponent.keys.add("ArrowRight");
      if (this.pad.buttons[12]?.value) inputComponent.keys.add("ArrowUp");
      if (this.pad.buttons[13]?.value) inputComponent.keys.add("ArrowDown");

      if (x < -threshold) inputComponent.keys.add("ArrowLeft");
      if (x > threshold) inputComponent.keys.add("ArrowRight");
      if (y < -threshold) inputComponent.keys.add("ArrowUp");
      if (y > threshold) inputComponent.keys.add("ArrowDown");
    });
  }
}
