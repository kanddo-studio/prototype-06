import type { Entity } from "kanji-ecs/core";
import { PositionComponent } from "kanji-ecs/components";

import { MovementSystem } from "../../../core/systems/MovementSystem";
import { PhysicsComponent } from "../../../core/components/PhysicsComponent";

describe("MovementSystem", () => {
  let movementSystem: MovementSystem;
  let mockEntity: Entity;
  let positionComponent: PositionComponent;
  let physicsComponent: PhysicsComponent;

  beforeEach(() => {
    positionComponent = { x: 0, y: 0 };

    physicsComponent = {
      body: {
        x: 150,
        y: 300,
      },
    } as PhysicsComponent;

    mockEntity = {
      get: jest.fn((componentName: string) => {
        if (componentName === "position") return positionComponent;
        if (componentName === "physics") return physicsComponent;
        return undefined;
      }),
    } as unknown as Entity;

    movementSystem = new MovementSystem();
  });

  it("should update the position component based on physics body", () => {
    movementSystem.update([mockEntity]);

    expect(positionComponent.x).toBe(150);
    expect(positionComponent.y).toBe(300);
  });

  it("should throw error if position component is missing", () => {
    (mockEntity.get as jest.Mock).mockImplementation((componentName: string) =>
      componentName === "physics" ? physicsComponent : undefined,
    );

    expect(() => movementSystem.update([mockEntity])).toThrow(
      "Error: Missing Component Dependency",
    );
  });

  it("should throw error if physics component is missing", () => {
    (mockEntity.get as jest.Mock).mockImplementation((componentName: string) =>
      componentName === "position" ? positionComponent : undefined,
    );

    expect(() => movementSystem.update([mockEntity])).toThrow(
      "Error: Missing Component Dependency",
    );
  });
});
