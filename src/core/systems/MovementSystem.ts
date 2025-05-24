import { Entity, System } from "kanji-ecs/core";

import { PositionComponent } from "kanji-ecs/components";

import { PhysicsComponent } from "../components/PhysicsComponent";

export class MovementSystem implements System {
  update(entities: Entity[]) {
    entities.forEach((entity) => {
      const positionComponent = entity.get<PositionComponent>("position");
      const physicsComponent = entity.get<PhysicsComponent>("physics");

      if (!positionComponent || !physicsComponent) {
        throw new Error("Error: Missing Component Dependency");
      }

      positionComponent.x = physicsComponent.body.x;
      positionComponent.y = physicsComponent.body.y;
    });
  }
}
