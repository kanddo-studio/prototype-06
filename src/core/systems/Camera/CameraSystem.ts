import Phaser from "phaser";

import { Entity, PositionComponent, System } from "kanji-ecs";

import { CameraComponent } from "../../components/CameraComponent";

export class CameraSystem implements System {
  constructor(
    private scene: Phaser.Scene,
    private entity: Entity,
  ) {}

  update() {
    const cameraComponent = this.entity.get<CameraComponent>("camera");
    const positionComponent = this.entity.get<PositionComponent>("position");

    if (!cameraComponent || !positionComponent) {
      throw new Error("Error: Missing Component Dependency");
    }

    if (!cameraComponent.isDragging && cameraComponent.isFixed) {
      return this.scene.cameras.main.startFollow(positionComponent);
    }
    return this.scene.cameras.main.stopFollow();
  }
}
