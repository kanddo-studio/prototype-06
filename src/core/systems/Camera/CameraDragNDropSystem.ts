import Phaser from "phaser";

import { Entity, PositionComponent, System } from "kanji-ecs";

import { CameraComponent } from "../../components/CameraComponent";

export class CameraDragNDropSystem implements System {
  constructor(
    private scene: Phaser.Scene,
    private entity: Entity,
  ) {
    this.scene.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      const cameraComponent = this.entity.get<CameraComponent>("camera");
      if (!cameraComponent) {
        throw new Error("Error: Missing Component Dependency");
      }

      cameraComponent.isFixed = false;
      cameraComponent.isDragging = true;
      cameraComponent.dragStartX = pointer.worldX;
      cameraComponent.dragStartY = pointer.worldY;
    });

    this.scene.input.on("pointerup", () => {
      const cameraComponent = this.entity.get<CameraComponent>("camera");
      const positionComponent = this.entity.get<PositionComponent>("position");

      if (!cameraComponent || !positionComponent) {
        throw new Error("Error: Missing Component Dependency");
      }

      cameraComponent.isFixed = true;
      cameraComponent.isDragging = false;
    });

    this.scene.input.on("pointerupoutside", () => {
      const cameraComponent = this.entity.get<CameraComponent>("camera");
      const positionComponent = this.entity.get<PositionComponent>("position");

      if (!cameraComponent || !positionComponent) {
        throw new Error("Error: Missing Component Dependency");
      }

      cameraComponent.isFixed = true;
      cameraComponent.isDragging = false;
    });

    this.scene.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
      const cameraComponent = this.entity.get<CameraComponent>("camera");

      if (!cameraComponent) {
        throw new Error("Error: Missing Component Dependency");
      }

      if (!cameraComponent.isDragging) return;

      const camera = scene.cameras.main;

      const dragX = (pointer.worldX - cameraComponent.dragStartX) * 4;
      const dragY = (pointer.worldY - cameraComponent.dragStartY) * 4;

      const smoothFactor = 0.1;
      camera.scrollX -= (dragX * smoothFactor) / camera.zoom;
      camera.scrollY -= (dragY * smoothFactor) / camera.zoom;

      cameraComponent.dragStartX = pointer.worldX;
      cameraComponent.dragStartY = pointer.worldY;
    });
  }
  update(): void {}
}
