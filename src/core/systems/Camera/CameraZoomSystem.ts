import Phaser from "phaser";

import { Entity, System } from "kanji-ecs";

import { CameraComponent } from "../../components/CameraComponent";

export class CameraZoomSystem implements System {
  constructor(
    private scene: Phaser.Scene,
    private entity: Entity,
  ) {
    this.scene.input.on(
      "wheel",
      (
        _pointer: Phaser.Input.Pointer,
        _gameObjects: Phaser.GameObjects.GameObject[],
        _deltaX: number,
        deltaY: number,
        _deltaZ: number,
      ) => {
        const cameraComponent = this.entity.get<CameraComponent>("camera");

        if (!cameraComponent) {
          throw new Error("Error: Missing Component Dependency");
        }

        const zoomFactor = 0.1;
        if (deltaY > 0) {
          cameraComponent.zoom = Phaser.Math.Clamp(
            cameraComponent.zoom - zoomFactor,
            cameraComponent.minZoom,
            cameraComponent.maxZoom,
          );
        } else if (deltaY < 0) {
          cameraComponent.zoom = Phaser.Math.Clamp(
            cameraComponent.zoom + zoomFactor,
            cameraComponent.minZoom,
            cameraComponent.maxZoom,
          );
        }
        scene.cameras.main.setZoom(cameraComponent.zoom);
      },
    );
  }
  update(): void {}
}
