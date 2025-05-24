import { InputComponent, VelocityComponent } from "kanji-ecs";
import { Entity, System } from "kanji-ecs/core";
import { PhysicsComponent } from "../components/PhysicsComponent";

export class PhysicsSystem implements System {
  update(entities: Entity[]) {
    entities.forEach((entity) => {
      const inputComponent = entity.get<InputComponent>("input");
      const velocityComponent = entity.get<VelocityComponent>("velocity");
      const physicsComponent = entity.get<PhysicsComponent>("physics");

      if (!inputComponent || !velocityComponent || !physicsComponent) {
        throw new Error("Error: Missing Component Dependency");
      }

      const body = physicsComponent.body;

      if (inputComponent.keys.has("ArrowLeft")) {
        body.setVelocityX(-velocityComponent.speed);
      } else if (inputComponent.keys.has("ArrowRight")) {
        body.setVelocityX(velocityComponent.speed);
      } else {
        body.setVelocityX(0);
      }

      if (inputComponent.keys.has("ArrowUp")) {
        body.setVelocityY(-velocityComponent.speed);
      } else if (inputComponent.keys.has("ArrowDown")) {
        body.setVelocityY(velocityComponent.speed);
      } else {
        body.setVelocityY(0);
      }
    });
  }
}
